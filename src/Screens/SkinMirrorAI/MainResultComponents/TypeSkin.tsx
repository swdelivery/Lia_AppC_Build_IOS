import Column from '@Components/Column'
import HorizontalProgress from '@Components/HoriontalProgress'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Spacer from '@Components/Spacer'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import Popover from 'react-native-popover-view'
import useVisible from 'src/Hooks/useVisible'


const TypeSkin = () => {
  const visiblePopover = useVisible()

  return (
    <Column
      marginVertical={0}
      margin={8 * 2}>
      <Row justifyContent='space-between'>
        <Text
          weight='bold'
          color={NEW_BASE_COLOR}>
          LOẠI DA
        </Text>
        <Popover
          onRequestClose={visiblePopover.hide}
          isVisible={visiblePopover.visible}
          from={() => (
            <TouchableOpacity
              hitSlop={styleElement.hitslopMd}
              onPress={visiblePopover.show}>
              <Icon color={NEW_BASE_COLOR} name='information-outline' />
            </TouchableOpacity>
          )}>
          <Column padding={8 * 2}>
            <Text>
              Công nghệ A1 Smart chụp các thông tin chi tiết về làn da của bạn. Công nghệ tiên tiến này sử dụng máy ảnh độ phân giải cao 16 megapixel để chụp ảnh khuôn
            </Text>
          </Column>
        </Popover>

      </Row>
      <Spacer top={8 * 2} />

      <Row alignItems='flex-start' gap={8 * 4}>
        <AnimatedCircularProgress
          size={160}
          // delay={2000}
          width={8}
          fill={80}
          rotation={180 + 90}
          lineCap={'round'}
          arcSweepAngle={180}
          tintColor={NEW_BASE_COLOR}
          backgroundColor="#F3F6F6">
          {
            (fill) => (
              <Column
                bottom={8 * 2}
                alignItems='center'>
                <Text
                  color={NEW_BASE_COLOR}
                  size={20}
                  weight='bold'>
                  80%
                </Text>
                <Text size={18} color={NEW_BASE_COLOR}>
                  Da dầu
                </Text>
              </Column>
            )
          }
        </AnimatedCircularProgress>

        <Column gap={8} flex={1}>
          <Column gap={4}>
            <Row justifyContent='space-between'>
              <Text color={NEW_BASE_COLOR} weight='bold'>
                Lão hoá
              </Text>
              <Text color={NEW_BASE_COLOR}>
                Màu sáng
              </Text>
            </Row>
            <HorizontalProgress height={6} width={'100%'} percent={30} />
          </Column>
          <Column gap={4}>
            <Row justifyContent='space-between'>
              <Text color={NEW_BASE_COLOR} weight='bold'>
                Bề mặt da
              </Text>
              <Text color={NEW_BASE_COLOR}>
                Mịn màng
              </Text>
            </Row>
            <HorizontalProgress height={6} width={'100%'} percent={10} />
          </Column>
          <Column gap={4}>
            <Row justifyContent='space-between'>
              <Text color={NEW_BASE_COLOR} weight='bold'>
                Lỗ chân lông
              </Text>
              <Text color={NEW_BASE_COLOR}>
                To
              </Text>
            </Row>
            <HorizontalProgress height={6} width={'100%'} percent={75} />
          </Column>
        </Column>
      </Row>

    </Column>
  )
}

export default TypeSkin

const styles = StyleSheet.create({

})
