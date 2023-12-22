import Button from '@Components/Button/Button'
import Column from '@Components/Column'
import Image from '@Components/Image'
import Text from '@Components/Text'
import { GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { selectCampain } from '@Redux/charity/actions'
import { Campain } from '@typings/charity'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  data: Campain
}

const CardSmallCharity = ({ data }: Props) => {
  const dispatch = useDispatch()
  const { navigate, navigation } = useNavigate()

  const dayLeft = useMemo(() => {
    return moment(data?.endDate).diff(moment(), 'days')
  }, [data?.endDate])

  const _handleGoToDetail = useCallback(() => {
    navigation.goBack()
    dispatch(selectCampain(data))
    navigate(ScreenKey.CHARITY_FUND_DETAILS, { campain: data })()
  }, [data])

  return (
    <Column
      alignItems='center'
      gap={8}
      width={8 * 16}
      alignSelf='flex-start'>
      <Text
        numberOfLines={1}
        weight='bold'
        color={GREY}
        size={12}
        style={{ textAlign: 'center' }}>{data?.createBy}</Text>
      <Column
        borderRadius={8}
        backgroundColor={'#F4F4F4'}
        padding={8}
        paddingBottom={8 * 2}>
        <Column
          top={8 * 2}
          borderTopRightRadius={4}
          borderBottomRightRadius={4}
          zIndex={1}
          paddingHorizontal={4}
          paddingVertical={2}
          backgroundColor={NEW_BASE_COLOR}
          position='absolute'>
          <Text
            color={WHITE}
            size={10}>
            {dayLeft} Ngày
          </Text>
        </Column>
        <Image
          style={styles.avatar}
          avatar={data?.avatar} />
      </Column>
      <Button.Gradient
        onPress={_handleGoToDetail}
        title="Ủng hộ"
        titleSize={12}
        height={8 * 3}
        width={8 * 8}
        borderRadius={8}
        horizontal
        colors={["#1a3e67", "#34759b"]}
      />
    </Column>
  )
}

export default CardSmallCharity

const styles = StyleSheet.create({
  avatar: {
    width: 8 * 10,
    height: 8 * 10,
    borderRadius: 8
  }
})
