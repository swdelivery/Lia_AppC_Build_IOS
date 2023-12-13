import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Row from '@Components/Row'
import { IconBackBase, IconBackBlue, IconBackGrey, IconFindGrey, IconLike } from '@Components/Icon/Icon'
import Text from '@Components/Text'
import { sizeIcon } from '@Constant/Icon'
import { styleElement } from '@Constant/StyleElement'
import { useNavigate } from 'src/Hooks/useNavigation'

const Header = () => {
  const { top } = useSafeAreaInsets()
  const { navigation } = useNavigate()

  return (
    <View>
      <Column height={top} />
      <Row
        paddingTop={8}
        justifyContent='space-between'
        padding={8 * 2}>
        <Column width={70}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={styleElement.hitslopSm}>
            <IconBackBlue />
          </TouchableOpacity>
        </Column>

        <Column>
          <Text color={'#366792'} weight="bold" size={16}>
            Danh sách dịch vụ
          </Text>
        </Column>

        <Row gap={8 * 2} justifyContent='flex-end' width={70}>
          <TouchableOpacity>
            <IconFindGrey style={sizeIcon.lg} />
          </TouchableOpacity>
          <TouchableOpacity style={{ opacity: .6 }}>
            <IconLike />
          </TouchableOpacity>
        </Row>
      </Row>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
