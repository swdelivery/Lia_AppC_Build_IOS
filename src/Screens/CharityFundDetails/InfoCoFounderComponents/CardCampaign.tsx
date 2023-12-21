import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BLACK_OPACITY_7, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { selectCampain } from '@Redux/charity/actions'
import { CompanionRequest } from '@typings/charity'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import { getImageAvataUrl } from 'src/utils/avatar'

type Props = {
  data: CompanionRequest
}

const CardCampaign = ({ data }: Props) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigate()
  const { volunteer: {
    endDate,
    bannerFileArr,
    name,
    createBy,
    avatar
  } } = data

  const dayLeft = useMemo(() => {
    return moment(endDate).diff(moment(), 'days')
  }, [endDate])

  const _handleGoToDetailCampain = useCallback(() => {
    dispatch(selectCampain(data?.volunteer))
    navigate(ScreenKey.CHARITY_FUND_DETAILS, { campain: data?.volunteer })()
  }, [data])

  return (
    <TouchableOpacity
      onPress={_handleGoToDetailCampain}
      activeOpacity={.5}>
      <ImageBackground
        imageStyle={{ borderRadius: 8 }}
        style={styles.imgBG}
        source={{ uri: getImageAvataUrl(bannerFileArr[0]) }}>
        <LinearGradient
          style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["transparent", BLACK_OPACITY_7]} />

        <Column
          top={8}
          left={8}
          position='absolute'
          paddingVertical={2}
          borderRadius={8}
          backgroundColor={WHITE}
          paddingHorizontal={8}>
          <Text size={12} color={NEW_BASE_COLOR}>
            {dayLeft} Ngày
          </Text>
        </Column>

        <Column
          gap={8}
          position='absolute'
          bottom={8}
          marginHorizontal={8 * 2}>
          <Text
            weight='bold'
            color={WHITE}>
            {name}
          </Text>
          <Row gap={8}>
            <Avatar circle size={8 * 3} avatar={avatar} />
            <Text
              color={WHITE}
              weight='bold'>{createBy}</Text>
          </Row>
        </Column>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default CardCampaign

const styles = StyleSheet.create({
  imgBG: {
    height: 8 * 18,
  }
})
