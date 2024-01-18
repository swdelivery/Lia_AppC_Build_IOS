import ActionButton from "@Components/ActionButton/ActionButton";
import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Screen from "@Components/Screen";
import Spacer from "@Components/Spacer";
import { StatusBar } from "@Components/StatusBar";
import Text from "@Components/Text";
import TextInput from "@Components/TextInput";
import {
  BG_GREY_OPACITY_5,
  BG_GREY_OPACITY_7,
  BLACK,
  BLACK_OPACITY_4,
  BORDER_COLOR,
  GREY,
  NEW_BASE_COLOR,
  RED,
  WHITE,
} from "@Constant/Color";
import { _moderateScale, _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { URL_ORIGINAL } from "@Constant/Url";
import ScreenKey from "@Navigation/ScreenKey";
import {
  createReviewTreatment,
  getReviewByTreatmentDetailForPartner,
  uploadModule,
} from "@Redux/Action/BookingAction";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useConfirmation from "src/Hooks/useConfirmation";
import { useNavigate, useNavigationParams } from "src/Hooks/useNavigation";
import { isIos } from "src/utils/platform";

type ScreenKey = typeof ScreenKey.MODAL_SERVICE_REVIEW;

const ServiceReview = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    data: { treatmentDetailId, review, serviceName },
  } = useNavigationParams<ScreenKey>();
  const { navigation } = useNavigate();
  const { showConfirmation } = useConfirmation();

  const [listReactions, setListReactions] = useState([
    { code: "VERY_BAD", name: "Quá tệ" },
    { code: "BAD", name: "Không hài lòng" },
    { code: "NOT_GOOD", name: "Bình thường" },
    { code: "GOOD", name: "Hài lòng" },
    { code: "VERY_GOOD", name: "Tuyệt vời" },
  ]);
  const [reaction, setReaction] = useState({
    code: "VERY_GOOD",
    name: "Tuyệt vời",
  });

  const [listComplains, setListComplains] = useState([
    { code: "serviceReview", name: "Chất lượng dịch vụ", isComplained: false },
    { code: "securityReview", name: "Bảo vệ", isComplained: false },
    { code: "receptionReview", name: "Lễ tân", isComplained: false },
    { code: "consultantReview", name: "Tư vấn viên", isComplained: false },
    { code: "staffReview", name: "Bác sĩ", isComplained: false },
    { code: "csReview", name: "Chăm sóc khách hàng", isComplained: false },
    { code: "branchReview", name: "Chi nhánh", isComplained: false },
  ]);
  const [description, setDescription] = useState("");
  const [imagesReview, setImagesReview] = useState([]);

  useEffect(() => {
    if (!isEmpty(review) && !isEmpty(treatmentDetailId)) {
      _getReview(treatmentDetailId);
    }
  }, [treatmentDetailId, review]);

  const _getReview = useCallback(async (_id) => {
    let result = await getReviewByTreatmentDetailForPartner(_id);
    if (result?.isAxiosError) return;

    const {
      reaction,
      serviceReview,
      securityReview,
      receptionReview,
      consultantReview,
      staffReview,
      csReview,
      branchReview,
    } = result?.data?.data;

    let findReaction = listReactions?.find((item) => item?.code == reaction);
    if (!isEmpty(findReaction)) {
      setReaction(findReaction);
    }
    setListComplains([
      {
        code: "serviceReview",
        name: "Chất lượng dịch vụ",
        isComplained: serviceReview?.isComplained,
      },
      {
        code: "securityReview",
        name: "Bảo vệ",
        isComplained: securityReview?.isComplained,
      },
      {
        code: "receptionReview",
        name: "Lễ tân",
        isComplained: receptionReview?.isComplained,
      },
      {
        code: "consultantReview",
        name: "Tư vấn viên",
        isComplained: consultantReview?.isComplained,
      },
      {
        code: "staffReview",
        name: "Bác sĩ",
        isComplained: staffReview?.isComplained,
      },
      {
        code: "csReview",
        name: "Chăm sóc khách hàng",
        isComplained: csReview?.isComplained,
      },
      {
        code: "branchReview",
        name: "Chi nhánh",
        isComplained: branchReview?.isComplained,
      },
    ]);
    setDescription(serviceReview?.comment);
    setImagesReview(
      serviceReview?.imageReview?.map((item) => {
        return {
          ...item,
          uri: `${URL_ORIGINAL}${item?.link}`,
        };
      })
    );
  }, []);

  const _handleChoiceReaction = useCallback(
    (reaction) => () => {
      setReaction(reaction);
    },
    []
  );

  const indexCurrReaction = useMemo(() => {
    let index = listReactions.findIndex((item) => item.code == reaction.code);
    if (index !== -1) {
      return index;
    }
    return 0;
  }, [reaction]);

  const _handleRemoveImage = useCallback(
    (image) => () => {
      let temp = [...imagesReview].filter((item) => item?.name !== image?.name);
      setImagesReview(temp);
    },
    [imagesReview]
  );

  const handleAddImage = useCallback(async () => {
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 6,
      mediaType: "photo",
      compressImageQuality: 0.5,
      compressImageMaxWidth: 500,
    })
      .then(async (images) => {
        let listImages = images.map((i, index) => {
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
            type: i.mime,
            name: `${i.modificationDate}_${index}`,
          };
        });
        setImagesReview((old) => {
          return [...old, ...listImages];
        });
      })
      .catch((e) => {});
  }, []);

  const isComplained = useCallback(
    (code) => {
      return listComplains?.find((item) => item?.code == code)?.isComplained
        ? true
        : false;
    },
    [listComplains]
  );

  const _handleConfirmReview = useCallback(async () => {
    showConfirmation("Xác nhận", "Xác nhận đánh giá dịch vụ này?", async () => {
      let listIdImageHasUpload = [];

      if (!isEmpty(imagesReview)) {
        let resultUploadImage = await uploadModule({
          moduleName: "review",
          files: imagesReview,
        });
        if (resultUploadImage?.isAxiosError) return;

        listIdImageHasUpload = resultUploadImage?.data?.data?.map(
          (item) => item?._id
        );
      }

      let dataFetch = {
        reaction: reaction?.code,
        treatmentDetailId: treatmentDetailId,
        serviceReview: {
          isComplained: isComplained("serviceReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        branchReview: {
          isComplained: isComplained("branchReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        staffReview: {
          isComplained: isComplained("staffReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        consultantReview: {
          isComplained: isComplained("consultantReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        saleReview: {
          isComplained: isComplained("saleReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        auditReview: {
          isComplained: isComplained("auditReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        securityReview: {
          isComplained: isComplained("securityReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        receptionReview: {
          isComplained: isComplained("receptionReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
        csReview: {
          isComplained: isComplained("csReview"),
          comment: description,
          rating: indexCurrReaction + 1,
          isSelected: false,
          imageReview: listIdImageHasUpload,
        },
      };
      let resultCreateReviewTreatment = await createReviewTreatment(dataFetch);
      if (resultCreateReviewTreatment?.isAxiosError) return;
      navigation.goBack();
    });
  }, [reaction, listComplains, description, imagesReview]);

  const hasReview = useMemo(() => {
    return !isEmpty(review);
  }, [review]);

  const ItemComplain = ({ data, disable }) => {
    const _handleChoiceComplain = useCallback(() => {
      let temp = [...listComplains];
      let index = temp?.findIndex((item) => item?.code == data?.code);
      if (index !== -1) {
        if (temp[index]?.isComplained) {
          temp[index].isComplained = false;
        } else {
          temp[index].isComplained = true;
        }
      }
      setListComplains(temp);
    }, [listComplains]);

    return (
      <TouchableOpacity disabled={disable} onPress={_handleChoiceComplain}>
        <Column
          backgroundColor={data?.isComplained ? RED : WHITE}
          borderRadius={4}
          paddingVertical={4}
          borderWidth={1}
          borderColor={data?.isComplained ? RED : NEW_BASE_COLOR}
          paddingHorizontal={8 * 2}
        >
          <Text color={data?.isComplained ? WHITE : BLACK}>{data?.name}</Text>
        </Column>
      </TouchableOpacity>
    );
  };

  return (
    <Screen backgroundColor={WHITE} safeBottom safeTop>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        style={styleElement.flex}
        keyboardVerticalOffset={-bottom}
      >
        <Column
          paddingVertical={_moderateScale(8 * 2)}
          borderBottomWidth={StyleSheet.hairlineWidth}
          borderBottomColor={BG_GREY_OPACITY_5}
        >
          <View style={[styleElement.rowAliCenter]}>
            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={navigation.goBack}
              style={{ paddingHorizontal: _moderateScale(8 * 2) }}
            >
              <Icon name="close" color={BLACK} />
            </TouchableOpacity>
            <Text weight="bold">ĐÁNH GIÁ DỊCH VỤ</Text>
          </View>
        </Column>

        <ScrollView>
          <Row margin={8 * 2}>
            <Text weight="bold">{serviceName}</Text>
          </Row>
          <Spacer top={8 * 2} />
          <Column gap={8 * 2} alignItems="center">
            <Row gap={8 * 2} justifyContent="center">
              {listReactions?.map((item, index) => {
                if (index <= indexCurrReaction) {
                  return (
                    <TouchableOpacity
                      disabled={hasReview}
                      onPress={_handleChoiceReaction(item)}
                    >
                      <Icon size={8 * 5} name="star" color={"#F1CF49"} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      disabled={hasReview}
                      onPress={_handleChoiceReaction(item)}
                    >
                      <Icon
                        size={8 * 5}
                        name="star"
                        color={BG_GREY_OPACITY_7}
                      />
                    </TouchableOpacity>
                  );
                }
              })}
            </Row>
            <Text weight="bold" color={"#F1CF49"}>
              {reaction?.name.toUpperCase()}
            </Text>
          </Column>
          <Spacer top={8 * 2} />

          <Column alignItems="center">
            <Text>
              Điều gì khiến bạn{" "}
              <Text weight="bold" color={RED}>
                KHÔNG
              </Text>{" "}
              hài lòng?
            </Text>
          </Column>
          <Row
            marginTop={8 * 3}
            paddingHorizontal={8 * 4}
            gap={8}
            flexWrap="wrap"
          >
            {listComplains.map((item, index) => {
              return (
                <ItemComplain disable={hasReview} key={index} data={item} />
              );
            })}
          </Row>

          <View style={styles.inputContainer}>
            <TextInput
              editable={!hasReview}
              value={description}
              onChangeText={(e) => setDescription(e)}
              placeholder={
                "Chia sẽ trải nghiệm khi sử dụng dịch vụ, chúng tôi sẽ dành cho bạn một món quà."
              }
              placeholderTextColor={GREY}
              multiline
              scrollEnabled={false}
              style={styles.textInput}
            />
          </View>

          {!isEmpty(imagesReview) ? (
            <Row
              paddingHorizontal={8 * 2}
              flexWrap="wrap"
              gap={8}
              marginTop={8 * 2}
            >
              {imagesReview?.map((item, index) => {
                return (
                  <Column>
                    {!hasReview ? (
                      <TouchableOpacity
                        onPress={_handleRemoveImage(item)}
                        style={styles.btnRemove}
                      >
                        <Icon name="close" color={WHITE} />
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}

                    <Image
                      style={styles.imageReview}
                      source={{ uri: `${item?.uri}` }}
                    />
                  </Column>
                );
              })}
              {!hasReview ? (
                <TouchableOpacity onPress={handleAddImage}>
                  <Column
                    width={(_width - 8 * 2 - 8 * 6) / 4}
                    height={(_width - 8 * 2 - 8 * 6) / 4}
                    style={styleElement.centerChild}
                    borderRadius={4}
                    backgroundColor={BG_GREY_OPACITY_5}
                  >
                    <Column gap={4} alignItems="center">
                      <Icon name="camera-plus-outline" />
                      <Text size={12}>Thêm ảnh</Text>
                    </Column>
                  </Column>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </Row>
          ) : (
            <></>
          )}
          {isEmpty(imagesReview) && !hasReview ? (
            <TouchableOpacity onPress={handleAddImage}>
              <Column
                marginTop={8 * 2}
                height={8 * 10}
                style={styleElement.centerChild}
                marginHorizontal={8 * 2}
                borderRadius={4}
                backgroundColor={BG_GREY_OPACITY_5}
              >
                <Column gap={4} alignItems="center">
                  <Icon name="camera-plus-outline" />
                  <Text size={12}>Thêm ảnh</Text>
                </Column>
              </Column>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {!hasReview ? (
        <ActionButton onPress={_handleConfirmReview} title="Gửi đánh giá" />
      ) : (
        <></>
      )}
    </Screen>
  );
};

export default ServiceReview;

const styles = StyleSheet.create({
  btnRemove: {
    width: 8 * 3,
    height: 8 * 3,
    borderRadius: 8 * 1.5,
    backgroundColor: BLACK_OPACITY_4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    right: 4,
    top: 4,
  },
  imageReview: {
    width: (_width - 8 * 2 - 8 * 6) / 4,
    height: (_width - 8 * 2 - 8 * 6) / 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  inputContainer: {
    minHeight: 8 * 16,
    marginTop: 8 * 4,
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 8 * 2,
    borderColor: NEW_BASE_COLOR,
    marginHorizontal: 8 * 2,
    backgroundColor: BG_GREY_OPACITY_5,
  },
  textInput: {
    flex: 1,
  },
});
