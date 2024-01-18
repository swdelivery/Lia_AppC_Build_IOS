import { StyleSheet, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import { WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import Text from '@Components/Text'
import HorizontalLine from '@Components/Line/HorizontalLine'

const BannerInfo = () => {
  return (
    <Column
      gap={8}
      height={8 * 20}
      borderRadius={8 * 3}
      padding={8 * 2}
      paddingHorizontal={8 * 3}
      margin={8 * 2}
      backgroundColor={WHITE}>
      <Row>
        <Column flex={3.5}>
          <Text numberOfLines={1} >
            HỌ VÀ TÊN: <Text weight='bold'>PHẠM THỊ DUNG</Text>
          </Text>
        </Column>
        <Column flex={2.5}>
          <Text>
            GIỚI TÍNH: <Text weight='bold'>NỮ</Text>
          </Text>
        </Column>
      </Row>
      <Row>
        <Column flex={3.5}>
          <Text>
            SĐT: <Text weight='bold'>0961096961</Text>
          </Text>
        </Column>
        <Column flex={2.5}>
          <Text>
            CCCD: <Text weight='bold'>212282925</Text>
          </Text>
        </Column>
      </Row>
      <Column>
        <Text>
          ĐỊA CHỈ: <Text weight='bold'>434 CAO THẮNG, P12, Q10, TPHCM</Text>
        </Text>
      </Column>
      <HorizontalLine />
      <Column>
        <Text>
          DỊCH VỤ MONG MUỐN: <Text weight='bold'>CẮT MÍ, NÂNG CUNG, PHUN XĂM</Text>
        </Text>
      </Column>
    </Column>
  )
}

export default BannerInfo

const styles = StyleSheet.create({})
