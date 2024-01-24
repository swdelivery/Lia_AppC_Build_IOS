import Column from '@Components/Column'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Header from './Components/Header'
import { useNavigationParams } from "src/Hooks/useNavigation";
import ScreenKey from '@Navigation/ScreenKey'
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { getImageAvataUrl } from 'src/utils/avatar'
import useVisible from 'src/Hooks/useVisible'

type InfoProps = {
  title: string;
  value: string;
  right?: React.ReactElement;
}
type ScreenK = typeof ScreenKey.EXPENSE_DETAIL;

const ExpenseDetail = () => {
  const { data } = useNavigationParams<ScreenK>();
  const imageViewer = useVisible()


  const _handlePressImage = useCallback((idx: number) => () => {
    imageViewer.show(idx)
  }, [])

  const listImage = useMemo(() => {
    // return [{ uri: getImageAvataUrl(imageBeforeTreatment[0]) }]
    return data?.images?.map((item, index) => {
      return {
        uri: getImageAvataUrl(item)
      }
    })
  }, [data?.images])

  const Info = useCallback(({ title, value, right }: InfoProps) => {
    return (
      <Column
        gap={8}
        marginHorizontal={8 * 2}>
        <Text>
          {title}
        </Text>
        <Column
          backgroundColor={"#F4F4F4"}
          padding={8 * 2}
          borderRadius={8}>
          <Row>
            <Text style={styleElement.flex}>
              {value}
            </Text>
            {right}
          </Row>
        </Column>
      </Column>
    )
  }, [])

  return (
    <Screen>
      <Header title='Chi tiết khoản chi' />
      <ScrollView>
        <Spacer top={8 * 2} />
        <Column gap={8 * 2}>
          <Info
            title='Loại khoản chi'
            value={data?.volunteerFundRequest?.title} />
          <Info
            title='Ngày chi'
            value={moment(data?.volunteerFundRequest?.created).format("DD/MM/YYYY")} />
          <Info
            title='Nội dung khoản chi'
            value={data?.message} />
          <Info
            title='Tổng số tiền'
            value={formatMonney(data?.depositAmount)}
            right={<Text weight='bold'>VND</Text>} />
        </Column>
        <Column margin={8 * 2}>
          <Text>
            Ảnh
          </Text>
          <Row flexWrap='wrap'>
            {
              data?.images?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={_handlePressImage(index)}
                    activeOpacity={.7}>
                    <Image
                      style={styles.image}
                      avatar={item} />
                  </TouchableOpacity>
                )
              })
            }
          </Row>
        </Column>
      </ScrollView>

      <EnhancedImageViewing
        images={listImage}
        imageIndex={imageViewer.selectedItem.current}
        onRequestClose={imageViewer.hide}
        visible={imageViewer.visible}
      />

    </Screen>
  )
}

export default ExpenseDetail

const styles = StyleSheet.create({
  image: {
    width: (_width - 8 * 4) / 4,
    height: (_width - 8 * 4) / 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: WHITE
  }
})
