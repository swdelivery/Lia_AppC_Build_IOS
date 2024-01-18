import ActionButton from '@Components/ActionButton/ActionButton';
import Column from '@Components/Column';
import { IconCheckList, IconGallery, IconPlayWhite, IconRightArrowBase, IconTick } from '@Components/Icon/Icon';
import Row from '@Components/Row';
import SquareTick from '@Components/SquareTick/SquareTick';
import Text from '@Components/Text';
import { BG_GREY_OPACITY_2, BORDER_COLOR, GREY, GREY_FOR_TITLE, RED, WHITE } from '@Constant/Color';
import { sizeIcon } from '@Constant/Icon';
import { _moderateScale } from '@Constant/Scale';
import { styleElement } from '@Constant/StyleElement';
import ScreenKey from '@Navigation/ScreenKey';
import { uploadModule } from '@Redux/Action/BookingAction';
import { updateDailyDiary } from '@Redux/takecare/actions';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import useConfirmation from 'src/Hooks/useConfirmation';
import { useNavigate } from 'src/Hooks/useNavigation';
import InputDesciption from './EachDayDiaryComponents/InputDesciption';
import ActionSheetBottom from '@Components/ModalBottom/ActionSheetBottom';
import useVisible from 'src/Hooks/useVisible';
import { isEmpty } from 'lodash';
import { getImageAvataUrl } from 'src/utils/avatar';
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import TextInput from "@Components/TextInput";

