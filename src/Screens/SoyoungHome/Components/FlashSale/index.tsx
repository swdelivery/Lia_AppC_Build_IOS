import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { _moderateScale, _widthScale } from "../../../../Constant/Scale";
import Column from "@Components/Column";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import FlashSaleTimer from "./components/FlashSaleTimer";
import Row from "@Components/Row";
import FlashSaleItem from "./components/FlashSaleItem";
import { ScrollView } from "react-native-gesture-handler";
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
import { MAIN_RED_500 } from "@Constant/Color";
import useFlashSales from "../useFlashSale";
import useConfigFile from "src/Hooks/useConfigFile";
import { ConfigFileCode } from "@typings/configFile";

const FlashSaleBanner = ({ flashSale }: { flashSale: FlashSale }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate();
  const { data: services } = useSelector(getCurrentFlashSaleServicesState);
  const flashSaleImage = useConfigFile(ConfigFileCode.ImageFlashSaleHome);

  useEffect(() => {
    dispatch(getCurrentFlashSaleServices.request(flashSale._id));
  }, [flashSale._id]);

  const data = useMemo(() => {
    return services.slice(0, 10);
  }, [services]);

  const refreshFlashSale = useCallback(() => {
    dispatch(checkFlashSale.request());
  }, []);

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
          {flashSaleImage && (
            <Image
              avatar={head(flashSaleImage.fileArr)}
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
          contentContainerStyle={styles.services}
          showsHorizontalScrollIndicator={false}
        >
          {data.map(_renderItem)}
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
  },
});
