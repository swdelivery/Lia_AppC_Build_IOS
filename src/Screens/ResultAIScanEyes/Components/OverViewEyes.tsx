import Column from '@Components/Column'
import { IconBagFat, IconCurvedArrow } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import ScreenKey from '@Navigation/ScreenKey'
import { getEyeLabelState } from '@Redux/resultcanningeyes/selectors'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Svg from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import { GREY_FOR_TITLE, NEW_BASE_COLOR, RED, WHITE } from '../../../Constant/Color'
import { _moderateScale, _width } from '../../../Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import Icon from '@Components/Icon'
import { getBranchsByResEye, getDoctorsByResEye, getEyeLabel, getServicesByResEye } from '@Redux/resultcanningeyes/actions'
import { isEmpty } from 'lodash'
import ImageEditor from "@react-native-community/image-editor";

// const WIDTH_IMAGE = _moderateScale(8 * 18)
const WIDTH_IMAGE = ((_width - (8 * 2 * 2)) - 8 * 6) / 2

const OverViewEyes = (props) => {
  const dispatch = useDispatch()
  const { data: dataEyeLabel } = useSelector(getEyeLabelState)
  const { navigate } = useNavigate()

  const { imageScan } = props
  const { scanningResult } = props

  const [croppedLeftEyeImage, setCroppedLeftEyeImage] = useState({
    uri: null,
    width: null,
    height: null,
    ratio: null,
    boxEyelid: null,
    boxFatBag: null,
  });
  const [croppedRightEyeImage, setCroppedRightEyeImage] = useState({
    uri: null,
    width: null,
    height: null,
    ratio: null,
    boxEyelid: null,
    boxFatBag: null,
  });

  useEffect(() => {
    dispatch(getEyeLabel.request())
  }, [])

  useEffect(() => {
    if (!isEmpty(scanningResult) && !isEmpty(imageScan)) {
      cropLeftEyeImage();
      cropRightEyeImage();
    }
  }, [scanningResult, imageScan]);

  const cropLeftEyeImage = useCallback(async () => {
    const {
      left: {
        coordinate_fat_bag_box,
        coordinate_eyelid_boxs,
        eye_area_top_left_crop,
        eye_area_bottom_right_crop,
      },
    } = scanningResult;
    try {
      const imagePath =
        Platform?.OS == "ios" ? imageScan : `file://${imageScan}`; // Thay đổi thành đường dẫn thực tế của bạn
      const cropData = {
        offset: { x: eye_area_top_left_crop[1], y: eye_area_top_left_crop[0] }, // Thay Xmin, Ymin bằng toạ độ thực tế của bạn
        size: {
          width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1],
          height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0],
        }, // Thay Xmax, Ymax bằng toạ độ thực tế của bạn
      };
      const newImagePath = await ImageEditor.cropImage(imagePath, cropData);
      setCroppedLeftEyeImage({
        uri: newImagePath,
        width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1],
        height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0],
        ratio:
          (eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1]) /
          (eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0]),
        boxEyelid:
          coordinate_eyelid_boxs?.length > 0
            ? {
              point1: {
                x: coordinate_eyelid_boxs[0][0],
                y: coordinate_eyelid_boxs[0][1],
              },
              point2: {
                x: coordinate_eyelid_boxs[0][2],
                y: coordinate_eyelid_boxs[0][1],
              },
              point3: {
                x: coordinate_eyelid_boxs[0][2],
                y: coordinate_eyelid_boxs[0][3],
              },
            }
            : null,
        boxFatBag:
          coordinate_fat_bag_box?.length > 0
            ? {
              point1: {
                x: coordinate_fat_bag_box[0],
                y: coordinate_fat_bag_box[1],
              },
              point2: {
                x: coordinate_fat_bag_box[2],
                y: coordinate_fat_bag_box[1],
              },
              point3: {
                x: coordinate_fat_bag_box[2],
                y: coordinate_fat_bag_box[3],
              },
            }
            : null,
      });
    } catch (error) {
      console.error(error);
    }
  }, [scanningResult, imageScan])

  const cropRightEyeImage = useCallback(async () => {
    const {
      right: {
        coordinate_fat_bag_box,
        coordinate_eyelid_boxs,
        eye_area_top_left_crop,
        eye_area_bottom_right_crop,
      },
    } = scanningResult;
    try {
      const imagePath =
        Platform?.OS == "ios" ? imageScan : `file://${imageScan}`; // Thay đổi thành đường dẫn thực tế của bạn
      const cropData = {
        offset: { x: eye_area_top_left_crop[1], y: eye_area_top_left_crop[0] }, // Thay Xmin, Ymin bằng toạ độ thực tế của bạn
        size: {
          width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1],
          height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0],
        }, // Thay Xmax, Ymax bằng toạ độ thực tế của bạn
      };
      const newImagePath = await ImageEditor.cropImage(imagePath, cropData);
      setCroppedRightEyeImage({
        uri: newImagePath,
        width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1],
        height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0],
        ratio:
          (eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1]) /
          (eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0]),
        boxEyelid:
          coordinate_eyelid_boxs?.length > 0
            ? {
              point1: {
                x: coordinate_eyelid_boxs[0][0],
                y: coordinate_eyelid_boxs[0][1],
              },
              point2: {
                x: coordinate_eyelid_boxs[0][2],
                y: coordinate_eyelid_boxs[0][1],
              },
              point3: {
                x: coordinate_eyelid_boxs[0][2],
                y: coordinate_eyelid_boxs[0][3],
              },
            }
            : null,
        boxFatBag:
          coordinate_fat_bag_box?.length > 0
            ? {
              point1: {
                x: coordinate_fat_bag_box[0],
                y: coordinate_fat_bag_box[1],
              },
              point2: {
                x: coordinate_fat_bag_box[2],
                y: coordinate_fat_bag_box[1],
              },
              point3: {
                x: coordinate_fat_bag_box[2],
                y: coordinate_fat_bag_box[3],
              },
            }
            : null,
      });
    } catch (error) {
      console.error(error);
    }
  }, [scanningResult, imageScan])



  const resultLeftEyeLid = useMemo(() => {
    return {
      name: dataEyeLabel?.find(item => item?.code === scanningResult?.left?.eylid_type)?.name,
      detail: dataEyeLabel?.find(item => item?.code === scanningResult?.left?.eylid_type)?.detail
    }
  }, [dataEyeLabel, scanningResult])
  const resultRightEyeLid = useMemo(() => {
    return {
      name: dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eylid_type)?.name,
      detail: dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eylid_type)?.detail
    }
  }, [dataEyeLabel, scanningResult])

  const resultLeftEyeBag = useMemo(() => {
    return {
      name: dataEyeLabel?.find(item => item?.code === scanningResult?.left?.eye_bag_type)?.name,
      detail: dataEyeLabel?.find(item => item?.code === scanningResult?.left?.eye_bag_type)?.detail
    }
  }, [dataEyeLabel, scanningResult])
  const resultRightEyeBag = useMemo(() => {
    return {
      name: dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eye_bag_type)?.name,
      detail: dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eye_bag_type)?.detail
    }
  }, [dataEyeLabel, scanningResult])

  const {
    ratio: ratioLeft,
    boxEyelid: boxEyelidLeft,
    boxFatBag: boxFatBagLeft,
    width: widthLeft,
    height: heightLeft,
    uri: uriLeft
  } = croppedLeftEyeImage

  const {
    ratio: ratioRight,
    boxEyelid: boxEyelidRight,
    boxFatBag: boxFatBagRight,
    width: widthRight,
    height: heightRight,
    uri: uriRight
  } = croppedRightEyeImage

  return (
    <Column
      padding={8 * 2}
      borderRadius={8 * 2}
      backgroundColor={WHITE}
      style={styleElement.shadow}
      marginHorizontal={8 * 2}>

      <Row justifyContent='space-between'>
        {
          ratioLeft ?
            <View style={{
              width: WIDTH_IMAGE,
              height: WIDTH_IMAGE,
              borderRadius: _moderateScale(8 * 2),
            }}>
              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: _moderateScale(8 * 2), }]} />

              {
                boxEyelidLeft?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxEyelidLeft?.point1.x / widthLeft,
                    top: WIDTH_IMAGE / ratioLeft * boxEyelidLeft?.point1.y / heightLeft - (20)
                  }}>
                    <IconCurvedArrow
                      height={20}
                      width={WIDTH_IMAGE * (boxEyelidLeft?.point2.x - boxEyelidLeft?.point1.x) / widthLeft}
                    />
                  </View>
                  : <></>
              }
              {
                boxFatBagLeft?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxFatBagLeft?.point1.x / widthLeft,
                    top: WIDTH_IMAGE / ratioLeft * boxFatBagLeft?.point1.y / heightLeft + 4
                  }}>
                    <IconBagFat width={WIDTH_IMAGE * (boxFatBagLeft?.point2.x - boxFatBagLeft?.point1.x) / widthLeft} />
                  </View>
                  : <></>
              }
              <Image
                style={[styles.overView__box__leftEye__image, {
                  width: WIDTH_IMAGE,
                  height: WIDTH_IMAGE,
                  position: 'absolute',
                  zIndex: -1
                }]}
                source={{ uri: `${uriLeft}` }} />

              <Column
                width={8 * 10}
                height={8 * 3}
                backgroundColor={WHITE}
                position='absolute'
                alignSelf='center'
                borderTopLeftRadius={8}
                borderTopRightRadius={8}
                style={styleElement.centerChild}
                bottom={0}>
                <Text
                  weight='bold'
                  color={NEW_BASE_COLOR}>
                  Mắt trái
                </Text>
              </Column>
            </View>
            : <></>
        }

        {
          ratioRight ?
            <View style={{
              width: WIDTH_IMAGE,
              height: WIDTH_IMAGE,
              borderRadius: _moderateScale(8 * 2),
            }}>
              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: _moderateScale(8 * 2) }]} />
              {
                boxEyelidRight?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxEyelidRight?.point1.x / widthRight,
                    top: WIDTH_IMAGE / ratioRight * boxEyelidRight?.point1.y / heightRight - (20)
                  }}>
                    <IconCurvedArrow
                      height={20}
                      width={WIDTH_IMAGE * (boxEyelidRight?.point2.x - boxEyelidRight?.point1.x) / widthRight}
                    />
                  </View>
                  : <></>
              }
              {
                boxFatBagRight?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxFatBagRight?.point1.x / widthRight,
                    top: WIDTH_IMAGE / ratioRight * boxFatBagRight?.point1.y / heightRight + 4
                  }}>
                    <IconBagFat width={WIDTH_IMAGE * (boxFatBagRight?.point2.x - boxFatBagRight?.point1.x) / widthRight} />
                  </View>
                  : <></>
              }
              <Image
                style={[styles.overView__box__leftEye__image, {
                  width: WIDTH_IMAGE,
                  height: WIDTH_IMAGE,
                  position: 'absolute',
                  zIndex: -1
                }]}
                source={{ uri: `${uriRight}` }} />
              <Column
                width={8 * 10}
                height={8 * 3}
                backgroundColor={WHITE}
                position='absolute'
                alignSelf='center'
                borderTopLeftRadius={8}
                borderTopRightRadius={8}
                style={styleElement.centerChild}
                bottom={0}>
                <Text
                  weight='bold'
                  color={NEW_BASE_COLOR}>
                  Mắt phải
                </Text>
              </Column>
            </View>
            : <></>
        }
      </Row>

      <Row gap={8 * 2} marginTop={8 * 2}>
        <Column
          gap={8}
          flex={1}>
          <BtnResultEye
            detail={resultLeftEyeLid?.detail}
            name={resultLeftEyeLid?.name} />
          <BtnResultEye
            detail={resultLeftEyeBag?.detail}
            name={resultLeftEyeBag?.name} />
        </Column>

        <Column
          gap={8}
          flex={1}>
          <BtnResultEye
            detail={resultRightEyeLid?.detail}
            name={resultRightEyeLid?.name} />
          <BtnResultEye
            detail={resultRightEyeBag?.detail}
            name={resultRightEyeBag?.name} />
        </Column>
      </Row>

    </Column>
  )
}

export default OverViewEyes

const BtnResultEye = ({ name = '', detail = null }) => {
  const { navigate } = useNavigate()
  const _handleGotoDetail = useCallback(() => {
    navigate(ScreenKey.SCREEN_HTML,
      { title: name, value: detail })()
  }, [name, detail])

  return (
    <TouchableOpacity onPress={_handleGotoDetail}>
      <Row
        paddingVertical={8}
        paddingHorizontal={8 * 2}
        borderColor={NEW_BASE_COLOR}
        borderWidth={1}
        borderRadius={8 * 4}>
        <Text
          style={styleElement.flex}
          weight='bold'
          color={NEW_BASE_COLOR}>
          {name}
        </Text>
        <Icon color={NEW_BASE_COLOR} name='arrow-right' />
      </Row>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overView__box__leftEye__image: {
    borderRadius: _moderateScale(8 * 2),
  },
})
