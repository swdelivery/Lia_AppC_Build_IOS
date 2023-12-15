import Column from '@Components/Column'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import CardInfoCharity from '../Components/CardInfoCharity'

const ListCharityPopular = () => {
  return (
    <Column>
      <Column marginHorizontal={8 * 2}>
        <Text
          color={NEW_BASE_COLOR}
          weight='bold'>Chiến dịch nổi bật</Text>
      </Column>
      <ScrollView
        style={{ marginTop: 8 * 2 }}
        contentContainerStyle={{ gap: 8 * 2 }}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8]?.map((item, index) => {
            return (
              <CardInfoCharity key={index} />
            )
          })
        }
      </ScrollView>
    </Column>
  )
}

export default ListCharityPopular

const styles = StyleSheet.create({})
