import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { _width } from "@Constant/Scale";
import { URL_ORIGINAL } from "@Constant/Url";
import { formatMonney } from "@Constant/Utils";

type Props = {
  item: any;
};

export default function ServiceItem({ item }: Props) {
  const navigation = useNavigation();

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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Image style={styles.start} source={require('../../../../Image/locationRed.png')}/> */}
              <Image
                style={styles.start}
                source={require("../../../Image/a_star2.png")}
              />
              <Image
                style={styles.start}
                source={require("../../../Image/a_star2.png")}
              />
              <Image
                style={styles.start}
                source={require("../../../Image/a_star2.png")}
              />
              <Image
                style={styles.start}
                source={require("../../../Image/a_star2.png")}
              />
              <Image
                style={styles.start}
                source={require("../../../Image/a_star2.png")}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                source={require("../../../Image/people.png")}
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
}

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
