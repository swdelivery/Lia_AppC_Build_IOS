import React, { useCallback } from "react";
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
import ContentLoader, { Rect } from "react-content-loader/native";
import { SERVICE_BANNER_RATIO } from "@Constant/image";

const IMAGE_WIDTH = _width / 2 - 8 - 8 / 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * SERVICE_BANNER_RATIO;

type Props = {
  item: Service;
};

export default function ServiceItem({ item }: Props) {
  const { navigation } = useNavigate();

  const _handleGoDetailService = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_SERVICE, {
      service: item,
    });
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={_handleGoDetailService}
      style={styles.card}
    >
      <View style={styles.content}>
        <Image style={styles.image} avatar={item.representationFileArr[0]} />
        <Column style={styles.info}>
          <Text numberOfLines={2} size={12} weight="bold">
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

export const PLACEHOLDER_HEIGHT = 200;

export function Placeholder() {
  return (
    <Row style={[styles.container, styles.placeholderRow]} gap={8}>
      <View style={styles.placeholderItem}>
        <ContentLoader>
          <Rect x="0" y="0" rx="4" ry="4" height="100" width="100%" />
          <Rect x="0" y="110" rx="3" ry="3" width="80%" height="12" />
          <Rect x="0" y="128" rx="3" ry="3" width="50%" height="12" />
          <Rect x="0" y="145" rx="3" ry="3" width="50%" height="12" />
        </ContentLoader>
      </View>
      <View style={styles.placeholderItem}>
        <ContentLoader>
          <Rect x="0" y="0" rx="4" ry="4" height="100" width="100%" />
          <Rect x="0" y="110" rx="3" ry="3" width="80%" height="12" />
          <Rect x="0" y="128" rx="3" ry="3" width="50%" height="12" />
          <Rect x="0" y="145" rx="3" ry="3" width="50%" height="12" />
        </ContentLoader>
      </View>
    </Row>
  );
}

const styles = StyleSheet.create({
  card: {
    width: _width / 2 - 4,
    marginBottom: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  content: {
    // height: IMAGE_HEIGHT + 62,
    marginLeft: 8,
    backgroundColor: "white",
    borderRadius: 8,
    ...styleElement.shadow,
    height: 'auto'
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 8,
  },
  placeholderRow: {
    height: PLACEHOLDER_HEIGHT,
    marginHorizontal: 16,
  },
  placeholderItem: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
