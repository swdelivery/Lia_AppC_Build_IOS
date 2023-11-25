import Certificate from '@Components/Certificate/Certificate'
import Column from '@Components/Column'
import CountStar2 from '@Components/NewCountStar/CountStar'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { URL_ORIGINAL } from '@Constant/Url'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'
import { GREY, WHITE } from '../../../Constant/Color'
import { sizeIcon } from '../../../Constant/Icon'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'
import ScreenKey from '../../../Navigation/ScreenKey'

const ItemDoctor = (props) => {

  const { data } = props;
  const { navigate } = useNavigate()

  return (
    <TouchableOpacity
      activeOpacity={.7}
      onPress={navigate(ScreenKey.DETAIL_DOCTOR, { doctor: data })}
      style={[styles.card]}>
      <Row gap={8} alignItems='flex-start'>
        <Image
          style={styles.avatar}
          source={{ uri: `${URL_ORIGINAL}${data?.avatar?.link}` }}
        />

        <Column flex={1}>
          <Row gap={8 * 2}>
            <Column flex={1}>
              <Text numberOfLines={1} weight='bold'>
                {data?.name}
              </Text>
            </Column>

            <TouchableOpacity
              style={styles.btnChat}>
              <Text weight='bold' color={WHITE} size={12}>
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>

          <CountStar2 rating={data?.averageRating ? data?.averageRating : 5} count={data?.reviewCount} />

          <Row alignItems='flex-start'>
            <Image style={sizeIcon.xs} source={require('../../../Image/locationRed.png')} />
            <Column flex={1}>
              <Text color={GREY} size={12}>
                {data?.branch?.address}
              </Text>
            </Column>
          </Row>

          <Row gap={4} flexWrap="wrap" marginTop={8}>
            {data?.treatmentDoctorFileArr?.map((item, index) => {
              return <Certificate item={item} key={item._id} />;
            })}
          </Row>
        </Column>
      </Row>
    </TouchableOpacity>
  )
}

export default ItemDoctor


const styles = StyleSheet.create({
  btnChat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2
  },
  avatar: {
    width: 8 * 6,
    height: 8 * 6,
    borderRadius: 8 * 6 / 2,
  },
  card: {
    width: _widthScale(280),
    paddingVertical: 8,
    paddingHorizontal: 8 * 1,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: .5,
    borderColor: 'rgba(0,0,0,.3)',
    marginLeft: _moderateScale(8 * 2)
  },
})
