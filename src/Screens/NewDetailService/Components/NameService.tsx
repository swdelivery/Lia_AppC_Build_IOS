import { StyleSheet } from "react-native";
import React from "react";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import {
  INFO_COLOR,
  MAIN_RED,
  MAIN_RED_500,
  MAIN_RED_600,
} from "@Constant/Color";
import Column from "@Components/Column";
import { formatMonney } from "@Constant/Utils";
import Row from "@Components/Row";
import Icon from "@Components/Icon";
import { Service } from "@typings/serviceGroup";
import FlashSaleEnds from "@Screens/FlashSale/Component/FlashSaleEnds";
import { FlashIcon } from "src/SGV";

type Props = {
  service: Service;
};

const NameService = ({ service }: Props) => {
  const isFlashSaleStarted = Math.random() < 0.5;
  const isFlashSaleIncoming = !isFlashSaleStarted;

  return (
    <Column style={styles.infoService} gap={8}>
      {isFlashSaleStarted ? (
        <Row
          backgroundColor={MAIN_RED_600}
          padding={8}
          justifyContent="space-between"
          overflow="hidden"
        >
          <FlashIcon style={styles.flashIcon} width={100} />
          <Column>
            <Text weight="bold" color={"white"}>
              Flash Sale
            </Text>
            <Row alignItems="flex-end" gap={4}>
              <Text weight="bold" color={INFO_COLOR} size={17}>
                {formatMonney(service.price * 0.8)}
              </Text>
              <Text
                size={12}
                color={"white"}
                bottom={1}
                textDecorationLine="line-through"
              >
                {formatMonney(service.price)}
              </Text>
            </Row>
          </Column>
          <FlashSaleEnds
            flashSale={{
              isUpcoming: false,
              dateRange: {
                from: "2023-12-22T00:00:00.000Z",
                to: "2023-12-22T00:00:00.000Z",
              },
              timeRange: {
                from: {
                  hour: 9,
                  minute: 50,
                },
                to: {
                  hour: 23,
                  minute: 55,
                },
              },
            }}
          />
        </Row>
      ) : (
        <Column gap={8}>
          {isFlashSaleIncoming && (
            <Row paddingTop={8} paddingHorizontal={8} gap={4}>
              <Column backgroundColor={MAIN_RED_600} marginRight={4}>
                <FlashIcon width={22} height={22} />
              </Column>
              <Text weight="bold" color={MAIN_RED_500}>
                Flash Sale
              </Text>
              <Text color={MAIN_RED_500}>bắt đầu lúc 00:00, 20 tháng 12</Text>
            </Row>
          )}
          <Text size={18} weight="bold" color={MAIN_RED} left={8}>
            {formatMonney(service?.price, true)}
          </Text>
        </Column>
      )}

      <Text size={16} weight="bold" left={8} right={8}>
        {service?.name}
      </Text>

      <Row top={2} gap={8} paddingHorizontal={8}>
        <CountStar2 count={service?.reviewCount} rating={5} />
        <Text size={10}>|</Text>
        <Row gap={4} top={2}>
          <Icon name="account-multiple" size={16} color="grey" />
          <Text size={10}>({service?.countPartner})</Text>
        </Row>
      </Row>
    </Column>
  );
};

export default NameService;

const styles = StyleSheet.create({
  infoService: {
    paddingBottom: _moderateScale(8),
    // paddingHorizontal: _moderateScale(8 * 1.5),
    overflow: "hidden",
    width: _widthScale(360),
    // height: _moderateScale(8 * 20),
    alignSelf: "center",
    marginTop: _moderateScale(8),
    backgroundColor: "white",
    borderRadius: _moderateScale(8 * 2),
  },
  referenceSite: {
    paddingHorizontal: _moderateScale(8 * 1),
    paddingVertical: _moderateScale(4),
    borderRadius: _moderateScale(8),
    backgroundColor: "#FAF0EF",
    alignSelf: "flex-start",
  },
  flashIcon: {
    position: "absolute",
    fontSize: 100,
    right: 0,
    opacity: 0.6,
  },
});
