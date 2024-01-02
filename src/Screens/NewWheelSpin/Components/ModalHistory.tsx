import Column from '@Components/Column'
import Image from '@Components/Image'
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
import { ScrollView, StyleSheet } from 'react-native'

type Props = {
  visibleListHistory: any
}

const ModalHistory = ({ visibleListHistory }: Props) => {
  const [listHistoryReward, setListHistoryReward] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (visibleListHistory.visible) {
      _getListHistoryReward()
    }
  }, [visibleListHistory.visible])

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
        // paddingHorizontal={8 * 6}
        borderBottomColor={BORDER_COLOR}
        marginHorizontal={8 * 2}>
        <Row gap={8 * 2}>
          <Image
            resizeMode='contain'
            style={styles.avatarReward}
            avatar={award?.imageReward} />
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
