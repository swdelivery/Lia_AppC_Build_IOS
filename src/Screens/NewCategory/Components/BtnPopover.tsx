import Column from '@Components/Column';
import { IconTick } from '@Components/Icon/Icon';
import HorizontalLine from '@Components/Line/HorizontalLine';
import Row from '@Components/Row';
import Text from '@Components/Text';
import { NEW_BASE_COLOR, RED, WHITE } from '@Constant/Color';
import { sizeIcon } from '@Constant/Icon';
import { styleElement } from '@Constant/StyleElement';
import { selectServiceAverageRating, selectServiceCoupon } from '@Redux/category/actions';
import { getDataFilterServiceState } from '@Redux/category/selectors';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Popover from 'react-native-popover-view';
import { useDispatch, useSelector } from 'react-redux';
import useHapticCallback from 'src/Hooks/useHapticCallback';
import useVisible from 'src/Hooks/useVisible';


type Props = {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
  icon?: any;
};

const BtnPopover = ({ title = '', isActive = false, onPress, icon = null }: Props) => {
  const visiblePopover = useVisible()
  const dispatch = useDispatch()
  const { dataServiceCoupon, dataServiceAverageRating } = useSelector(getDataFilterServiceState)

  const showPopover = useHapticCallback(() => {
    visiblePopover.show()
  }, [])

  const _handleSelectServiceCoupon = useHapticCallback(() => {
    visiblePopover.hide()
    dispatch(selectServiceCoupon())
  }, [])
  const _handleSelectServiceAverageRating = useHapticCallback(() => {
    visiblePopover.hide()
    dispatch(selectServiceAverageRating())
  }, [])

  const count = useMemo(() => {
    let number = 0;
    if (dataServiceCoupon) {
      number += 1
    }
    if (dataServiceAverageRating) {
      number += 1
    }
    return number
  }, [dataServiceCoupon, dataServiceAverageRating])

  return (
    <Popover
      statusBarTranslucent={true}
      onRequestClose={visiblePopover.hide}
      isVisible={visiblePopover.visible}
      // verticalOffset={isAndroid ? -top : 0}
      arrowShift={0.8}
      from={() => (
        <TouchableOpacity onPress={showPopover}>
          <Row gap={4}>
            <Text
              color={WHITE}
              weight={isActive ? 'bold' : 'regular'}>
              {title}
            </Text>
            {
              icon ?
                <>
                  {icon}
                </>
                : <></>
            }
          </Row>
          {
            count ?
              <Column
                width={8 * 2}
                height={8 * 2}
                right={-2}
                top={1}
                borderRadius={8}
                backgroundColor={RED}
                style={styleElement.centerChild}
                position='absolute'>
                <Text
                  size={10}
                  color={WHITE}
                  weight='bold'>
                  {count}
                </Text>
              </Column>
              : <></>
          }

        </TouchableOpacity>
      )}>
      <Column
        width={180} backgroundColor={WHITE}>
        <TouchableOpacity
          onPress={_handleSelectServiceCoupon}
          style={styles.containerTouch}>
          <Row gap={8}>
            <Text>
              Ưu đãi
            </Text>
            {
              dataServiceCoupon ?
                <IconTick style={sizeIcon.xxxxs} />
                : <></>
            }
          </Row>
        </TouchableOpacity>
        <HorizontalLine style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={_handleSelectServiceAverageRating}
          style={styles.containerTouch}>
          <Row gap={8}>
            <Text>
              Đánh giá hàng đầu
            </Text>
            {
              dataServiceAverageRating ?
                <IconTick style={sizeIcon.xxxxs} />
                : <></>
            }
          </Row>
        </TouchableOpacity>
      </Column>
    </Popover>

  )
}

export default BtnPopover

const styles = StyleSheet.create({
  containerTouch: {
    padding: 8,
    alignItems: 'center'
  },
  horizontalLine: {
    backgroundColor: NEW_BASE_COLOR,
    alignSelf: 'center',
    width: '90%'
  }
})