const EachDayDiary = ({ data }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigate()
  const { showConfirmation } = useConfirmation();

  const [disabledEdit, setDisabledEdit] = useState(false)
  const [currTypeImageUpload, setCurrTypeImageUpload] = useState(null)
  const cameraPicker = useVisible();


  const activityArr = data?.activityArr ?? [];
  const isComplete = data?.isComplete ?? false;
  const images = data?.images ?? [];
  const description = data?.description ?? '';
  const videoGuideArr = data?.guidePostoperative?.videoGuideArr ?? [];
  const productArr = data?.guidePostoperative?.productArr ?? [];
  const guidePostoperative = data?.guidePostoperative ?? null;

  const [dataFetch, setDataFetch] = useState({
    activityArr: [],
    images: [],
    description: ''
  })

  useEffect(() => {
    setDataFetch({
      ...dataFetch,
      activityArr,
      images,
      description
    })
  }, [activityArr, images, description])

  useEffect(() => {
    let { date } = data;
    if (moment(date).isBefore(moment(), 'day') || moment(date).isAfter(moment(), 'day')) {
      setDisabledEdit(true)
    } else {
      setDisabledEdit(false)
    }
  }, [data])

  const EachActivity = ({ item, index }) => {
    const _handleTickActivity = () => {
      let dataTemp = { ...dataFetch };
      let findIndex = dataTemp?.activityArr?.findIndex(itemFind => itemFind?._id == item?._id);
      if (findIndex !== -1) {
        dataTemp.activityArr[findIndex].isComplete = !(dataTemp.activityArr[findIndex].isComplete)
      }
      setDataFetch(dataTemp)
    }

    return (
      <TouchableOpacity
        disabled={disabledEdit}
        onPress={_handleTickActivity}>
        <Row
          gap={8 * 2}
          borderTopWidth={0.5}
          borderTopColor={BORDER_COLOR}
          marginHorizontal={8 * 2}
          paddingVertical={8 * 2}>
          <SquareTick
            isTicked={item?.isComplete} />
          <Text>{item?.title}</Text>
        </Row>
      </TouchableOpacity>
    );
  };

  const EachImage = ({ title = "", hideTitle = false, type = '', image, small = false }) => {
    const imageViewer = useVisible<number>();


    const _handleRemoveImage = () => {
      let dataTemp = { ...dataFetch };
      let indexFind = dataTemp?.images?.findIndex(item => item?.image?._id == image?.image?._id);
      if (indexFind !== -1) {
        dataTemp?.images?.splice(indexFind, 1)
      }
      setDataFetch(dataTemp)
    }

    return (
      <Column
        gap={8}
        alignItems='center'>
        {
          !hideTitle ?
            <Text>
              {title}
            </Text>
            : <></>
        }
        <TouchableOpacity
          activeOpacity={disabledEdit ? 1 : .5}
          onPress={() => {
            if (disabledEdit) {
              if (image) {
                imageViewer.show()
              }
            } else {
              setCurrTypeImageUpload(type)
              cameraPicker.show()
            }
          }}
          style={[styles.containerBtnAddImg, small && {
            height: 75,
            width: 75,
          }]}>
          {
            image ?
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 8
                }}
                source={{ uri: getImageAvataUrl(image?.image) }} />
              :
              <IconGallery />
          }
          {
            image && !disabledEdit ?
              <TouchableOpacity
                disabled={disabledEdit}
                onPress={_handleRemoveImage}
                hitSlop={styleElement.hitslopSm}
                style={styles.containerDotDelete}>
                <View style={styles.dotDelete} />
              </TouchableOpacity>
              : <></>
          }
        </TouchableOpacity>

        <EnhancedImageViewing
          images={[{ uri: getImageAvataUrl(image?.image) }]}
          onRequestClose={imageViewer.hide}
          visible={imageViewer.visible}
        />

      </Column>
    )
  }

  const EeachProduct = ({ item, index }) => {
    return (
      <Column>
        <Image
          style={styles.imageProduct}
          avatar={item?.representationFileArr[0]} />
        <Column
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
          padding={8}
          backgroundColor={WHITE}>
          <Text
            size={12}
            weight='bold'>
            {item?.name}
          </Text>
        </Column>
      </Column>
    )
  }

  const isDisabled = useMemo(() => {
    let dataTemp = { ...dataFetch }
    const containsLeft = dataTemp?.images.some(item => item.type === "left");
    const containsRight = dataTemp?.images.some(item => item.type === "right");
    const containsCenter = dataTemp?.images.some(item => item.type === "front");

    const result = containsLeft && containsRight && containsCenter;
    if (result) {
      return false
    } else {
      return true
    }
  }, [dataFetch]);

  const _handleConfirmActionSheet = (data) => {
    console.log({ data, currTypeImageUpload });
    if (data?.type == "gallery") {
      _handlePickGallery(currTypeImageUpload);
    }
    if (data?.type == "camera") {
      _handlePickCamera(currTypeImageUpload);
    }
  }

  const _handlePickGallery = (currTypeImageUpload) => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: currTypeImageUpload == 'other' ? 6 : 1,
      mediaType: 'photo',
      cropping: true,
      width: 500,
      height: 500,
      compressImageQuality: 0.5,
      compressImageMaxWidth: 700,
    }).then(async (images) => {
      let listImages = images.map((i, index) => {
        return {
          uri: i.path,
          width: i.width,
          height: i.height,
          mime: i.mime,
          type: i.mime,
          name: `${i.modificationDate}_${index}`
        };
      })
      let resultUploadImage = await uploadModule({
        moduleName: 'dailyDiary',
        files: listImages
      })
      if (resultUploadImage?.isAxiosError) return
      let dataTemp = { ...dataFetch };

      if (currTypeImageUpload == 'other') {
        dataTemp['images'] = [
          ...dataTemp.images,
          ...resultUploadImage?.data?.data?.map(item => {
            return {
              type: currTypeImageUpload,
              image: item
            }
          })
        ]
        setDataFetch(dataTemp)
      } else {
        let findIndexExistType = dataTemp?.images?.findIndex(itemFind => itemFind?.type == currTypeImageUpload);
        if (findIndexExistType !== -1) {
          dataTemp['images'][findIndexExistType] = { image: resultUploadImage?.data?.data[0], type: currTypeImageUpload }
        } else {
          dataTemp['images'] = [
            ...dataTemp.images,
            { image: resultUploadImage?.data?.data[0], type: currTypeImageUpload }
          ]
        }
        setDataFetch(dataTemp)
      }
    }).catch(e => {
    });
  }

  const _handlePickCamera = (currTypeImageUpload) => {
    ImagePicker.openCamera({
      mediaType: "photo",
      width: 500,
      height: 500,
      multiple: false,
    })
      .then(async (image) => {
        let newImage = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          type: image.mime,
          name: `${image.modificationDate}_${0}`,
          isLocal: true,
        };
        if (!isEmpty(newImage)) {
          let listImages = [newImage];
          let resultUploadImage = await uploadModule({
            moduleName: "dailyDiary",
            files: listImages,
          });
          if (resultUploadImage.isAxiosError) return;
          let dataTemp = { ...dataFetch };

          if (currTypeImageUpload == 'other') {
            dataTemp['images'] = [
              ...dataTemp.images,
              ...resultUploadImage?.data?.data?.map(item => {
                return {
                  type: currTypeImageUpload,
                  image: item
                }
              })
            ]
            setDataFetch(dataTemp)
          } else {
            let findIndexExistType = dataTemp?.images?.findIndex(itemFind => itemFind?.type == currTypeImageUpload);
            if (findIndexExistType !== -1) {
              dataTemp['images'][findIndexExistType] = { image: resultUploadImage?.data?.data[0], type: currTypeImageUpload }
            } else {
              dataTemp['images'] = [
                ...dataTemp.images,
                { image: resultUploadImage?.data?.data[0], type: currTypeImageUpload }
              ]
            }
            setDataFetch(dataTemp)
          }
        }
      })
      .catch((e) => { });
  };

  const _handleConfirm = () => {
    showConfirmation(
      "Xác nhận",
      `Xác nhận hoàn thành hậu phẫu ngày ${data?.index} ?`,
      async () => {
        let newFormatDataFetch = {
          ...dataFetch,
          activityArr: dataFetch?.activityArr?.map(item => {
            return {
              id: item?._id,
              isComplete: item?.isComplete
            }
          }),
          images: dataFetch.images?.map(item => {
            return {
              ...item,
              image: item?.image?._id
            }
          }),
          isComplete: true
        }
        dispatch(updateDailyDiary.request({
          id: data?._id,
          data: newFormatDataFetch
        }))
      }
    );


  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <ScrollView>
        <Column
          gap={8 * 2}
          margin={8 * 2}>
          {
            isComplete ?
              <Column
                gap={8}
                alignItems='center'
                alignSelf='center'>
                <IconTick />
                <Text
                  color={"#20C85F"}
                  weight='bold'>
                  Hoàn thành ngày {data?.index}
                </Text>
                <Text
                  fontStyle='italic'
                  size={12}
                  color={"#20C85F"}>
                  *** Hãy cập nhật đầy đủ từng ngày của hậu phẫu để được nhận những phần quà hấp dẫn nhé!!
                </Text>
              </Column>
              :
              <Text
                size={12}
                fontStyle='italic' >
                *** Để đảm bảo quyền lợi và hiệu quả thẩm mỹ cuối cùng, khách hàng cần cập nhật đầy đủ nhật ký hậu phẫu từng ngày theo đúng hướng dẫn
              </Text>
          }
          <Column>
            <Text
              color={GREY_FOR_TITLE}
              weight='bold'>
              Hướng dẫn ngày {data?.index}
            </Text>
            {
              videoGuideArr?.length > 0 ?
                <Column marginTop={8}>
                  <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 8 }} horizontal>
                    {
                      videoGuideArr?.map((itemVideo, iVideo) => {
                        return (
                          <TouchableOpacity onPress={navigate(ScreenKey.VERTICAL_VIDEO_PLAYER, {
                            data: videoGuideArr,
                          })}>
                            <Column
                              justifyContent='center'
                              alignItems='center'>
                              <View style={[
                                StyleSheet.absoluteFillObject,
                                styles.backDrop
                              ]} />
                              <Column
                                padding={8}
                                bottom={8}
                                width={"100%"}
                                zIndex={3}
                                position='absolute'>
                                <Text
                                  weight='bold'
                                  color={WHITE}>
                                  {itemVideo?.name}
                                </Text>
                              </Column>

                              <View style={{ position: 'absolute', zIndex: 2 }}>
                                <IconPlayWhite style={sizeIcon.lg} />
                              </View>
                              <Image
                                style={styles.cardVideo}
                                source={{ uri: getImageAvataUrl(itemVideo?.avatar) }} />
                            </Column>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </ScrollView>
                </Column>
                :
                <></>
            }
          </Column>
          {
            dataFetch?.activityArr?.length > 0 ?
              <View>
                <Column
                  padding={8 * 2}
                  backgroundColor={WHITE}
                  borderRadius={4}>
                  <Row gap={8 * 2}>
                    <IconCheckList />
                    <Text flex={1} weight="bold">
                      Hoạt động
                    </Text>
                    <View style={{ transform: [{ rotate: "90deg" }] }}>
                      <IconRightArrowBase />
                    </View>
                  </Row>
                </Column>
                <Column backgroundColor={WHITE} borderRadius={4}>
                  {dataFetch?.activityArr?.map((item, index) => {
                    return <EachActivity item={item} index={index} />;
                  })}
                </Column>
              </View>
              : <></>
          }
          <Column>
            <Column>
              <Text
                color={GREY_FOR_TITLE}
                weight='bold'>
                Hình ảnh <Text weight='bold' color={RED}> *</Text>
              </Text>
            </Column>
            <Row
              marginTop={8 * 2}
              justifyContent='space-between' >

              <EachImage
                image={dataFetch?.images?.find(item => item?.type == "left")}
                type='left'
                title='Góc trái' />

              <EachImage
                image={dataFetch?.images?.find(item => item?.type == "front")}
                type='front'
                title='Chính diện' />

              <EachImage
                image={dataFetch?.images?.find(item => item?.type == "right")}
                type='right'
                title='Góc phải' />
            </Row>
          </Column>

          <Column>
            <Column>
              <Text
                color={GREY_FOR_TITLE}
                weight='bold'>
                Hình ảnh khác
              </Text>
            </Column>

            <Column marginTop={8}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyleScrollView}
                horizontal>
                {
                  dataFetch?.images?.map((item, index) => {
                    if (item?.type == 'other') {
                      return (
                        <EachImage
                          small
                          image={item}
                          type='other'
                          hideTitle />
                      )
                    }
                  })
                }
                <EachImage
                  small
                  image={null}
                  type='other'
                  hideTitle />
              </ScrollView>
            </Column>
          </Column>

          <InputDesciption
            dataFetch={dataFetch}
            setDataFetch={setDataFetch}
            disabledEdit={disabledEdit} />

          <Column gap={8}>
            <Text
              color={GREY_FOR_TITLE}
              weight='bold'>
              Lưu ý của bác sĩ dành cho bạn
            </Text>
            <View style={[styles.inputContainer, { backgroundColor: BG_GREY_OPACITY_2 }]}>
              <TextInput
                value={guidePostoperative?.note}
                editable={false}
                placeholder={"Nhập ghi chú"}
                multiline />
            </View>
          </Column>

          {
            productArr?.length > 0 ?
              <Column gap={8}>
                <Text
                  color={GREY_FOR_TITLE}
                  weight='bold'>
                  Sản phầm cần thiết
                </Text>

                <ScrollView contentContainerStyle={{ gap: 8, flexGrow: 1 }} horizontal>
                  {
                    productArr?.map((item, index) => {
                      return (
                        <EeachProduct item={item} index={index} />
                      )
                    })
                  }
                </ScrollView>

              </Column>
              : <></>
          }

          <View style={{ height: 200 }} />
        </Column>
      </ScrollView>
      {
        disabledEdit ?
          <></>
          :
          <ActionButton
            disabled={isDisabled}
            onPress={_handleConfirm}
            title={`Xác nhận hoàn thành ngày ${data?.index}`} />
      }

      <ActionSheetBottom
        onConfirm={_handleConfirmActionSheet}
        indexRed={2}
        options={[
          { name: "Mở camera", type: "camera" },
          { name: "Chọn ảnh từ thư viện", type: "gallery" },
        ]}
        onClose={cameraPicker.hide}
        visible={cameraPicker?.visible}
      />

    </KeyboardAvoidingView>
  )
}

export default EachDayDiary

const styles = StyleSheet.create({
  dotDelete: {
    width: _moderateScale(8),
    height: _moderateScale(2),
    backgroundColor: WHITE
  },
  containerDotDelete: {
    position: 'absolute',
    zIndex: 10,
    right: _moderateScale(-8),
    top: _moderateScale(-8),
    width: _moderateScale(15),
    height: _moderateScale(15),
    backgroundColor: RED,
    borderRadius: _moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  contentContainerStyleScrollView: {
    gap: 8,
    paddingTop: 8 * 2,
    paddingRight: 8 * 2,
    flexGrow: 1
  },
  imageProduct: {
    width: 150,
    height: 150,
    backgroundColor: WHITE,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  inputContainer: {
    minHeight: _moderateScale(8 * 10),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: _moderateScale(8),
    padding: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
    backgroundColor: WHITE
  },
  containerBtnAddImg: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: 8,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GREY
  },
  backDrop: {
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 1,
    borderRadius: 8
  },
  cardVideo: {
    width: 150,
    height: 200,
    borderRadius: 8
  }
})
