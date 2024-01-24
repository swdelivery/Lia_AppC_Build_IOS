import Column from "@Components/Column";
import Icon from "@Components/Icon";
import { IconBackWhite, IconFacebook, IconWWW } from "@Components/Icon/Icon";
import Image from "@Components/Image";
import HorizontalLine from "@Components/Line/HorizontalLine";
import Row from "@Components/Row";
import Screen from "@Components/Screen";
import Spacer from "@Components/Spacer";
import { StatusBar } from "@Components/StatusBar";
import Text from "@Components/Text";
import {
  BASE_COLOR,
  BLACK_OPACITY_4,
  GREY,
  GREY_FOR_TITLE,
  NEW_BASE_COLOR,
  WHITE,
} from "@Constant/Color";
import { styleElement } from "@Constant/StyleElement";
import { getAboutLiA } from "@Redux/aboutLiA/actions";
import { getAboutLiAState } from "@Redux/aboutLiA/selectors";
import { first } from "lodash";
import React, { useCallback, useEffect, useMemo } from "react";
import { Alert, ImageBackground, Linking, ScrollView, StyleSheet } from "react-native";
import Rate, { AndroidMarket } from "react-native-rate";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";
import EnhancedImageViewing from 'react-native-image-viewing/dist/ImageViewing';
import { getImageAvataUrl } from "src/utils/avatar";
import useVisible from "src/Hooks/useVisible";

const AboutLiA = () => {
  const { data } = useSelector(getAboutLiAState);
  const { top } = useSafeAreaInsets();
  const { navigation } = useNavigate();
  const dispatch = useDispatch();
  const imageViewer = useVisible()

  useEffect(() => {
    dispatch(getAboutLiA.request());
  }, []);

  const _handleRateApp = useCallback(() => {
    const options = {
      AppleAppID: "id6474897526",
      GooglePackageName: "com.digitech.lia",
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        console.log({ success });
      }
      if (errorMessage) {
        console.error(`Example page Rate.rate() error: ${errorMessage}`);
      }
    });
  }, []);

  const _handleLinking = useCallback(
    (link) => () => {
      Linking.openURL(link);
    },
    [data]
  );

  const listImageToViewing = useMemo(() => {
    return data?.imageFile?.map(item => {
      return {
        uri: getImageAvataUrl(item)
      }
    })
  }, [data?.imageFile])
  const _handlePressImage = useCallback((idx: number) => () => {
    imageViewer.show(idx)
  }, [])

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        resizeMode={"stretch"}
        style={styleElement.flex}
        source={require("../../NewImage/ExaminationResult/bgExaminationResult.png")}
      >
        <Column
          onPress={navigation.goBack}
          backgroundColor={BLACK_OPACITY_4}
          top={top + 20}
          borderRadius={8 * 10}
          left={20}
          position="absolute"
        >
          <IconBackWhite />
        </Column>

        <Column
          borderTopLeftRadius={8 * 2}
          borderTopRightRadius={8 * 2}
          marginTop={8 * 20}
          backgroundColor={WHITE}
          flex={1}
        >
          <Column
            alignSelf="center"
            top={-8 * 5}
            borderWidth={1}
            position="absolute"
            zIndex={1}
            width={8 * 10}
            height={8 * 10}
            borderRadius={8 * 10 / 2}
            style={[styleElement.shadow, styleElement.centerChild]}>
            <Image style={[styles.logo]} avatar={data?.logoFile ?? null} />
          </Column>

          <ScrollView>
            <Column alignItems="center" marginTop={50} marginHorizontal={16}>
              <Text color={BASE_COLOR} size={18} weight="bold">
                {data?.name ?? ""}
              </Text>
              <Text>{data?.description ?? ""}</Text>
              <Text>{data?.slogan ?? ""}</Text>

              <Row gap={8} marginTop={8 * 2}>
                {!!data?.facebook_link && (
                  <Column onPress={_handleLinking(data?.facebook_link)}>
                    <IconFacebook width={8 * 4} height={8 * 4} />
                  </Column>
                )}
                {!!data?.website && (
                  <Column
                    onPress={_handleLinking(data?.website)}
                    style={styleElement.centerChild}
                    backgroundColor={NEW_BASE_COLOR}
                    width={8 * 4}
                    borderRadius={4}
                    height={8 * 4}
                  >
                    <IconWWW width={8 * 3} height={8 * 3} />
                  </Column>
                )}
                <Row
                  onPress={_handleRateApp}
                  borderRadius={4}
                  paddingHorizontal={8}
                  backgroundColor={NEW_BASE_COLOR}
                  height={8 * 4}
                  gap={4}
                >
                  <Icon name="star" color="#FFC007" />
                  <Text weight="bold" color={WHITE}>
                    Đánh giá
                  </Text>
                </Row>
              </Row>
            </Column>
            <Spacer top={8 * 3} />

            {
              data?.imageFile?.length > 0 ?
                <>
                  {
                    data?.imageFile?.length == 1 ?
                      <Column onPress={_handlePressImage(0)} alignSelf="center">
                        <Image style={styles.image} avatar={first(data?.imageFile)} />
                      </Column>
                      :
                      <>
                        <ScrollView
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{ gap: 8, paddingHorizontal: 8 * 2, flexGrow: 1 }}
                          horizontal
                        >
                          {data?.imageFile?.map((item, index) => {
                            return (
                              <Column onPress={_handlePressImage(index)}>
                                <Image key={item?._id} style={styles.image} avatar={item} />
                              </Column>
                            );
                          })}
                        </ScrollView>
                      </>
                  }
                </>
                :
                <>
                </>
            }
            <HorizontalLine
              marginTop={8 * 2}
              height={4}
              backgroundColor={"#F3F4F9"}
            />
            <Column gap={12} padding={8 * 2}>
              <Text weight="bold" size={16} color={BASE_COLOR}>
                Thông tin về LiA
              </Text>
              <Row>
                <Column flex={1}>
                  <Text weight="bold">Hotline</Text>
                </Column>
                <Column flex={5}>
                  <Text color={BASE_COLOR} weight="bold">
                    {data?.hotline}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column flex={1}>
                  <Text weight="bold">Email</Text>
                </Column>
                <Column flex={5}>
                  <Text color={GREY}>{data?.email}</Text>
                </Column>
              </Row>
              <Column gap={8}>
                <Column>
                  <Text weight="bold">Địa chỉ</Text>
                </Column>
                <Column>
                  <Text color={GREY}>{data?.address?.fullAddress}</Text>
                </Column>
              </Column>
            </Column>
          </ScrollView>
        </Column>
        <EnhancedImageViewing
          images={listImageToViewing}
          imageIndex={imageViewer.selectedItem.current}
          onRequestClose={imageViewer.hide}
          visible={imageViewer.visible}
        />
      </ImageBackground>
    </Screen>
  );
};

export default AboutLiA;

const styles = StyleSheet.create({
  image: {
    width: 8 * 20,
    height: 8 * 20,
    borderRadius: 8,
  },
  logo: {
    width: 8 * 10,
    height: 8 * 10,
    borderRadius: (8 * 10) / 2,

  },
});
