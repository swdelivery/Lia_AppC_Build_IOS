import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { styleText } from "../../../Constant/StyleText";
import { styleElement } from "../../../Constant/StyleElement";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Certificate from "../../../Components/Certificate/Certificate";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { getImageAvataUrl } from "src/utils/avatar";
import FastImage from "@Components/FastImage";
import Icon from "@Components/Icon";
import { GREEN_SUCCESS, RED } from "@Constant/Color";
import Spacer from "@Components/Spacer";
import { isEmpty } from "lodash";
import linking from "src/utils/linking";
import { Branch } from "@typings/branch";

type Props = {
  branch: Branch;
};

const BannerInfo = ({ branch }: Props) => {
  const avatarSource = useMemo(() => {
    return {
      uri: getImageAvataUrl(
        branch?.avatar,
        "https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiZjgxYWIyZTctMGZlZi00YmU2LTZhNmItODI5MWI4YWExZTAwIn0/wp-content/uploads/2023/06/photo.png"
      ),
    };
  }, [branch]);

  const handleOpenLink = useCallback(
    (link: string) => () => {
      linking.open(link);
    },
    []
  );

  const handleOpenMap = useCallback(() => {
    if (branch.address) {
      linking.openMap(branch.address);
    }
  }, [branch]);

  const handleFilePress = useCallback(
    (item: Branch["branchFileArr"][0]) => () => {
      linking.open(getImageAvataUrl(item.fileUpload));
    },
    []
  );

  return (
    <View style={styles.bannerInfo}>
      <View style={styles.bannerInfo__box_avatar_branch}>
        <FastImage
          style={styles.bannerInfo__avatarBranch}
          source={avatarSource}
        />
      </View>

      <Text weight="bold" size={16} color={"#F5DDB0"}>
        {(branch?.name ?? "").toUpperCase()}
      </Text>

      <Row marginTop={8} gap={8}>
        {branch?.branchFileArr?.length > 0 &&
          branch.branchFileArr.map((item) => (
            <View style={styles.certificateContainer} key={item._id}>
              <Certificate item={item} />
            </View>
          ))}
      </Row>
      <CountStar2
        lightContent
        larger
        rating={branch?.averageRating}
        count={branch?.reviewCount}
      />
      <Row gap={8}>
        <Text size={12} color={"white"}>
          Mở cửa
        </Text>
        <Text size={12} weight="bold" color="white">
          8:00 - 18:00
        </Text>
      </Row>
      <Pressable onPress={handleOpenMap}>
        <Row gap={8}>
          <Icon name="map-marker" color={RED} size={14} />
          <Text size={12} weight="bold" color="white">
            {branch?.address}
          </Text>
        </Row>
      </Pressable>

      {!isEmpty(branch?.configureArticleArr)
        ? branch.configureArticleArr.map((item) => (
            <Pressable key={item} onPress={handleOpenLink(item)}>
              <Row gap={8}>
                <Icon name="link-variant" size={14} color="white" />
                <Text
                  weight="bold"
                  textDecorationLine="underline"
                  size={12}
                  color={"white"}
                >
                  {item}
                </Text>
              </Row>
            </Pressable>
          ))
        : null}
      <Spacer top={_moderateScale(8)} />
      <Row gap={8}>
        <Text weight="bold" style={styles.opentime__text}>
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
