import Icon from "@Components/Icon";
import Image from "@Components/Image";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import { Service } from "@typings/serviceGroup";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import useCallbackItem from "src/Hooks/useCallbackItem";

type Props = {
  item: Service;
  onPress: (item: Service) => void;
};

export default function ServiceItem({ item, onPress }: Props) {
  const trigger = useCallbackItem(item);

  return (
    <TouchableOpacity onPress={trigger(onPress)} style={styles.card}>
      <View style={styles.itemContent}>
        <View>
          <Image style={styles.image} avatar={item?.representationFileArr[0]} />
        </View>
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} size={12} weight="bold">
            {item?.name}
          </Text>
          <CountStar2 count={item?.reviewCount} rating={5} size={10} />
          <Row>
            <Text weight="bold" size={12} color={RED} style={styleElement.flex}>
              {formatMonney(item?.price, true)}
            </Text>

            <Row>
              <Icon name="account-multiple" size={14} color="grey" />
              <Text size={10} left={4}>
                ({item?.countPartner})
              </Text>
            </Row>
          </Row>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: _width / 2 - 8,
    height: 190,
    alignItems: "center",
  },
  itemContent: {
    width: _width / 2 - 16,
    height: "95%",
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
  itemInfo: {
    padding: 4,
  },
});
