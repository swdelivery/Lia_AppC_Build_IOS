import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { getTopDonate } from '@Redux/charity/actions'
import { getTopDonateState } from '@Redux/charity/selectors'
import { isEmpty } from 'lodash'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'

const ListUsers = () => {
  const { navigate } = useNavigate()
  const dispatch = useDispatch()
  const { data: listTopDonate } = useSelector(getTopDonateState)

  useFocused(() => {
    dispatch(getTopDonate.request({
      limit: 50
    }))
  })

  if (isEmpty(listTopDonate)) return null

  return (
    <Column
      gap={8 * 2}
      marginTop={8 * 2}
      paddingHorizontal={8 * 2}>
      <Row justifyContent='space-between'>
        <Text
          weight='bold'>
          Tài khoản tích cực
        </Text>
        <TouchableOpacity onPress={navigate(ScreenKey.CHARITY_LIST_OUTSTANDING)}>
          <Text color={NEW_BASE_COLOR}>
            {`Xem tất cả >`}
          </Text>
        </TouchableOpacity>
      </Row>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 * 2 }}
        horizontal>
        {
          listTopDonate?.slice(0, 10)?.map((item, index) => {
            return (
              <Column
                width={8 * 8}
                key={index}
                alignItems='center'>
                <Avatar
                  style={styles.borderAvatar}
                  size={8 * 5}
                  avatar={item?.partner?.fileAvatar} />
                <Text numberOfLines={1} size={12}>{item?.partner?.name}</Text>
              </Column>
            )
          })
        }
      </ScrollView>
    </Column>
  )
}

export default ListUsers

const styles = StyleSheet.create({
  borderAvatar: {
    borderWidth: 2,
    borderRadius: 8 * 5 / 2,
    borderColor: NEW_BASE_COLOR
  }
})
