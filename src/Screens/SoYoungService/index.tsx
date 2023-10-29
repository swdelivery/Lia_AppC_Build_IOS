import React, { memo, useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { _width } from "../../Constant/Scale";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { getServicev2 } from "../../Redux/Action/Service";
import { URL_ORIGINAL } from "../../Constant/Url";
import { formatMonney } from "../../Constant/Utils";

const SoYoungService = memo((props) => {
  const [listService, setListService] = useState([]);

  useEffect(() => {
    _getListService();
    // _startAnimation()
  }, []);
  const _getListService = async () => {
    let result = await getServicev2({
      sort: {
        orderNumber: -1,
      },
      limit: 8,
      page: 1,
    });
    if (result?.isAxiosError) return;
    setListService(result?.data?.data);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {listService?.map((item, index) => {
          return (
            <View style={styles.card} key={item._id}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(ScreenKey.DETAIL_SERVICE);
                }}
                style={{
                  width: "90%",
                  height: 180,
                  backgroundColor: "white",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <View>
                  <Image
                    style={{
                      width: "100%",
                      height: 120,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    source={{
                      uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`,
                    }}
                  />
                </View>
                <View
                  style={{
                    padding: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.name}
                  </Text>

                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {/* <Image style={styles.start} source={require('../../../Image/locationRed.png')}/> */}
                      <Image
                        style={styles.start}
                        source={require("../../Image/a_star2.png")}
                      />
                      <Image
                        style={styles.start}
                        source={require("../../Image/a_star2.png")}
                      />
                      <Image
                        style={styles.start}
                        source={require("../../Image/a_star2.png")}
                      />
                      <Image
                        style={styles.start}
                        source={require("../../Image/a_star2.png")}
                      />
                      <Image
                        style={styles.start}
                        source={require("../../Image/a_star2.png")}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          marginLeft: 4,
                        }}
                      >
                        ({item?.reviewCount})
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "red",
                          textDecorationLine: "underline",
                        }}
                      >
                        đ
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {formatMonney(item?.price)}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={styles.start}
                        source={require("../../Image/people.png")}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          marginLeft: 4,
                        }}
                      >
                        ({item?.countPartner})
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View
        style={{
          height: 200,
        }}
      />
      {/* <View style={{
                height: 200
            }} />
            <View style={{
                height: 200
            }} />
            <View style={{
                height: 200
            }} /> */}
    </View>
  );
});

export default SoYoungService;

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.25,
    height: 8 * 1.25,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: _width / 2,
    height: _width / 2,
    alignItems: "center",
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
});
