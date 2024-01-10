import Icon from "@Components/Icon";
import { BackIcon } from "@Components/Icon/Icon";
import IconButton from "@Components/IconButton";
import Image from "@Components/Image";
import Row from "@Components/Row";
import { StatusBar } from "@Components/StatusBar";
import { MAIN_RED_500 } from "@Constant/Color";
import ModalThele from "@Screens/WheelSpin/ModalThele";
import { ConfigDataCode } from "@typings/configData";
import { ConfigFileCode } from "@typings/configFile";
import { isEmpty } from "lodash";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useConfigData from "src/Hooks/useConfigData";
import useConfigFile from "src/Hooks/useConfigFile";
import { useNavigate } from "src/Hooks/useNavigation";
import useVisible from "src/Hooks/useVisible";

type Props = {};

export default function Header({}: Props) {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();
  const infoModal = useVisible();
  const flashSaleRule = useConfigData(ConfigDataCode.FlashSaleRule);
  const flashSaleTitle = useConfigFile(ConfigFileCode.FlashSaleTitle);

  return (
    <Row
      backgroundColor={MAIN_RED_500}
      paddingTop={top + 8}
      paddingBottom={8}
      justifyContent="space-between"
      paddingHorizontal={16}
    >
      <StatusBar />
      <IconButton onPress={navigation.goBack}>
        <BackIcon />
      </IconButton>
      {flashSaleTitle?.isActive && !isEmpty(flashSaleTitle.fileArr) && (
        <Image
          auto
          avatar={flashSaleTitle.fileArr[0]}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <IconButton onPress={infoModal.show}>
        <Icon name="information-outline" color="white" />
      </IconButton>

      <ModalThele
        hide={infoModal.hide}
        data={flashSaleRule}
        show={infoModal.visible}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 20,
  },
});
