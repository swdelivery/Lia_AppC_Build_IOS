import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import { BORDER_COLOR } from '@Constant/Color'


type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
};

const HorizontalLine = ({ style = {}, ...props }: Props) => {
  const containerStyle = useMemo(() => {
    return { ...props };
  }, [props]);

  return (
    <View style={[styles.line, style, containerStyle]}>

    </View>
  )
}

export default HorizontalLine

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: BORDER_COLOR
  }
})
