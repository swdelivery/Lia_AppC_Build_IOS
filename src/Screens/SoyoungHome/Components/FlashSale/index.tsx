import React, { useCallback, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { _moderateScale, _widthScale } from "../../../../Constant/Scale";
import Column from "@Components/Column";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import FlashSaleTimer from "./components/FlashSaleTimer";
import Row from "@Components/Row";
import FlashSaleItem from "./components/FlashSaleItem";
import Image from "@Components/Image";
import { head } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  checkFlashSale,
  getCurrentFlashSaleServices,
} from "@Redux/flashSale/actions";
import {
  getCurrentFlashSaleServicesState,
  getFlashSaleState,
} from "@Redux/flashSale/selectors";
import { FlashSale } from "@typings/flashsale";
import Text from "@Components/Text";
import { BASE_COLOR, MAIN_RED_500 } from "@Constant/Color";
import useFlashSales from "../useFlashSale";
import { IconRightArrowBase } from "@Components/Icon/Icon";

const FlashSaleBanner = ({ flashSale }: { flashSale: FlashSale }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate();
  const { image } = useSelector(getFlashSaleState);
  const { data: services } = useSelector(getCurrentFlashSaleServicesState);

  const data = useMemo(() => {
    return services.slice(0, 10);
  }, [services]);

  const refreshFlashSale = useCallback(() => {
    dispatch(checkFlashSale.request());
  }, []);

  useEffect(() => {
    dispatch(getCurrentFlashSaleServices.request(flashSale._id));
  }, [flashSale]);

  const _renderItem = (item: any) => {
    return (
      <FlashSaleItem
        key={item._id}
        item={item}
        isUpcoming={flashSale.isUpcoming}
      />
    );
  };

  return (
    <Row style={styles.container} gap={8}>
      <Column
        gap={4}
        paddingVertical={8}
        alignItems="center"
        onPress={navigate(ScreenKey.FLASHSALE_SCREEN)}
      >
        <Column flex={1} justifyContent="center" alignItems="center">
          {image && image.isActive && (
            <Image
              avatar={head(image.fileArr)}
              style={styles.image}
              resizeMode="contain"
              placeholderColors={["white", "white"]}
            />
          )}
        </Column>
        {flashSale.isUpcoming && (
          <Text size={8} color={MAIN_RED_500}>
            Sắp diễn ra
          </Text>
        )}
        <FlashSaleTimer
          flashSale={flashSale}
          onFlashSaleUpdate={refreshFlashSale}
        />
      </Column>
      <Row flex={1}>
        <ScrollView
          horizontal
          bounces={false}
          contentContainerStyle={styles.services}
          showsHorizontalScrollIndicator={false}
        >
          {data.map(_renderItem)}
          <TouchableOpacity
            onPress={navigate(ScreenKey.FLASHSALE_SCREEN)}
            style={styles.btnSeeAll}
          >
            <Column alignItems="center" gap={8}>
              <IconRightArrowBase color={BASE_COLOR} />
              <Text color={BASE_COLOR} size={12}>
                Xem tất cả
              </Text>
            </Column>
          </TouchableOpacity>
        </ScrollView>
      </Row>
    </Row>
  );
};

function FlashSaleWrapper() {
  const flashSales = useFlashSales();

  if (!flashSales[0]) {
    return null;
  }

  return <FlashSaleBanner flashSale={flashSales[0]} />;
}

export default FlashSaleWrapper;

const styles = StyleSheet.create({
  btnFls: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8 * 1,
    backgroundColor: "#EB4D49",
  },
  fls__title: {
    width: 100,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginHorizontal: _moderateScale(16),
    paddingHorizontal: 8,
    height: 120,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
  },
  lottie: { width: 50, height: 50 },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  clockHours: {
    backgroundColor: "black",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemContainer: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  services: {
    gap: 8,
    flexGrow: 1,
  },
  btnSeeAll: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8 * 2,
  },
});
