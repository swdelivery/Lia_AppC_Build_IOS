import BottomSheet from "@Components/BottomSheet";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { BORDER_INPUT_TEXT } from "@Constant/Color";
import { ConfigDataCode } from "@typings/configData";
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import useConfigData from "src/Hooks/useConfigData";

type Props = {
  visible?: boolean;
  onClose: () => void;
  onCollaborationType: (type: string) => void;
};

export default function CollaborationTypePicker({
  visible,
  onClose,
  onCollaborationType,
}: Props) {
  const collabData = useConfigData(ConfigDataCode.CollaborationForm);
  const selectType = useCallback(
    (type: string) => () => {
      onCollaborationType(type);
    },
    [onCollaborationType]
  );

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      hideNavigator
      contentContainerStyle={styles.bottomSheet}
    >
      <Column backgroundColor={"white"} marginHorizontal={16} borderRadius={12}>
        {(collabData?.value || []).map((item, index) => {
          const value = typeof item === "string" ? item : item.item;
          return (
            <BottomSheet.Button key={value} onPress={selectType(value)}>
              <Column
                height={57}
                alignItems="center"
                justifyContent="center"
                borderTopWidth={index === 0 ? 0 : 1}
                borderTopColor={BORDER_INPUT_TEXT}
              >
                <Text size={18}>{value}</Text>
              </Column>
            </BottomSheet.Button>
          );
        })}
      </Column>

      <Column
        alignSelf="center"
        borderWidth={1}
        borderColor={"white"}
        borderRadius={8}
        paddingHorizontal={8}
        paddingVertical={4}
        marginVertical={16}
        onPress={onClose}
      >
        <Text color={"white"} size={18}>
          Quay lại
        </Text>
      </Column>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "transparent",
  },
});
