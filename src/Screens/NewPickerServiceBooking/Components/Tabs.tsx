import Text from "@Components/Text";
import { BASE_COLOR } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { getServiceGroupState } from "@Redux/home/selectors";
import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSelector } from "react-redux";

type Props = {
  tabs: { title: string; key: string }[];
  index: number;
  onTabChange: (index: number) => void;
};

export default function Tabs({ tabs, index, onTabChange }: Props) {
  const { data: listServiceGroup } = useSelector(getServiceGroupState);

  const handleTabPress = useCallback(
    (idx: number) => () => {
      onTabChange(idx);
    },
    [onTabChange]
  );

  const _generateNameServiceGR = useCallback((value) => {
    if (value == 'Tất cả') return 'Tất cả'
    return listServiceGroup?.find(item => item?.code == value)?.name
  }, [listServiceGroup])

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        {tabs.map((item, idx) => {
          const isSelected = idx === index;
          return (
            <Pressable
              key={item.key}
              style={[styles.tab, isSelected && styles.tabActive]}
              onPress={handleTabPress(idx)}
            >
              <Text color={isSelected ? "white" : BASE_COLOR}>
                {_generateNameServiceGR(item.title)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  tabActive: {
    paddingHorizontal: _moderateScale(8 * 2.5),
    height: _moderateScale(8 * 3.5),
    borderRadius: 4,
    backgroundColor: BASE_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: _moderateScale(8 * 2.5),
    height: _moderateScale(8 * 3.5),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BASE_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});
