import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

const ListUsers = () => {
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
        <Text color={NEW_BASE_COLOR}>
          {`Xem tất cả >`}
        </Text>
      </Row>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 * 2 }}
        horizontal>
        {
          [1, 2, 3, 4, 5]?.map((item, index) => {
            return (
              <Column
                width={8 * 8}
                key={index}
                alignItems='center'>
                <Avatar
                  style={styles.borderAvatar}
                  size={8 * 5}
                  avatar={null} />
                <Text numberOfLines={1} size={12}>NameUser</Text>
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
