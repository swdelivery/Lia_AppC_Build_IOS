import { Image, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { BLACK, WHITE } from "@Constant/Color";
import Row from "@Components/Row";
import { getListPartnerLevelState } from "@Redux/affiliate/selectors";
import { useSelector } from "react-redux";
import { PartnerLevel } from "@typings/affiliate";

type Props = {
  currIndexCard: number;
  // NOTICE
  visiblePromotionPolicy: any;
};

const InfoReward = ({ currIndexCard, visiblePromotionPolicy }: Props) => {
  const { data: listPartnerLevel } = useSelector(getListPartnerLevelState);

  const currLevelByIndex: PartnerLevel = useMemo(() => {
    return listPartnerLevel[currIndexCard];
  }, [currIndexCard, listPartnerLevel]);

  const generateColor = useMemo(() => {
    switch (currIndexCard) {
      case 0:
        return "#B3653A";
      case 1:
        return "#4B7697";
      case 2:
        return "#DBAA46";
      case 3:
        return "#4AB4C9";
      default:
        return BLACK;
    }
  }, [currIndexCard]);

  const generateIcon1 = useMemo(() => {
    switch (currIndexCard) {
      case 0:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/bronze1.png")}
          />
        );
      case 1:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/silver1.png")}
          />
        );
      case 2:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/gold1.png")}
          />
        );
      case 3:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/platinum1.png")}
          />
        );
      default:
        break;
    }
  }, [currIndexCard]);
  const generateIcon2 = useMemo(() => {
    switch (currIndexCard) {
      case 0:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/bronze2.png")}
          />
        );
      case 1:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/silver2.png")}
          />
        );
      case 2:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/gold2.png")}
          />
        );
      case 3:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/platinum2.png")}
          />
        );
      default:
        break;
    }
  }, [currIndexCard]);
  const generateIcon3 = useMemo(() => {
    switch (currIndexCard) {
      case 0:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/bronze3.png")}
          />
        );
      case 1:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/silver3.png")}
          />
        );
      case 2:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/gold3.png")}
          />
        );
      case 3:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/platinum3.png")}
          />
        );
      default:
        break;
    }
  }, [currIndexCard]);
  const generateIcon4 = useMemo(() => {
    switch (currIndexCard) {
      case 0:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/bronze4.png")}
          />
        );
      case 1:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/silver4.png")}
          />
        );
      case 2:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/gold4.png")}
          />
        );
      case 3:
        return (
          <Image
            style={styles.btn}
            source={require("../../../NewImage/Affiliate/platinum4.png")}
          />
        );
      default:
        break;
    }
  }, [currIndexCard]);

  const generateTitle = useMemo(() => {
    switch (currIndexCard) {
      case 0:
        return (
          <Image
            resizeMode="contain"
            style={styles.title}
            source={require("../../../NewImage/Affiliate/bronzeTitle.png")}
          />
        );
      case 1:
        return (
          <Image
            resizeMode="contain"
            style={styles.title}
            source={require("../../../NewImage/Affiliate/silverTitle.png")}
          />
        );
      case 2:
        return (
          <Image
            resizeMode="contain"
            style={styles.title}
            source={require("../../../NewImage/Affiliate/goldTitle.png")}
          />
        );
      case 3:
        return (
          <Image
            resizeMode="contain"
            style={styles.title}
            source={require("../../../NewImage/Affiliate/platinumTitle.png")}
          />
        );
      default:
        break;
    }
  }, [currIndexCard])

  const EachItem = useCallback(({ title, value, icon, hideValue = false, policy }) => {

    const _handlePress = useCallback(() => {
      console.log({ policy });
      visiblePromotionPolicy.show({
        title: title.replace(/\n/g, ' '),
        data: policy
      })
    }, [policy])

    return (
      <Column onPress={_handlePress} alignItems="center" gap={4}>
        <Text style={{ textAlign: "center" }} size={12} color={WHITE}>
          {title}
        </Text>
        {icon}
        <Text opacity={hideValue ? 0 : 1} weight="bold" size={14} color={WHITE}>
          {value} %
        </Text>
      </Column>
    );
  }, []);

  return (
    <Column margin={8 * 2}>
      {/* <Text size={16} weight="bold" color={generateColor}>
        Phần thưởng quý khách
      </Text> */}
      {generateTitle}

      <Row justifyContent="center" gap={8 * 4} marginTop={8 * 2}>
        <EachItem
          policy={currLevelByIndex?.promotion?.discountRetailServicePolicy}
          title={`Giảm giá${`\n`}trực tiếp`}
          value={currLevelByIndex?.promotion?.discountRetailService}
          icon={generateIcon1}
        />
        <EachItem
          policy={currLevelByIndex?.promotion?.discountFriendPolicy}
          title={`Giảm giá${`\n`}cho người thân`}
          value={currLevelByIndex?.promotion?.discountFriend}
          icon={generateIcon2}
        />
        <EachItem
          policy={currLevelByIndex?.promotion?.commissionRatePolicy}
          title={`Phần trăm${`\n`}hoa hồng`}
          value={currLevelByIndex?.promotion?.commissionRate}
          icon={generateIcon3}
        />
        <EachItem
          policy={currLevelByIndex?.promotion?.birthDayPolicy}
          hideValue
          title={`Quà tặng${`\n`}sinh nhật`}
          value={currLevelByIndex?.promotion?.commissionRate}
          icon={generateIcon4}
        />
      </Row>
    </Column>
  );
};

export default InfoReward;

const styles = StyleSheet.create({
  title: {
    width: 8 * 24,
    height: 8 * 24 * 88 / 856,
  },
  btn: {
    width: 8 * 7,
    height: 8 * 7,
  },
});