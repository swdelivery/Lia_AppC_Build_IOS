import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Text from '@Components/Text'
import SmallDiary from './RecommendDiaryComponents/SmallDiary'
import Column from '@Components/Column'
import { NEW_BASE_COLOR } from '@Constant/Color'
import PartnerService from 'src/Services/PartnerService'
import useApiPaging from 'src/Hooks/services/useApiPaging'

const RecommendDiary = () => {
  const { data: posts, getData } = useApiPaging(PartnerService.getListPosts);

  useEffect(() => {
    requestAnimationFrame(() => {
      getData({
        page: 6,
        limit: 5
      });
    })
  }, [])

  return (
    <Column>
      <Column margin={8 * 2}>
        <Text
          weight='bold'
          color={NEW_BASE_COLOR}>
          Nhật ký tham khảo
        </Text>
      </Column>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 8 * 2 }}
        horizontal>
        {
          posts?.map((item, index) => {
            return (
              <SmallDiary data={item} key={item?._id} />
            )
          })
        }
      </ScrollView>
    </Column>
  )
}

export default RecommendDiary

const styles = StyleSheet.create({})
