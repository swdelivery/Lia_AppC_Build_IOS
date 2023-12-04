import Avatar from '@Components/Avatar'
import { IconAlarmWhite, IconFindGrey, IconPlusBase } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, GREY, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { getInfoUserReducer } from '@Redux/Selectors'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const Header = () => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { top } = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={{ height: top }} />
      <View style={styles.header__box}>
        <Row
          gap={8 * 2}
          paddingHorizontal={8 * 2}>
          <Avatar size={8 * 4} circle avatar={infoUser?.fileAvatar} />
          <TouchableOpacity style={styles.containerSearch}>
            <Row
              gap={8}
              paddingHorizontal={8}>
              <IconFindGrey style={sizeIcon.llg} />
              <Text
                fontStyle='italic'
                color={GREY}>
                Nhập thông tin tìm kiếm
              </Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerBtnAdd}>
            <IconPlusBase />
          </TouchableOpacity>

          <TouchableOpacity>
            <IconAlarmWhite />
          </TouchableOpacity>

        </Row>

      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  containerBtnAdd: {
    width: 8 * 3,
    height: 8 * 3,
    borderRadius: 8 * 2,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSearch: {
    backgroundColor: WHITE,
    flex: 1,
    borderRadius: 8,
    height: 8 * 4,
    justifyContent: 'center'
  },
  header__box: {
    height: 50,
    justifyContent: 'center'
  },
  container: {
    backgroundColor: BASE_COLOR
  }
})
