import { IconBackWhite, IconHelpWhite } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { WHITE } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  onOpenRule: () => void;
};

export default function Header({ onOpenRule }: Props) {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();

  return (
    <Row
      marginTop={top}
      style={styles.container}
      justifyContent="space-between"
    >
      <TouchableOpacity
        hitSlop={styleElement.hitslopSm}
        style={styles.backContainer}
        onPress={navigation.goBack}
      >
        <IconBackWhite />
        <Text weight="bold" size={16} color={WHITE}>
          Quay lại
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenRule}>
        <IconHelpWhite
          width={_moderateScale(8 * 3)}
          height={_moderateScale(8 * 3)}
        />
      </TouchableOpacity>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: 16,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
  },
});
