import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import { BORDER_COLOR } from '@Constant/Color'
import Image from '@Components/Image'
import { styleElement } from '@Constant/StyleElement'
import LinearGradient from 'react-native-linear-gradient'
import { IconPlayWhite } from '@Components/Icon/Icon'
import { _moderateScale } from '@Constant/Scale'
import Column from '@Components/Column'
import { sizeIcon } from '@Constant/Icon'


type Props = {
  data: any;
  onPress: (item) => void;
};

const ItemVideo = ({ data = null, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={.5}
      style={styles.container}>
      <Image
        style={styles.image}
        avatar={data?.avatar} />
      <LinearGradient
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "flex-end",
            zIndex: 1,
            borderRadius: _moderateScale(8),
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["transparent", "#000"]}
      >
        <View
          style={{
            position: "absolute",
            top: "45%",
            alignSelf: "center",
            opacity: 0.5,
          }}
        >
          <IconPlayWhite style={sizeIcon.md} />
        </View>

        <View style={{ margin: 8 }}>
          <Column gap={4}>
            <Text numberOfLines={1} weight="bold" color={"white"}>
              {data?.name}
            </Text>
            <Text numberOfLines={1} color={"white"}>
              {data?.description}
            </Text>
          </Column>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ItemVideo

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 8
  },
  container: {
    width: 8 * 18,
    height: 8 * 18 * 18 / 12,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    overflow: 'hidden'
  }
})
