import Column from "@Components/Column";
import Fade from "@Components/Fade";
import Row from "@Components/Row";
import Spacer from "@Components/Spacer";
import Text from "@Components/Text";
import { WHITE } from "@Constant/Color";
import { ConfigDataCode } from "@typings/configData";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useConfigData from "src/Hooks/useConfigData";
import useVisible from "src/Hooks/useVisible";
import {
  FaceDetectIcon,
  FaceIcon,
  HairIcon,
  LightIcon,
  MakeupIcon,
} from "src/SGV";
import storage from "src/utils/storage";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function Intro({ visible, onClose }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const dataDescription = useConfigData(ConfigDataCode.PolicyFaceAI)

  const handleClose = useCallback(() => {
    onClose();
    storage.setBool("introShownFirstTime", true);
  }, [onClose]);

  return (
    <Fade visible={visible} duration={300} style={styles.container}>
      <Column style={styles.container} paddingTop={top} paddingBottom={bottom}>
        <ScrollView>
          <Column justifyContent="center" flex={1}>
            <Column
              padding={20}
              alignItems="center"
              justifyContent="center"
              marginTop={10}
            >
              <Text size={20} weight="bold" color="white">
                CHỤP CHÍNH DIỆN MẶT
              </Text>
              <Text color={"white"} top={10} bottom={8}>
                Đừng lo, ảnh của bạn sẽ không được lưu trữ đâu
              </Text>
              {
                dataDescription?.value ?

                  <Text size={12} color={WHITE}>
                    {dataDescription?.value}
                  </Text>
                  : <></>
              }
              <Spacer top={8 * 2} />

              <FaceIcon width={8 * 8} height={8 * 8} />
              <Text top={20} color={"white"}>
                Nhìn thẳng
              </Text>
              <Text color={"white"}>Giữ 2 mắt nhìn màn hình</Text>
            </Column>
            <Column
              marginHorizontal={40}
              marginTop={10}
              height={2}
              backgroundColor={"white"}
            />
            <Column alignItems="center" padding={20} gap={20}>
              <Text size={18} weight="bold" color="white" top={10}>
                ĐỂ CÓ KẾT QUẢ TỐT NHẤT, HÃY:
              </Text>
              <Column gap={20}>
                <Row gap={20}>
                  <MakeupIcon width={40} height={40} />
                  <Text color={"white"}>Hạn chế trang điểm & đeo kính</Text>
                </Row>
                <Row gap={20}>
                  <HairIcon width={40} height={40} />
                  <Text color={"white"}>Không để tóc che mặt</Text>
                </Row>
                <Row gap={20}>
                  <FaceDetectIcon width={40} height={40} />
                  <Text color={"white"}>Cố định máy ảnh cận mặt</Text>
                </Row>
                <Row gap={20}>
                  <LightIcon width={40} height={40} />
                  <Text color={"white"}>Đảm bảo ánh sáng tốt</Text>
                </Row>
              </Column>
            </Column>
          </Column>

        </ScrollView>
        <Spacer top={8} />
        <Column
          borderRadius={20}
          borderWidth={2}
          borderColor={"white"}
          alignSelf="center"
          paddingHorizontal={20}
          paddingVertical={5}
          marginBottom={16}
          onPress={handleClose}
        >
          <Text color={"white"} weight="bold" size={18}>
            TÔI ĐÃ HIỂU
          </Text>
        </Column>
      </Column>
    </Fade>
  );
}

export function useIntro() {
  const introPopup = useVisible();

  useEffect(() => {
    const isShownFirstTime = storage.getBool("introShownFirstTime", false);
    if (!isShownFirstTime) {
      introPopup.show(true);
    }
  }, []);

  return introPopup;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#031C2C",
    zIndex: 100,
  },
});
