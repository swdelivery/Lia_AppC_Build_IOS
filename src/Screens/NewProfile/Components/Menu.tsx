import Column from '@Components/Column'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY_FOR_TITLE, WHITE } from '@Constant/Color'
import { _moderateScale, _width } from '@Constant/Scale'
import ScreenKey from '@Navigation/ScreenKey'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

const WIDTH_BOX = _width - 8 * 4;


type Props = {
  title: string,
  data: any;
  type: string
};

const Menu = ({ title, data, type }: Props) => {

  return (
    <View
      style={styles.container}>
      <Column>
        <Text margin={8 * 2} weight='bold'>
          {title}
        </Text>
        <HorizontalLine />
        {
          type == 'row' ?
            <Row flexWrap='wrap'>
              {
                data?.map((item, index) => {
                  return (
                    <BtnIcon
                      horizontal={false}
                      name={item?.name}
                      icon={item?.icon}
                      flag={item?.flag} />
                  )
                })
              }
            </Row>
            :
            <Column>
              {
                data?.map((item, index) => {
                  return (
                    <BtnIcon
                      lasted={index + 1 == data?.length}
                      horizontal={true}
                      name={item?.name}
                      icon={item?.icon}
                      flag={item?.flag} />
                  )
                })
              }
            </Column>
        }

      </Column>

    </View>
  )
}

const BtnIcon = ({ name = '', icon = null, horizontal = false, lasted = null, flag = null }) => {

  const { navigate } = useNavigate()

  const _handleOnpress = () => {
    switch (flag) {
      case 'lia-voucher':
        return navigate(ScreenKey.LIA_VOUCHER)()
      case 'lia-wallet':
        return navigate(ScreenKey.INFO_WALLET_NEW_AFFILIATE)()
      case 'payment':
        return navigate(ScreenKey.PURCHASE_DEPOSIT_REQUEST)()
      case 'list-medicine':
        return navigate(ScreenKey.LIST_MEDICINE)()
      case 'treatment-history':
        return navigate(ScreenKey.LIST_ALL_HISTORY_TREATMENT)()
      case 'list-booking':
        return navigate(ScreenKey.LIST_BOOKING)()
      case 'policy':
        return navigate(ScreenKey.SCREEN_HTML, { title: name, code: "CSBH" })()
      case 'protect':
        return navigate(ScreenKey.SCREEN_HTML, { title: name, code: "CSBM" })()
      default:
        break;
    }
  }

  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={_handleOnpress}>
        <Row padding={8 * 2} gap={8 * 2}>
          <View>
            {icon}
          </View>
          <View >
            <Text color={GREY_FOR_TITLE} size={_moderateScale(13)}>
              {name}
            </Text>
          </View>
        </Row>
        {
          !lasted && <HorizontalLine />
        }
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        onPress={_handleOnpress}
        style={styles.btn}>
        <View style={styles.btn_icon}>
          {icon}
        </View>
        <View style={styles.btn_text}>
          <Text color={GREY_FOR_TITLE} style={{ textAlign: 'center' }} size={_moderateScale(13)}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    )

  }
}

export default Menu

const styles = StyleSheet.create({
  btn_text: {
    position: 'absolute',
    top: 8 * 7
  },
  btn_icon: {
    position: 'absolute',
    top: 8 * 2.5
  },
  btn: {
    width: WIDTH_BOX / 4,
    height: WIDTH_BOX / 4,
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 8 * 2,
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingBottom: 4
  }
})
