import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, BG_BEAUTY_OPACITY_1, BG_BEAUTY_OPACITY_2, BG_GREY_OPACITY_5, BLACK, BLACK_OPACITY_7, BLUE_FB, BORDER_COLOR, BORDER_TOPPING_GROUP, GREY, PRICE_ORANGE, WHITE } from "@Constant/Color";
import { stylesFont } from "@Constant/Font";
import { URL_ORIGINAL } from "@Constant/Url";
import { formatMonney } from "@Constant/Utils";
import { ItemOptions, Service } from "@typings/serviceGroup";
import React, { useEffect } from "react";
import { Image, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styleElement } from "@Constant/StyleElement";
import { sizeIcon } from "@Constant/Icon";
import Icon from "@Components/Icon";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Column from "@Components/Column";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { _moderateScale, _width } from "@Constant/Scale";
import { BackIcon, IconDoubleRightArrow } from "@Components/Icon/Icon";
import { navigation } from "rootNavigation";

type Props = {
  data?: Service,
  setIsCollapDescription?: (boolean) => void,
  isCollapDescription?: boolean,
  setCurrDescriptionTopping?: (any) => void,
  setIndex?: (number) => void,
  handleConfirm?: () => void,
  handleChoiceSingle?: (data: any, groupCode: any) => void,
  handleChoiceMulti?: (data: any, groupCode: any) => void,
  listChoice?: any[],
  onCancel?: () => void,
}

