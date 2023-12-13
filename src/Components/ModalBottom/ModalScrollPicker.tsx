import Button from "@Components/Button/Button";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BLACK,
  BORDER_COLOR,
  WHITE
} from "@Constant/Color";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
} from "@Constant/Scale";
import React, { memo, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEIGHT_MODAL = _heightScale(300);
const WIDTH_ITEM = 50

type Props = {
  title?: string;
  unit?: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: (item) => void;
  dataInteger: any;
  dataDecimal: any;
};

const ModalScrollPicker = memo(({ visible, onClose, onConfirm, title, unit, dataInteger, dataDecimal }: Props) => {
  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);

  const { bottom } = useSafeAreaInsets()

  const RefFlatlistInteger = useRef(null)
  const RefFlatlistDecimal = useRef(null)

  const [listValueInteger, setListValueInteger] = useState(dataInteger)
  const [listValueDecimal, setListValueDecimal] = useState(dataDecimal)

  const [valueInteger, setValueInteger] = useState(null);
  const [valueDecimal, setValueDecimal] = useState(null);

  const scrollYInteger = useSharedValue(0);
  const scrollYDecimal = useSharedValue(0);

  useEffect(() => {
    if (visible && listValueInteger?.length > 0) {
      tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 200 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
    } else {
    }
  }, [visible, listValueInteger]);

  useEffect(() => { }, []);

  const animTranY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tranYModal.value,
        },
      ],
    };
  });

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return {
      opacity: opacityBackDrop.value,
    };
  });

  const _handleConfirm = () => {
    onConfirm({
      valueInteger: valueInteger ? valueInteger : listValueInteger[1],
      valueDecimal: valueDecimal ? valueDecimal : listValueDecimal[1]
    })
    _handleHideModal()
  }

  const _handleHideModal = () => {

    scrollYInteger.value = 0
    scrollYDecimal.value = 0
    setValueInteger(null)
    setValueDecimal(null)

    tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
      if (fnd) {
        runOnJS(onClose)();
      }
    });
    opacityBackDrop.value = withTiming(0, { duration: 200 });
  };

  // FUNCTION FOR INTEGER
  const handleMomentumScrollEndInteger = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.ceil(offsetY / WIDTH_ITEM);
    setValueInteger(listValueInteger[index + 1])
  };
  const scrollHandlerInteger = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollYInteger.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
    },
  });

  // FUNCTION FOR DECIMAL
  const handleMomentumScrollEndDecimal = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.ceil(offsetY / WIDTH_ITEM);
    setValueDecimal(listValueDecimal[index + 1])
  };
  const scrollHandlerDecimal = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollYDecimal.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
    },
  });

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            width: _width,
            height: _height,
          },
          { backgroundColor: "rgba(0,0,0,.7)" },
          animOpacityBackDrop,
        ]}
      >
        <TouchableOpacity
          onPress={_handleHideModal}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>

      <Animated.View style={[styles.mainView, animTranY, { paddingBottom: bottom }]}>
        <View style={styles.header}>
          <View style={styles.header__child}>
            <Text weight="bold" size={16}>{title}</Text>
          </View>
        </View>

        <Row marginTop={8 * 2} gap={8 * 2} alignSelf="center">
          <View style={{
            height: WIDTH_ITEM * 3,
            alignSelf: 'center',
          }}>

            <Animated.FlatList
              ref={RefFlatlistInteger}
              showsVerticalScrollIndicator={false}
              style={{ width: 100 }}
              contentContainerStyle={{ alignItems: 'center' }}
              onMomentumScrollEnd={handleMomentumScrollEndInteger}
              snapToInterval={WIDTH_ITEM}
              pagingEnabled
              data={listValueInteger}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => <Item item={item} index={index} scrollY={scrollYInteger} />}
              onScroll={scrollHandlerInteger}
            />
          </View>

          <View style={styles.dot} />

          <View style={{
            height: WIDTH_ITEM * 3,
            alignSelf: 'center',
          }}>

            <Animated.FlatList
              ref={RefFlatlistDecimal}
              showsVerticalScrollIndicator={false}
              style={{ width: 100 }}
              contentContainerStyle={{ alignItems: 'center' }}
              onMomentumScrollEnd={handleMomentumScrollEndDecimal}
              snapToInterval={WIDTH_ITEM}
              pagingEnabled
              data={listValueDecimal}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => <Item item={item} index={index} scrollY={scrollYDecimal} />}
              onScroll={scrollHandlerDecimal}
            />
          </View>

          {
            unit ?
              <View style={styles.containerUnit}>
                <Text weight="bold" size={40}>
                  {unit}
                </Text>
              </View>
              : <></>
          }


        </Row>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Row
            gap={8 * 2}
            paddingHorizontal={8 * 3}>
            <Button.Gradient
              containerStyle={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#01AB84", "#186A57"]}
              title={`Xác nhận`}
              onPress={_handleConfirm}
              height={40}
            />
            <View style={{ width: 100 }}>
              <Button.Custom
                bgColor={'#F2F2F5'}
                colorText={{ color: WHITE }}
                title={`Huỷ`}
                onPress={_handleHideModal}
                height={40}
              />
            </View>
          </Row>
        </View>

      </Animated.View>
    </View>
  );
});

export default ModalScrollPicker;

const Item = ({ item, index, scrollY }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value + WIDTH_ITEM, [(index - 1) * WIDTH_ITEM, (index) * WIDTH_ITEM, (index + 1) * WIDTH_ITEM], [1, 2, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    });
    const opacity = interpolate(scrollY.value + WIDTH_ITEM, [(index - 1) * WIDTH_ITEM, (index) * WIDTH_ITEM, (index + 1) * WIDTH_ITEM], [.3, 1, .3], {
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
      width: WIDTH_ITEM,
      height: WIDTH_ITEM,
      justifyContent: 'center',
      alignItems: 'center'
    }, animatedStyle]}>
      <Text size={20} weight='bold'>
        {item}
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  containerUnit: {
    // top: 8 * 2
    width: 100,
    alignItems: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: BLACK,
    top: 8
  },
  btnAction: {
    marginHorizontal: _moderateScale(8 * 2),
    height: _moderateScale(8 * 5),
    justifyContent: "center",
    alignItems: "center",
  },
  bottomAction: {
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    marginHorizontal: _moderateScale(8 * 2),
  },
  cancelBtn: {
    position: "absolute",
    right: _moderateScale(8 * 3),
    zIndex: 100,
    top: _moderateScale(8 * 2),
  },
  header__child: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: _width,
    height: _moderateScale(8 * 6),
    paddingHorizontal: 8 * 3
  },
  mainView: {
    width: _width,
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8 * 2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: _moderateScale(8 * 2),
    position: "absolute",
    bottom: -HEIGHT_MODAL,
    height: HEIGHT_MODAL,
  },
  header: {
    // marginTop: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
    alignItems: "center",
  },
  container: {
    width: _width,
    height: _height,
    position: "absolute",
    zIndex: 100,
    bottom: 0,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.35,
  shadowRadius: 2,

  elevation: 5,
};
