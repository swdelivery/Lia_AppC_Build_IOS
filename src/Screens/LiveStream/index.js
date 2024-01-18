import React, { useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GREY, WHITE } from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { sizeLogo } from "../../Constant/Icon";
import { _moderateScale } from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import AlarmNotifi from "../../Components/AlarmNotifi/AlarmNotifi";

const HomeScreen = () => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const infoUserRedux = useSelector((state) => state?.infoUserReducer);
  return (
    <View style={styles.container}>
      <StatusBarCustom />

      <Animated.ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={[styles.bannerContainer]}>
          <Animated.Image
            resizeMode={"contain"}
            style={[styles.banner(scrollA)]}
            source={require("../../Image/header/header1.png")}
          />
          <View
            style={{
              position: "absolute",
              top: _moderateScale(500),
              width: "100%",
            }}
          >
            <View
              style={[
                styleElement.rowAliCenter,
                {
                  justifyContent: "space-between",
                  paddingHorizontal: _moderateScale(8 * 4),
                  marginTop: _moderateScale(8 * 2),
                },
              ]}
            >
              <Image
                style={[sizeLogo.xl]}
                source={require("../../Image/auth/logo.png")}
              />
              <AlarmNotifi />
            </View>

            <Text style={[stylesFont.fontNolanBold, styles.title]}>
              Livestream
            </Text>

            {/* <Text style={[stylesFont.fontNolanBold, styles.title]}>
                            Hi, {
                               `${infoUserRedux?.infoUser?.name}`
                            }
                        </Text>
                        <Text style={[stylesFont.fontNolan, styles.title, { marginTop: _moderateScale(4) }]}>
                            Welcome Back
                        </Text> */}

            <View
              style={{
                paddingHorizontal: _moderateScale(8 * 4),
                marginTop: _moderateScale(8 * 7),
              }}
            >
              {/* <View style={styles.inputHeader}>
                                <TextInput
                                    placeholderTextColor={GREY}
                                    style={[stylesFont.fontNolan, { flex: 1 }]}
                                    placeholder={'Bạn cần tìm ?'} />
                                <Image
                                    style={[sizeIcon.sm]}
                                    source={require('../../Image/header/search.png')} />
                            </View> */}
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: WHITE,
            flex: 1,
            paddingBottom: _moderateScale(8 * 20),
          }}
        >
          <View style={styles.wave} />
          <Image
            style={{
              width: _moderateScale(250),
              height: _moderateScale(300),
              resizeMode: "contain",
              alignSelf: "center",
            }}
            source={require("../../Image/component/update.png")}
          />
          <Text
            style={[
              stylesFont.fontNolan500,
              {
                fontSize: _moderateScale(18),
                alignSelf: "center",
                marginTop: _moderateScale(8 * 3),
                color: GREY,
              },
            ]}
          >
            Tính năng sẽ sớm được ra mắt
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnOptions__icon: {
    width: _moderateScale(8 * 6),
    height: _moderateScale(8 * 6),
    resizeMode: "contain",
  },
  btnOptions: {
    width: _moderateScale(100),
    height: _moderateScale(100),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  inputHeader: {
    width: "100%",
    backgroundColor: "rgba(244, 244, 244,0.7)",
    borderRadius: _moderateScale(8 * 4),
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    fontSize: _moderateScale(14),
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: _moderateScale(28),
    color: WHITE,
    marginLeft: _moderateScale(8 * 4),
    marginTop: _moderateScale(8 * 3),
  },

  wave: {
    width: "100%",
    height: _moderateScale(8 * 4),
    backgroundColor: WHITE,
    borderTopStartRadius: _moderateScale(8 * 3),
    borderTopEndRadius: _moderateScale(8 * 3),
    position: "absolute",
    top: -_moderateScale(8 * 4 - 1),
  },
  bannerContainer: {
    marginTop: -_moderateScale(500),
    paddingTop: _moderateScale(500),
    alignItems: "center",
    overflow: "hidden",
  },
  banner: (scrollA) => ({
    height: _moderateScale(300),
    // width: 100%,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [
            -_moderateScale(300),
            0,
            _moderateScale(300),
            _moderateScale(300) + 1,
          ],
          outputRange: [
            -_moderateScale(300) / 2,
            0,
            _moderateScale(300) * 0.75,
            _moderateScale(300) * 0.75,
          ],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [
            -_moderateScale(300),
            0,
            _moderateScale(300),
            _moderateScale(300) + 1,
          ],
          // outputRange: [2, 1, 0.5, 0.5],
          outputRange: [2, 1, 1, 1],
        }),
      },
    ],
  }),
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,

  elevation: 11,
};

export default HomeScreen;
