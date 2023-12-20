import Lottie from "lottie-react-native";
import React, { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { _widthScale } from "../../../../Constant/Scale";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { TouchableOpacity } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import FlashSaleTimer from "./components/FlashSaleTimer";
import useRecomendServices from "@Screens/NewDetailService/useRecomendServices";
import Row from "@Components/Row";
import FlashSaleItem from "./components/FlashSaleItem";
import { ScrollView } from "react-native-gesture-handler";
import useConfigFile from "src/Hooks/useConfigFile";
import { ConfigFileCode } from "@typings/configFile";
import Image from "@Components/Image";
import { head } from "lodash";

const FlashSale = memo(() => {
  const { navigate } = useNavigate();
  const flashSaleConfig = useConfigFile(ConfigFileCode.ImageFlashSaleHome);
  const services = useRecomendServices({ codeGroup: ["MAT"] });

  const data = useMemo(() => {
    return services.slice(0, 10);
  }, [services]);

  const _renderItem = (item: any) => {
    return <FlashSaleItem key={item._id} item={item} />;
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
          <Image avatar={head(flashSaleConfig?.fileArr)} style={styles.image} />
        </Column>
        <FlashSaleTimer />
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
    marginHorizontal: 12,
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
