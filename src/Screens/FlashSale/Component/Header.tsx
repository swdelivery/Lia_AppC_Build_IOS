import Icon from "@Components/Icon";
import { BackIcon } from "@Components/Icon/Icon";
import IconButton from "@Components/IconButton";
import Image from "@Components/Image";
import Row from "@Components/Row";
import { StatusBar } from "@Components/StatusBar";
import { MAIN_RED_500 } from "@Constant/Color";
import { getConfigData } from "@Redux/Action/OrtherAction";
import ModalThele from "@Screens/WheelSpin/ModalThele";
import { ConfigFileCode } from "@typings/configFile";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useConfigFile from "src/Hooks/useConfigFile";
import { useNavigate } from "src/Hooks/useNavigation";
import useVisible from "src/Hooks/useVisible";

type Props = {};

export default function Header({}: Props) {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();
  const infoModal = useVisible();
  const flashSaleRule = useConfigFile(ConfigFileCode.FlashSaleRule);
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
      {flashSaleTitle && !isEmpty(flashSaleTitle.fileArr) && (
        <Image avatar={flashSaleTitle.fileArr[0]} />
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
  //
});
