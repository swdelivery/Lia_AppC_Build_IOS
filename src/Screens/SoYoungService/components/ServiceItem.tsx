import React from "react";
import { View, StyleSheet } from "react-native";
import { _width } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import Image from "@Components/Image";
import Text from "@Components/Text";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { Service } from "@typings/serviceGroup";
import Column from "@Components/Column";
import { GREY, RED } from "@Constant/Color";
import Row from "@Components/Row";
import { styleElement } from "@Constant/StyleElement";
import Icon from "@Components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  item: Service;
};

export default function ServiceItem({ item }: Props) {
  const { navigate } = useNavigate();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={navigate(ScreenKey.DETAIL_SERVICE, { idService: item._id })}
      style={styles.card}
    >
      <View style={styles.content}>
        <Image style={styles.image} avatar={item.representationFileArr[0]} />
        <Column style={styles.info}>
          <Text size={12} weight="bold">
            {item?.name}
          </Text>
          <CountStar2
            rating={item.averageRating}
            count={item.reviewCount}
            size={10}
          />
          <Row>
            <Text size={12} weight="bold" color={RED} style={styleElement.flex}>
              {`${formatMonney(item?.price, true)}`}
            </Text>
            <Icon name="account-multiple" size={14} color={GREY} />
            <Text
              size={10}
              bottom={2}
              left={2}
            >{`(${item.countPartner})`}</Text>
          </Row>
        </Column>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  content: {
    width: "90%",
    height: 180,
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 4,
  },
});
