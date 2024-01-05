import Row from '@Components/Row'
import Text from '@Components/Text'
import { styleElement } from '@Constant/StyleElement'
import { openActionSheetIcon, selectItemActionSheetIcon } from '@Redux/modal/actions'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { IconBooking, IconCancelGrey, IconMirrorr } from '../../Components/Icon/Icon'
import { BASE_COLOR, BORDER_COLOR, WHITE } from "../../Constant/Color";
import { sizeIcon } from "../../Constant/Icon";
import { _height, _moderateScale, _width } from "../../Constant/Scale";
import { getStateActionSheetIcon } from "@Redux/modal/selectors";

const ActionSheetIcon = memo(() => {
  const {
    showActionSheetIcon: { flag: visible, data: options },
  } = useSelector(getStateActionSheetIcon);

  const dispatch = useDispatch();
  const [heightModal, setHeightModal] = useState(0);
  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);

  useEffect(() => {
    if (visible && heightModal) {
      tranYModal.value = withTiming(-heightModal, { duration: 200 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
    } else {
    }
  }, [visible, heightModal]);

  const animTranY = useAnimatedStyle(() => {
    return { transform: [{ translateY: tranYModal.value }] };
  });

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value };
  });

  const _handleHideModal = () => {
    tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
      if (fnd) {
        runOnJS(_hideModal)();
      }
    });
    opacityBackDrop.value = withTiming(0, { duration: 200 });
  };

  const _handleChoice = useCallback(
    (data) => () => {
      dispatch(selectItemActionSheetIcon(data));
      _handleHideModal();
    },
    []
  );

  const _hideModal = () => {
    dispatch(
      openActionSheetIcon({
        flag: false,
        data: [],
      })
    );
  };

  const Option = ({ data, lasted, onPress }) => {
    const _renderIcon = (type) => {
      switch (type) {
        case "booking":
          return (
            <IconBooking width={8 * 3} height={8 * 3} color={BASE_COLOR} />
          );
        case "faceAI":
          return (
            <IconMirrorr width={8 * 3} height={8 * 3} color={BASE_COLOR} />
          );
        default:
          break;
      }
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.option, lasted && { borderBottomWidth: 0 }]}
      >
        <Row gap={8}>
          {_renderIcon(data?.type)}
          <Text weight="bold">{data?.name}</Text>
        </Row>
      </TouchableOpacity>
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            width: _width,
            height: '100%',
          },
          {
            backgroundColor: "rgba(0,0,0,.7)",
          },
          animOpacityBackDrop,
        ]}
      >
        <TouchableOpacity
          onPress={() => _handleHideModal()}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>

      <Animated.View
        style={[styles.mainModal, { bottom: -heightModal }, animTranY]}
      >
        <View
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setHeightModal(height)}
        >
          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={_handleHideModal}
            style={styles.cancelBtn}
          >
            <IconCancelGrey style={sizeIcon.sm} />
          </TouchableOpacity>

          {options?.length > 0 &&
            options?.map((item, index) => {
              return (
                <Option
                  onPress={_handleChoice(item)}
                  data={item}
                  key={index}
                  lasted={index + 1 == options.length ? true : false}
                />
              );
            })}
        </View>
      </Animated.View>
    </View>
  );
});


export default ActionSheetIcon

const styles = StyleSheet.create({
  cancelBtn: {
    position: 'absolute',
    right: _moderateScale(8 * 3),
    zIndex: 100,
    top: _moderateScale(8 * 2)
  },
  option: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    paddingHorizontal: _moderateScale(8 * 3)
  },
  mainModal: {
    width: _width,
    backgroundColor: WHITE,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: _moderateScale(8 * 2),
    position: 'absolute',
  },
  container: {
    width: _width,
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    bottom: 0
  }
})


const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.35,
  shadowRadius: 2,

  elevation: 5
}
