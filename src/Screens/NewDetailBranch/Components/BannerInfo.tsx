import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { styleText } from "../../../Constant/StyleText";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import { Certificates } from "../../../Components/Certificate/Certificate";
import Row from "@Components/Row";
import Text from "@Components/Text";
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

  return (
    <View style={styles.bannerInfo}>
      <Text weight="bold" size={16} color={"#F5DDB0"} right={80}>
        {(branch?.name ?? "").toUpperCase()}
      </Text>

      <Certificates data={branch?.branchFileArr} borderColor={"#F5DDB0"} />

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
          {branch.openTime}
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
        <Row gap={4}>
          <Icon name="checkbox-marked-circle" color={GREEN_SUCCESS} size={18} />
          <Text style={styleText.textWhiteSmall500}>An toàn</Text>
        </Row>
        <Row gap={4}>
          <Icon name="checkbox-marked-circle" color={GREEN_SUCCESS} size={18} />
          <Text style={styleText.textWhiteSmall500}>Chuyên môn</Text>
        </Row>
        <Row gap={4}>
          <Icon name="checkbox-marked-circle" color={GREEN_SUCCESS} size={18} />
          <Text style={styleText.textWhiteSmall500}>Kinh nghiệm</Text>
        </Row>
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
