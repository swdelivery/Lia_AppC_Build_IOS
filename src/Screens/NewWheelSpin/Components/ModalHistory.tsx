import Column from '@Components/Column'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import LoadingIndicator from '@Components/LoadingIndicator/LoadingIndicator'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, WHITE } from '@Constant/Color'
import { _heightScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { getHistorySpin } from '@Redux/Action/SpinWheelAction'
import { first } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'

type Props = {
  visibleListHistory: any
}

const ModalHistory = ({ visibleListHistory }: Props) => {
  const [listHistoryReward, setListHistoryReward] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    _getListHistoryReward()
  }, [visibleListHistory])

  const _getListHistoryReward = async () => {
    setIsLoading(true)
    let result = await getHistorySpin({
      condition: {
        eventCode: {
          equal: "SPIN_WHEEL",
        },
      },
    });
    setListHistoryReward(result?.data?.data);
    setIsLoading(false)
  };

  const ItemReward = useCallback(({ data }) => {

    const award = first(data?.awards)
    const created = data?.created

    return (
      <Column
        paddingVertical={8}
        borderBottomWidth={1}
        paddingHorizontal={8 * 6}
        borderBottomColor={BORDER_COLOR}
        marginHorizontal={8 * 2}>
        <Row gap={8 * 2}>
          <Image
            style={styles.avatarReward}
            source={{ uri: `data:image/jpeg;base64,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` }} />
          <Column flex={1}>
            <Text
              numberOfLines={1}
              size={18}
              weight='bold'
              color={"#D20002"}>
              {award?.name}
            </Text>
            <Text
              color={"#D20002"}>
              {moment(created).format('HH:mm')} - {moment(created).format('DD/MM/YYYY')}
            </Text>
          </Column>
        </Row>
      </Column>
    )
  }, [listHistoryReward])

  return (
    <ModalBottom
      borderWidth={2}
      borderBottomWidth={0}
      borderColor={"#D20002"}
      borderTopLeftRadius={8 * 2}
      borderTopRightRadius={8 * 2}
      onClose={visibleListHistory.hide}
      heightModal={_heightScale(500)}
      visible={visibleListHistory.visible} >
      <Column
        backgroundColor={'#D20002'}
        width={8 * 20}
        height={8 * 4}
        borderRadius={8 * 2}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        style={styleElement.centerChild}
        position='absolute'
        alignSelf='center'
        top={-8 * 4}>
        <Text
          color={WHITE}
          weight='bold'>
          LỊCH SỬ QUAY
        </Text>
      </Column>

      {
        isLoading ?
          <LoadingIndicator />
          :
          <>
            {
              listHistoryReward.length > 0 ?
                <ScrollView contentContainerStyle={{ paddingVertical: 8 * 2 }}>
                  {
                    listHistoryReward?.map((item, index) => {
                      return (
                        <ItemReward data={item} key={item?._id} />
                      )
                    })
                  }
                </ScrollView>
                :
                <EmptyResultData title='Lịch sử quay thưởng trống' />
            }
          </>
      }



    </ModalBottom>
  )
}

export default ModalHistory

const styles = StyleSheet.create({
  avatarReward: {
    width: 8 * 8,
    height: 8 * 8
  }
})
