import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  count?: number;
  itemHeight?: number;
  children: React.ReactNode;
};

export default function PlaceholderSkeletons({
  count = 2,
  itemHeight = 100,
  children,
}: Props) {
  const containerStyle = useMemo(
    () => ({
      height: itemHeight * count,
    }),
    [itemHeight, count],
  );

  return (
    <View style={[styles.placeholder, containerStyle]} pointerEvents="none">
      {[...Array(count).keys()].map(item => (
        <View key={item}>{children}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {},
});
