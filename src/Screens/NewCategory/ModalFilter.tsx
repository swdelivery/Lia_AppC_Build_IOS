import Column from '@Components/Column'
import { IconCancelGrey } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY, GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@Components/Button/Button'
import useVisible from 'src/Hooks/useVisible'
import ModalBottomLocation from './ModalBottomLocation'
import FilterLocation from './ModalFilterComponents/FilterLocation'
import SliderPrice from './ModalFilterComponents/SliderPrice'
import WrapList from './ModalFilterComponents/WrapList'

const WIDTH_MODAL = _width / 1.15


type Props = {
  visible: boolean;
  onClose?: () => void;
};

const ModalFilter = ({ visible, onClose }: Props) => {

  const { top } = useSafeAreaInsets()
  const tranX = useSharedValue(0);
  const opacityBackDrop = useSharedValue(0);

  const visibleModalBottomLocation = useVisible()

  const [listTagService, setListTagService] = useState([
    { code: 'nhan-mi', name: 'Nhấn mí' },
    { code: 'cat-mi', name: 'Cắt mí' },
    { code: 'nang-cung', name: 'Nâng cung' },
    { code: 'mo-khoe-ngoai', name: 'Mở khoé ngoài' },
    { code: 'lay-mo-bong-mat', name: 'Lấy mỡ bọng mắt' },
  ])
  const [selectedListTagService, setSelectedListTagService] = useState([])

  const [listTagType, setListTagType] = useState([
    { code: 'benh-vien', name: 'Bệnh viện' },
    { code: 'phong-kham', name: 'Phòng khám' },
    { code: 'clinic', name: 'Clinic' },
    { code: 'spa', name: 'Spa' },
  ])
  const [selectedListTagType, setSelectedListTagType] = useState([])

  const [listTagUtilitie, setListTagUtilitie] = useState([
    { code: 'xe-dua-don', name: 'Xe đưa đón' },
    { code: 'tra', name: 'Trà/Đồ uống' },
    { code: 'bai-dau-xe', name: 'Bãi đậu xe miễn phí' },
    { code: 'trai-cay', name: 'Trái cây' },
    { code: 'phong-tiem-rieng', name: 'Phòng tiêm riêng' },
    { code: 'goi-tu-cham-soc', name: 'Gói tự chăm sóc' },
    { code: 'phong-nghi', name: 'Phòng nghĩ dưỡng VIP' },
  ])
  const [selectedListTagUtilitie, setSelectedListTagUtilitie] = useState([])


  useEffect(() => {
    if (visible) {
      tranX.value = withTiming(-WIDTH_MODAL, { duration: 300 })
      opacityBackDrop.value = withTiming(1, { duration: 300 })
    } else {
      tranX.value = withTiming(0, { duration: 300 })
    }
  }, [visible])

  // FUNCTION
  const _handleSelectTagService = (data) => {
    let arrTemp = [...selectedListTagService];
    let indexFinded = arrTemp?.findIndex(item => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setSelectedListTagService(arrTemp)
  }
  const _handleSelectTagType = (data) => {
    let arrTemp = [...selectedListTagType];
    let indexFinded = arrTemp?.findIndex(item => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setSelectedListTagType(arrTemp)
  }
  const _handleSelectTagUtilitie = (data) => {
    let arrTemp = [...selectedListTagUtilitie];
    let indexFinded = arrTemp?.findIndex(item => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setSelectedListTagUtilitie(arrTemp)
  }


  // ANIMATION
  const _handleClosing = () => {
    tranX.value = withTiming(0, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        runOnJS(_handleHide)()
      }
    })
    opacityBackDrop.value = withTiming(0, { duration: 200 })
  }
  const _handleHide = () => {
    onClose()
  }

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value }
  })
  const animTranXModal = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tranX.value,
        },
      ],
    };
  })

  if (!visible) return null
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            width: _width,
            height: '100%',
          },
          { backgroundColor: "rgba(0,0,0,.7)" },
          animOpacityBackDrop
        ]}>
        <TouchableOpacity
          onPress={_handleClosing}
          style={[StyleSheet.absoluteFillObject]} />
      </Animated.View>

      <Animated.View style={[
        styles.containerRightTab,
        { right: - WIDTH_MODAL },
        animTranXModal]}>
        <Column
          marginBottom={8 * 2}
          alignItems='center'
          marginTop={top + 8 * 2}>
          <Text
            color={GREY_FOR_TITLE}
            weight='bold'>
            BỘ LỌC TÌM KIẾM
          </Text>

          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={_handleClosing}
            style={styles.btnCancel}>
            <IconCancelGrey style={sizeIcon.md} />
          </TouchableOpacity>
        </Column>
        <ScrollView>
          <WrapList
            selected={selectedListTagService}
            onSelected={_handleSelectTagService}
            data={listTagService}
            title="Dịch vụ" />
          <FilterLocation visibleModalBottomLocation={visibleModalBottomLocation} />
          <WrapList
            selected={selectedListTagType}
            onSelected={_handleSelectTagType}
            data={listTagType}
            title="Loại hình" />
          <SliderPrice />
          <WrapList
            selected={selectedListTagUtilitie}
            onSelected={_handleSelectTagUtilitie}
            data={listTagUtilitie}
            title="Tiện ích" />
        </ScrollView>

        <Row
          marginVertical={8 * 2}
          paddingHorizontal={8 * 2}
          gap={8 * 2}>
          <Column width={120}>
            <Button.Custom
              titleSize={14}
              bgColor={'#F2F2F5'}
              colorText={GREY}
              title={`Thiết lập lại`}
              onPress={() => { }}
              height={40}
            />
          </Column>
          <Button.Gradient
            titleSize={14}
            containerStyle={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[NEW_BASE_COLOR, NEW_BASE_COLOR]}
            title={`Áp dụng`}
            onPress={() => { }}
            height={40}
          />
        </Row>

      </Animated.View>

      <ModalBottomLocation
        onClose={visibleModalBottomLocation.hide}
        visible={visibleModalBottomLocation.visible} />

    </View>
  )
}

export default ModalFilter

const styles = StyleSheet.create({
  btnCancel: {
    position: 'absolute',
    zIndex: 1,
    right: 8 * 2
  },
  containerRightTab: {
    width: WIDTH_MODAL,
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: WHITE,
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    right: 0,
  }
})
