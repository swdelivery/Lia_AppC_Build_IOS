import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import LinearGradient from 'react-native-linear-gradient'
import useApiPaging from 'src/Hooks/services/useApiPaging'
import PartnerService from 'src/Services/PartnerService'
import PartnerDiary from '@Components/PartnerDiary'
import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'

const ListDiary = () => {
  const { data: diaries, getData } = useApiPaging(PartnerService.getDiaryList);
  useEffect(() => {
    requestAnimationFrame(() => {
      getData({
      });
    })
  }, [])

  return (
    <AfterTimeoutFragment timeout={500}>
      <Column>
        <Column margin={8 * 2}>
          <Text
            color={NEW_BASE_COLOR}
            weight='bold'>
            NHẬT KÝ TƯƠNG TỰ
          </Text>
        </Column>
        <View style={styles.bgGradientContainer}>
          <LinearGradient
            style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["#8AA9BD", "#0F2A3A"]} />
          <PartnerDiary contentScrollViewStyle={{
            paddingLeft: 8 * 1.5
          }} items={diaries?.slice(0, 3)} />
        </View>

      </Column>
    </AfterTimeoutFragment>
  )
}

export default ListDiary

const styles = StyleSheet.create({
  bgGradientContainer: {
    width: _width,
    paddingVertical: 8 * 2
  }
})
