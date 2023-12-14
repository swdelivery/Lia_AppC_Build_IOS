import Column from '@Components/Column'
import { IconArrowDown } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import useHapticCallback from 'src/Hooks/useHapticCallback'


type Props = {
  visibleModalBottomLocation: any;
};


const FilterLocation = ({ visibleModalBottomLocation }: Props) => {

  const _handleShow = useHapticCallback(() => {
    visibleModalBottomLocation.show()
  }, [])

  return (
    <Row
      gap={8 * 2}
      padding={8 * 2}>
      <Text
        weight='bold'>Vị trí</Text>
      <TouchableOpacity
        onPress={_handleShow}>
        <Column
          paddingVertical={4}
          borderWidth={1}
          borderColor={BORDER_COLOR}
          borderRadius={8}
          paddingHorizontal={8 * 2}>
          <Row gap={8}>
            <Text size={12}>
              Thành phố Hồ Chí Minh
            </Text>
            <IconArrowDown style={sizeIcon.sm} />
          </Row>
        </Column>
      </TouchableOpacity>
    </Row>
  )
}

export default FilterLocation

