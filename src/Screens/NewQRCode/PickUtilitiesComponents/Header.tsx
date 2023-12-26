import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { getInfoUserReducer } from '@Redux/Selectors'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const Header = () => {
  const { top } = useSafeAreaInsets()
  const { infoUser } = useSelector(getInfoUserReducer);

  return (
    <Column
      padding={8 * 2}
      paddingBottom={8}
      backgroundColor={NEW_BASE_COLOR}>
      <Column height={top} />
      <Row gap={8}>
        <Avatar
          size={8 * 5}
          circle
          avatar={infoUser?.fileAvatar} />
        <Column flex={1}>
          <Text
            weight='bold'
            color={WHITE}
            numberOfLines={1}>
            Chào mừng {infoUser?.name}
          </Text>
          <Text
            size={12}
            fontStyle='italic'
            color={WHITE}
            numberOfLines={1}>
            Bước vào thế giới diệu kì
          </Text>
        </Column>
      </Row>

      <Column
        marginHorizontal={8 * 2}
        marginTop={8}
        borderRadius={8}
        backgroundColor={WHITE}
        style={styleElement.centerChild}
        paddingVertical={4}>
        <Text
          weight='bold'
          fontStyle='italic'
          color={NEW_BASE_COLOR}
          size={12}>
          Hãy cho chúng tôi biết về điều bạn thích, {'\n'} chúng tôi sẽ biến điều đó thành sự thật!
        </Text>
      </Column>
    </Column>
  )
}

export default Header

const styles = StyleSheet.create({})
