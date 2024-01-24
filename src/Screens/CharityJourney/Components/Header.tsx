import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BLACK_OPACITY_4, BORDER_COLOR } from '@Constant/Color'
import { IconBackWhite } from '@Components/Icon/Icon'
import { useNavigate } from 'src/Hooks/useNavigation'
import Row from '@Components/Row'
import { sizeIcon } from '@Constant/Icon'

type Props = {
  title: string;
}

const Header = ({ title }: Props) => {
  const { top } = useSafeAreaInsets()
  const { navigation } = useNavigate()

  return (
    <Column
      paddingTop={top}
      borderBottomColor={BORDER_COLOR}
      borderBottomWidth={.5}>
      <Column
        paddingHorizontal={8 * 2}
        justifyContent='center'
        height={45}>
        <Row gap={8 * 2}>
          <Column
            onPress={navigation.goBack}
            backgroundColor={BLACK_OPACITY_4}
            borderRadius={8 * 10}>
            <IconBackWhite style={sizeIcon.llg} />
          </Column>
          <Text size={16} weight='bold'>
            {title}
          </Text>
        </Row>
      </Column>
    </Column>
  )
}

export default Header

const styles = StyleSheet.create({})
