import { FlatList, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import Text from '@Components/Text'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const DemoModal = () => {

  const [listValue, setListValue] = useState([...Array.from(new Array(40), (x, i) => i + 40)])

  const [value, setValue] = useState(null);
  const scrollY = useSharedValue(0);


  const handleMomentumScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.floor(offsetY / 100); // Giả sử chiều cao mỗi phần tử là 50
    // console.log('Cuộn xong, index:', index);
    setValue(listValue[index + 1])
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
    },
  });

  return (
    <View style={{ width: _width, height: 500, borderWidth: 1, backgroundColor: WHITE, position: 'absolute', bottom: 0 }}>
      <View style={{
        height: 300,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 50
      }}>

        <Animated.FlatList
          onMomentumScrollEnd={handleMomentumScrollEnd}
          snapToInterval={100}
          pagingEnabled
          data={listValue}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => <NewItem item={item} index={index} scrollY={scrollY} />}
          onScroll={scrollHandler}
        />
      </View>
      <Text>Giá trị Center: {value}</Text>
    </View>
  )
}

export default DemoModal

const NewItem = ({ item, index, scrollY }) => {

  const animatedStyle = useAnimatedStyle(() => {

    const scale = interpolate(scrollY.value + 100, [(index - 1) * 100, (index) * 100, (index + 1) * 100], [1, 2, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    });
    const opacity = interpolate(scrollY.value + 100, [(index - 1) * 100, (index) * 100, (index + 1) * 100], [.5, 1, .5], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    });
    return {
      opacity: opacity,
      transform: [
        { scale: scale },
      ],
    };
  });

  return (
    <Animated.View style={[{
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center'
    }, animatedStyle]}>
      <Text size={18} weight='bold'>
        {item}
      </Text>
    </Animated.View>
  )
}


const styles = StyleSheet.create({})
