import { Image, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { sizeIcon } from "../../../Constant/Icon";
import IconLink from "../../../SGV/link.svg";
import { styleText } from "../../../Constant/StyleText";
import { styleElement } from "../../../Constant/StyleElement";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Certificate from "../../../Components/Certificate/Certificate";
import { getBranchDetailsState } from "@Redux/branch/selectors";
import { useSelector } from "react-redux";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { getImageAvataUrl } from "src/utils/avatar";
import FastImage from "@Components/FastImage";
import Icon from "@Components/Icon";
import { GREEN_SUCCESS, RED } from "@Constant/Color";
import Spacer from "@Components/Spacer";

const BannerInfo = () => {
  const { data } = useSelector(getBranchDetailsState);

  const avatarSource = useMemo(() => {
    return {
      uri: getImageAvataUrl(
        data?.avatar,
        "https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiZjgxYWIyZTctMGZlZi00YmU2LTZhNmItODI5MWI4YWExZTAwIn0/wp-content/uploads/2023/06/photo.png"
      ),
    };
  }, [data]);

  return (
    <View style={styles.bannerInfo}>
      <View style={styles.bannerInfo__box_avatar_branch}>
        <FastImage
          style={styles.bannerInfo__avatarBranch}
          source={avatarSource}
        />
      </View>

      <Text weight="bold" size={16} color={"#F5DDB0"}>
        {(data?.name ?? "").toUpperCase()}
      </Text>

      <Row top={8} gap={8}>
        <View style={styles.certificateContainer}>
          <Certificate larger bg={"black"} name={"Phòng khám"} />
        </View>
        <View style={styles.certificateContainer}>
          <Certificate larger name={"Giấy phép"} />
        </View>
        <View style={styles.certificateContainer}>
          <Certificate larger bg={"blue"} name={"Lorem ipsum"} />
        </View>
      </Row>
      <CountStar2
        lightContent
        larger
        rating={data?.averageRating}
        count={data?.reviewCount}
      />
      <Row gap={8}>
        <Text size={12} color={"white"}>
          Mở cửa
        </Text>
        <Text size={12} weight="bold" color="white">
          8:00 - 18:00
        </Text>
      </Row>
      <Row gap={8}>
        <Icon name="map-marker" color={RED} size={14} />
        <Text size={12} weight="bold" color="white">
          {data?.address}
        </Text>
      </Row>
      <Row gap={8}>
        <Icon name="link-variant" size={14} color="white" />
        <Text
          style={[
            styles.opentime__text,
            { fontWeight: "500", textDecorationLine: "underline" },
          ]}
        >
          https://liabeauty.vn/phau-thuat/sua-mui/
        </Text>
      </Row>
      <Row gap={8}>
        <Icon name="link-variant" size={14} color="white" />
        <Text
          weight="bold"
          size={12}
          color={"white"}
          textDecorationLine={"underline"}
        >
          https://liabeauty.vn/phau-thuat/nhan-mi-mat/
        </Text>
      </Row>
      <Spacer top={_moderateScale(8)} />
      <Row gap={8}>
        <Text style={[styles.opentime__text, { fontWeight: "bold" }]}>
          Đảm bảo:
        </Text>
        <View style={[styleElement.rowAliCenter]}>
          <Icon name="checkbox-marked-circle" color={GREEN_SUCCESS} size={18} />
          <Text style={styleText.textWhiteSmall500} left={4}>
            An toàn
          </Text>
        </View>
        <View style={[styleElement.rowAliCenter]}>
          <Icon name="checkbox-marked-circle" color={GREEN_SUCCESS} size={18} />
          <Text style={styleText.textWhiteSmall500}>Chuyên môn</Text>
        </View>
        <View style={[styleElement.rowAliCenter]}>
          <Icon name="checkbox-marked-circle" color={GREEN_SUCCESS} size={18} />
          <Text style={styleText.textWhiteSmall500}>Kinh nghiệm</Text>
        </View>
      </Row>
    </View>
  );
};

export default BannerInfo;

const styles = StyleSheet.create({
  opentime__text: {
    fontSize: _moderateScale(12),
    color: "white",
  },
  bannerInfo__box_avatar_branch: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: _moderateScale((8 * 8) / 2),
    borderBottomRightRadius: 8,
    borderWidth: 2,
    borderColor: "black",
    position: "absolute",
    right: _moderateScale(8 * 2),
    top: -_moderateScale(8 * 3),
  },
  bannerInfo__avatarBranch: {
    width: _moderateScale(8 * 6),
    height: _moderateScale(8 * 6),
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: _moderateScale(8 * 6) / 2,
  },
  nameBranch: {
    fontSize: _moderateScale(16),
    color: "#F5DDB0",
    textTransform: "uppercase",
    fontWeight: "bold",
    width: _widthScale(260),
  },
  bannerInfo: {
    width: _width,
    borderWidth: 1,
    padding: _moderateScale(8 * 2),
    backgroundColor: "#1F1810",
    paddingBottom: _moderateScale(8 * 5),
    gap: 8,
  },
  certificateContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
  },
});
