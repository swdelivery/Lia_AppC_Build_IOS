import Column from '@Components/Column'
import Text from '@Components/Text'
import { GREY, NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import CardInfoCharity from '../Components/CardInfoCharity'
import { Campain } from '@typings/charity'
import { useSelector } from 'react-redux'
import { getListCampainFilterState } from '@Redux/charity/selectors'
import { styleElement } from '@Constant/StyleElement'


const ListCharityPopular = () => {
  const { data } = useSelector(getListCampainFilterState)

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
          data?.length > 0 ?
            <>
              {
                data?.map((item) => {
                  return (
                    <CardInfoCharity data={item} key={item?._id} />
                  )
                })
              }
            </>
            :
            <Column flex={1} style={styleElement.centerChild}>
              <Text
                fontStyle='italic'
                color={GREY}>
                Không tìm thấy kết quả phù hợp
              </Text>
            </Column>
        }

      </ScrollView>
    </Column>
  )
}

export default ListCharityPopular

const styles = StyleSheet.create({})
