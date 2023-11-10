import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Certificate from "../../../Components/Certificate/Certificate";
import { useSelector } from "react-redux";
import Avatar from "@Components/Avatar";
import Text from "@Components/Text";
import Row from "@Components/Row";
import Column from "@Components/Column";
import HorizontalServices from "@Components/HorizontalServices";
import Spacer from "@Components/Spacer";
import { getPractitionerDetailsState } from "@Redux/practitioner/selectors";

const Banner = () => {
  const { data } = useSelector(getPractitionerDetailsState);

  return (
    <View style={[styles.banner, shadow]}>
      <View style={styles.avatarContainer}>
        <Avatar size={72} circle avatar={data.avatar} style={styles.avatar} />
      </View>

      <Spacer top={50} />
      <Column alignItems={"center"}>
        <Text weight="bold">{data?.name}</Text>
        <CountStar2 count={data?.reviewCount} rating={data?.averageRating} />
        <Text>
          {data?.position} <Text color="grey">{` | `}</Text> {data?.experience}
        </Text>

        <Row gap={4} flexWrap="wrap" marginTop={8}>
          {data?.practitionerFileArr?.map((item, index) => {
            return <Certificate item={item} key={item._id} />;
          })}
        </Row>

        <View style={styles.infoHorizon}>
          <View style={styles.infoHorizon__box}>
            <Text weight="bold">{data?.reviewCount}</Text>
            <Text style={styles.infoHorizon__box__textDown}>Lượt đánh giá</Text>
          </View>
          <View style={styles.infoHorizon__box}>
            <Text weight="bold">{data?.countPartner}</Text>
            <Text style={styles.infoHorizon__box__textDown}>
              Khách đã điều trị
            </Text>
          </View>
        </View>
      </Column>
      <Column right={8} gap={8} top={8} left={0}>
        <Row left={16} gap={4}>
          <Image
            style={styles.iconLike}
            source={require("../../../Image/like.png")}
          />
          <Text weight="bold">Chuyên dự án: {data?.specialization}</Text>
        </Row>
        {data?.practitionerServices?.length > 0 && (
          <HorizontalServices items={data.practitionerServices} />
        )}
      </Column>

      {/* {diaries.length > 0 && (
        <Column right={8} gap={8} top={16} left={0}>
          <Row left={16} gap={4}>
            <Image
              style={styles.iconLike}
              source={require("../../../Image/diamon.png")}
            />
            <Text weight="bold">Danh sách Nhật ký nổi bật 2023</Text>
          </Row>
          <PartnerDiary items={diaries} />
        </Column>
      )} */}
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  box__diary__name: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: _moderateScale(8),
    marginBottom: _moderateScale(8),
  },
  box__diary__nameService: {
    fontSize: _moderateScale(14),
    fontWeight: "500",
  },
  verticalLine: {
    width: _moderateScale(2),
    height: _moderateScale(8 * 3),
    backgroundColor: "red",
    marginRight: _moderateScale(4),
  },
  absoluteText: {
    paddingHorizontal: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    backgroundColor: "rgba(0,0,0,.5)",
    position: "absolute",
    left: 0,
    zIndex: 1,
    bottom: 0,
    borderTopRightRadius: _moderateScale(8),
  },
  box__diary__image: {
    width: _moderateScale(8 * 11.5),
    height: _moderateScale(8 * 11.5),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
  },
  box__diary: {
    width: _moderateScale(8 * 26),
    // height: _moderateScale(8 * 15),
    marginRight: _moderateScale(8),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.2)",
    paddingBottom: _moderateScale(8),
  },
  customer__updateTime: {
    fontSize: _moderateScale(12),
    flex: 1,
    marginLeft: _moderateScale(4),
    color: "grey",
  },
  customer__name: {
    fontSize: _moderateScale(14),
    flex: 1,
    marginLeft: _moderateScale(4),
    fontWeight: "500",
  },
  avatar__customer: {
    width: _moderateScale(8 * 4),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale((8 * 4) / 2),
  },
  iconLike: {
    width: _moderateScale(8 * 2.5),
    height: _moderateScale(8 * 2.5),
    resizeMode: "cover",
  },
  box__child: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: _widthScale(320),
    marginTop: _moderateScale(8),
    // height: 100,
  },
  infoHorizon__box__textDown: {
    fontSize: _moderateScale(12),
  },
  infoHorizon__box__textUp: {
    fontSize: _moderateScale(15),
    fontWeight: "500",
  },
  infoHorizon__box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoHorizon: {
    width: _widthScale(300),
    minHeight: 50,
    flexDirection: "row",
  },
  banner__name__doctor: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
  },
  avatarContainer: {
    top: -30,
    alignSelf: "center",
    position: "absolute",
  },
  avatar: {
    borderBottomRightRadius: 0,
  },
  banner: {
    backgroundColor: "white",
    borderRadius: _moderateScale(8 * 3),
    paddingBottom: _moderateScale(8 * 3),
    marginBottom: 8,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 1,

  elevation: 3,
};
