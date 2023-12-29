import Column from '@Components/Column'
import Icon from "@Components/Icon"
import Image from '@Components/Image'
import CountStar2 from '@Components/NewCountStar/CountStar'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, MAIN_RED_600, RED } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import FlashSale from "@Screens/SoYoungService/components/FlashSale";
import { Service } from "@typings/serviceGroup";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";
import { FlashIcon } from "src/SGV";
import { formatTime } from "src/utils/date";

const WIDTH_IMAGE_SERVICE = (_width - 80) / 2 - 8 * 2;

type Props = {
  data: Service;
};

const ItemService = ({ data }: Props) => {
  const { avatar, name, averageRating, reviewCount, price, countPartner } =
    data;

  const { navigation } = useNavigate();

  const _handleGoDetailService = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_SERVICE, {
      service: data,
    });
  }, [data]);

  return (
    // <TouchableOpacity
    //   activeOpacity={0.8}
    //   style={styles.card}>
    //   <View style={styles.content}>
    //     <Image style={styles.image} avatar={avatar} />
    //     <Column style={styles.info}>
    //       <Column height={35}>
    //         <Text numberOfLines={2} size={12} weight="bold">
    //           {name}
    //         </Text>
    //       </Column>
    //       <CountStar2
    //         rating={averageRating}
    //         count={reviewCount}
    //         size={10}
    //       />
    //       <Row>
    //         <Text size={12} weight="bold" color={RED} style={styleElement.flex}>
    //           {`${formatMonney(price, true)}`}
    //         </Text>
    //         <Icon name="account-multiple" size={14} color={GREY} />
    //         <Text
    //           size={10}
    //           bottom={2}
    //           left={2}
    //         >{`(${countPartner})`}</Text>
    //       </Row>
    //     </Column>
    //   </View>
    // </TouchableOpacity>

    <TouchableOpacity onPress={_handleGoDetailService}>
      <Column margin={4} width={WIDTH_IMAGE_SERVICE}>
        <Column overflow="hidden">
          <Image
            style={{
              width: WIDTH_IMAGE_SERVICE,
              height: (WIDTH_IMAGE_SERVICE * 9) / 16,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            avatar={avatar}
          />
          {data.isOnFlashSale && (
            <FlashSale
              item={data}
              height={18}
              width={_width / 2 - 20}
              textSize={10}
            />
          )}
        </Column>
        <Column
          padding={4}
          borderColor={BORDER_COLOR}
          borderTopWidth={0}
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
          borderWidth={1}
        >
          <View style={styleElement.flex} />
          <Column height={35}>
            <Text size={12} numberOfLines={2}>
              {name}
            </Text>
          </Column>
          <Row gap={2}>
            <CountStar2 rating={averageRating} count={reviewCount} size={7} />
            {!data.isOnFlashSale && !!data.nextFlashSale && (
              <Row>
                <Column backgroundColor={MAIN_RED_600} marginRight={2}>
                  <FlashIcon width={8} height={8} />
                </Column>
                <Text size={5} color={MAIN_RED_600}>
                  Flash Sale bắt đầu lúc{" "}
                  {formatTime(data.nextFlashSale.timeRange.from)}
                </Text>
              </Row>
            )}
          </Row>
          <Row>
            {data.isOnFlashSale && data?.preferentialInCurrentFlashSale ? (
              <Row flex={1} alignItems="flex-end" gap={4}>
                <Text size={10} weight="bold" color={RED}>
                  {`${formatMonney(
                    data?.preferentialInCurrentFlashSale?.finalPrice
                  )}`}
                </Text>
                <Text size={6} textDecorationLine="line-through" bottom={1}>
                  {formatMonney(data.price)}
                </Text>
              </Row>
            ) : (
              <Text
                size={10}
                weight="bold"
                color={RED}
                style={styleElement.flex}
              >
                {`${formatMonney(data?.price)}`}
              </Text>
            )}
            <Icon name="account-multiple" size={10} color={GREY} />
            <Text size={8} bottom={2} left={2}>{`(${data.countPartner})`}</Text>
          </Row>
        </Column>
      </Column>
    </TouchableOpacity>
  );
};

export default ItemService

const styles = StyleSheet.create({
  card: {
    width: WIDTH_IMAGE_SERVICE,
    borderWidth: 1
    // marginBottom: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  content: {
    // height: IMAGE_HEIGHT + 80,
    // marginLeft: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    width: WIDTH_IMAGE_SERVICE,
    height: WIDTH_IMAGE_SERVICE * 9 / 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 8,
  },
})