export const TabInfo = ({ data, handleChoiceMulti, handleChoiceSingle, handleConfirm, isCollapDescription, listChoice, setCurrDescriptionTopping, setIndex, setIsCollapDescription, onCancel }: Props) => {
  const { top } = useSafeAreaInsets()
  return (
    <Column flex={1}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}>
        <Column flex={1}>
          <Column gap={_moderateScale(10)}>
            <Row position="relative">
              <Image
                style={{
                  width: _width,
                  height: _width * SERVICE_BANNER_RATIO
                }}
                source={{
                  uri: `${URL_ORIGINAL}${(data?.representationFileArr != null && data?.representationFileArr?.length > 0) ? data?.representationFileArr[0]?.link : ''}`,
                }}
              />
              <Row top={_moderateScale(16)} position="absolute" zIndex={1}>
                <TouchableOpacity onPress={onCancel}>
                  <BackIcon color={BASE_COLOR} />
                </TouchableOpacity>
              </Row>
            </Row>
            <Row backgroundColor={WHITE} paddingHorizontal={_moderateScale(10)} gap={_moderateScale(10)} justifyContent="space-between">
              <Text style={{ textAlign: "left" }} numberOfLines={2} flex={1} size={_moderateScale(16)} weight="bold" color={BASE_COLOR}>
                {data?.name}
              </Text>
              {
                (data?.isOnFlashSale && data?.preferentialInCurrentFlashSale)
                  ? (
                    <Column gap={_moderateScale(5)}>
                      <Text style={{ textAlign: "right" }} weight="bold" size={_moderateScale(16)} color={BASE_COLOR}>
                        {formatMonney(
                          data?.preferentialInCurrentFlashSale?.finalPrice
                        )}{" "}
                        VND
                      </Text>
                      <Text style={{ textAlign: "right" }} textDecorationLine="line-through" color={GREY}>
                        {formatMonney(data?.price)}{" "}
                        VND
                      </Text>
                    </Column>
                  ) : (
                    <Text style={{ textAlign: "right" }} weight="bold" size={_moderateScale(16)} color={BASE_COLOR}>
                      {formatMonney(data?.price)}{" "}
                      VND
                    </Text>
                  )
              }
            </Row>
          </Column>
          {
            data?.description && (
              <Row backgroundColor={WHITE} paddingHorizontal={_moderateScale(10)}>
                {
                  isCollapDescription ? (
                    <Text
                      onLayout={(e) => {
                        console.log({ ...e });
                      }}
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK_OPACITY_7,
                        marginRight: 4,
                        textAlign: "justify"
                      }}
                    >
                      {data?.description?.slice(0, 85)}... {` `}
                      <Text
                        style={{
                          color: BASE_COLOR,
                          marginLeft: _moderateScale(8 * 2),
                        }}
                        onPress={() => {
                          setIsCollapDescription(false);
                          LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                          );
                        }}
                      >
                        Xem thêm
                      </Text>
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: BLACK_OPACITY_7,
                        marginRight: 4,
                        textAlign: "justify"
                      }}
                    >
                      {data?.description} {` `}
                      <Text
                        style={{
                          color: BASE_COLOR,
                          marginLeft: _moderateScale(8 * 2),
                        }}
                        onPress={() => {
                          setIsCollapDescription(true);
                          LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                          );
                        }}
                      >
                        Thu gọn
                      </Text>
                    </Text>
                  )
                }
              </Row>
            )
          }
          {
            data?.options?.map(item => {
              return (
                <Column backgroundColor={WHITE} borderTopColor={BORDER_TOPPING_GROUP} borderTopWidth={_moderateScale(5)}>
                  <Row padding={_moderateScale(10)} justifyContent="flex-start">
                    <Text flex={1} weight="bold" color={BASE_COLOR}>{item?.groupName}</Text>
                  </Row>
                  {
                    item?.data.map(itemChild => {
                      return (
                        <Row padding={_moderateScale(10)} borderBottomColor={BORDER_COLOR} borderBottomWidth={_moderateScale(1)}>
                          {item?.type == "single" && (
                            <>
                              {listChoice?.find(
                                (itemFind) => itemFind?._id == itemChild?._id && itemFind?.groupCode == itemChild?.groupCode
                              ) ? (
                                <TouchableOpacity
                                  hitSlop={styleElement.hitslopSm}
                                  onPress={() => {
                                    handleChoiceSingle(
                                      itemChild,
                                      item?.groupCode
                                    );
                                  }}
                                >
                                  <Icon
                                    name="radiobox-marked"
                                    color={BASE_COLOR}
                                    style={sizeIcon.llg}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  hitSlop={styleElement.hitslopSm}
                                  onPress={() => {
                                    handleChoiceSingle(
                                      itemChild,
                                      item?.groupCode
                                    );
                                  }}
                                >
                                  <Icon
                                    name="radiobox-blank"
                                    color={GREY}
                                    style={sizeIcon.llg}
                                  />
                                </TouchableOpacity>
                              )}
                            </>
                          )}
                          {item?.type == "multiple" && (
                            <>
                              {listChoice?.find(
                                (itemFind) => itemFind?._id == itemChild?._id && itemFind?.groupCode == itemChild?.groupCode
                              ) ? (
                                <TouchableOpacity
                                  hitSlop={styleElement.hitslopSm}
                                  onPress={() => {
                                    handleChoiceMulti(
                                      itemChild,
                                      item?.groupCode
                                    );
                                  }}
                                >
                                  <Icon
                                    name="checkbox-marked"
                                    color={BASE_COLOR}
                                    style={sizeIcon.llg}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  hitSlop={styleElement.hitslopSm}
                                  onPress={() => {
                                    handleChoiceMulti(
                                      itemChild,
                                      item?.groupCode
                                    );
                                  }}
                                >
                                  <Icon
                                    name="checkbox-blank-outline"
                                    color={GREY}
                                    style={sizeIcon.llg}
                                  />
                                </TouchableOpacity>
                              )}
                            </>
                          )}
                          <Row flex={1} justifyContent="space-between" alignContent="center">
                            <Row flex={1} paddingRight={_moderateScale(30)}>
                              <Text color={BASE_COLOR} numberOfLines={1}>
                                {itemChild?.name}
                              </Text>
                              <TouchableOpacity onPress={() => {
                                setCurrDescriptionTopping({
                                  ...itemChild,
                                  typeOption: item?.type,
                                  groupCode: item?.groupCode,
                                });
                                setIndex(1);
                              }}>
                                <Text color={BASE_COLOR} size={_moderateScale(16)} weight="bold">{"   "}{">>"}</Text>
                              </TouchableOpacity>
                            </Row>
                            <Column paddingLeft={_moderateScale(10)}>
                              <Text numberOfLines={1} weight="bold" color={BASE_COLOR}>
                                {formatMonney(itemChild?.extraAmount)}
                              </Text>
                            </Column>
                          </Row>
                        </Row>
                      )
                    })
                  }
                </Column>
              )
            })
          }
        </Column>
      </KeyboardAwareScrollView>
      <View
        style={[
          {
            flexDirection: "row",
            paddingVertical: _moderateScale(8),
            paddingBottom: getBottomSpace() + _moderateScale(8),
            paddingHorizontal: _moderateScale(8 * 2),
            backgroundColor: WHITE,
            borderTopWidth: 0.5,
            borderColor: BG_GREY_OPACITY_5,
            position: "absolute",
            bottom: 0,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handleConfirm();
          }}
          style={[
            styles.styleBtnConfirm,
          ]}
        >
          {data?.isOnFlashSale &&
            data?.preferentialInCurrentFlashSale ? (
            <Text
              style={[
                stylesFont.fontNolanBold,
                { fontSize: _moderateScale(16), color: WHITE },
              ]}
            >
              Xác nhận{" - "}
              {formatMonney(
                data?.preferentialInCurrentFlashSale?.finalPrice +
                listChoice?.reduce((total, item) => {
                  return (total +=
                    item?.extraAmount != null ? item.extraAmount : 0);
                }, 0)
              )}
              VNĐ
            </Text>
          ) : (
            <Text
              style={[
                stylesFont.fontNolanBold,
                { fontSize: _moderateScale(16), color: WHITE },
              ]}
            >
              Xác nhận (
              {formatMonney(
                data?.price +
                listChoice?.reduce((total, item) => {
                  return (total +=
                    item?.extraAmount != null ? item.extraAmount : 0);
                }, 0)
              )}
              )
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Column>
  );
}

const styles = StyleSheet.create({
  styleBtnConfirm: {
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BASE_COLOR,
    flex: 1,
  },
})
