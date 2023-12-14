import Column from '@Components/Column';
import { IconFilter } from '@Components/Icon/Icon';
import HorizontalLine from '@Components/Line/HorizontalLine';
import Row from '@Components/Row';
import Text from '@Components/Text';
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color';
import React, { useRef } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Popover from 'react-native-popover-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useHapticCallback from 'src/Hooks/useHapticCallback';
import useVisible from 'src/Hooks/useVisible';
import { isAndroid } from 'src/utils/platform';


type Props = {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
  icon?: any;
};

const BtnPopover = ({ title = '', isActive = false, onPress, icon = null }: Props) => {
  const { top } = useSafeAreaInsets()
  const visiblePopover = useVisible()

  const showPopover = useHapticCallback(() => {
    visiblePopover.show()
  }, [])

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
              {title.toUpperCase()}
            </Text>
            {
              icon ?
                <>
                  {icon}
                </>
                : <></>
            }
          </Row>
        </TouchableOpacity>
      )}>
      <Column
        width={140} backgroundColor={WHITE}>
        <TouchableOpacity
          onPress={visiblePopover.hide}
          style={styles.containerTouch}>
          <Text>
            Ưu đãi
          </Text>
        </TouchableOpacity>
        <HorizontalLine style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={visiblePopover.hide}
          style={styles.containerTouch}>
          <Text>
            Đánh giá hàng đầu
          </Text>
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
