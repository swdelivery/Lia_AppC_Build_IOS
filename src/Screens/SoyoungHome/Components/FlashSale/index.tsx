import Lottie from "lottie-react-native";
import React, { memo, useMemo } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { _widthScale } from "../../../../Constant/Scale";
import FastImage from "@Components/FastImage";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { TouchableOpacity } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import FlashSaleTimer from "./components/FlashSaleTimer";
import useRecomendServices from "@Screens/NewDetailService/useRecomendServices";
import Row from "@Components/Row";
import FlashSaleItem from "./components/FlashSaleItem";

const FlashSale = memo(() => {
  const { navigate } = useNavigate();
  const services = useRecomendServices({ codeGroup: ["MAT"] });

  const data = useMemo(() => {
    return services.slice(0, 3);
  }, [services]);

  const _renderItem = (item: any) => {
    return <FlashSaleItem key={item._id} item={item} />;
  };

  return (
    <Row style={styles.container} gap={8}>
      <TouchableOpacity onPress={navigate(ScreenKey.FLASHSALE_SCREEN)}>
        <Column gap={4} alignItems="center">
          <Lottie
            speed={1}
            autoPlay={true}
            loop={true}
            style={styles.lottie}
            source={require("../../../../Json/flashsale.json")}
          />
          <Text size={12} color="red" weight="bold">
            Flash Sale
          </Text>
          <FlashSaleTimer />
        </Column>
      </TouchableOpacity>
      <Row gap={8} flex={1}>
        {data.map(_renderItem)}
      </Row>
    </Row>
  );
});

export default FlashSale;

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
    // width: _widthScale(350),
    marginHorizontal: 12,
    paddingHorizontal: 8,
    height: _widthScale(110),
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
});
