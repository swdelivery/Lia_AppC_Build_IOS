import Column from "@Components/Column";
import Fade from "@Components/Fade";
import Row from "@Components/Row";
import Text from "@Components/Text";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

  const handleClose = useCallback(() => {
    onClose();
    storage.setBool("introShownFirstTime", true);
  }, [onClose]);

  return (
    <Fade visible={visible} duration={300} style={styles.container}>
      <Column style={styles.container} paddingTop={top} paddingBottom={bottom}>
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
            <Text color={"white"} top={10} bottom={30}>
              Đừng lo, ảnh của bạn sẽ không được lưu trữ đâu
            </Text>

            <FaceIcon />
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
            <Text size={20} weight="bold" color="white" top={10}>
              ĐỂ CÓ KẾT QUẢ TỐT NHẤT, HÃY:
            </Text>
            <Column gap={20}>
              <Row gap={20}>
                <MakeupIcon width={45} height={45} />
                <Text color={"white"}>Hạn chế trang điểm & đeo kính</Text>
              </Row>
              <Row gap={20}>
                <HairIcon width={45} height={45} />
                <Text color={"white"}>Không để tóc che mặt</Text>
              </Row>
              <Row gap={20}>
                <FaceDetectIcon width={45} height={45} />
                <Text color={"white"}>Cố định máy ảnh cận mặt</Text>
              </Row>
              <Row gap={20}>
                <LightIcon width={45} height={45} />
                <Text color={"white"}>Đảm bảo ánh sáng tốt</Text>
              </Row>
            </Column>
          </Column>
        </Column>
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
          <Text color={"white"} weight="bold" size={20}>
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
    console.log({ isShownFirstTime });

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
