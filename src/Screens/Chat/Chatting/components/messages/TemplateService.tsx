import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Message } from '@typings/chat';
import { _moderateScale, _widthScale } from '@Constant/Scale';
import { BG_GREY_OPACITY_5, BLUE_FB, BORDER_COLOR, GREY_FOR_TITLE, PRICE_ORANGE, WHITE } from '@Constant/Color';
import Text from '@Components/Text';
import Column from '@Components/Column';
import Image from '@Components/Image';
import { formatMonney } from "@Constant/Utils";
import { useNavigate } from 'src/Hooks/useNavigation';
import ScreenKey from '@Navigation/ScreenKey';
import { styleElement } from '@Constant/StyleElement';

type Props = { item: Message };

const TemplateService = ({ item }: Props) => {
  const { navigate } = useNavigate()
  console.log({ item });

  const { template: { data: { fileAvatar, name, price, description, _id } } } = item


  return (
    <View>
      <TouchableOpacity style={styles.main}>
        <Column gap={8 * 2}>
          <Column>
            <Image
              style={styles.image}
              avatar={fileAvatar} />
          </Column>
          <Column gap={8 * 2}>
            <Column gap={4}>
              <Text color={GREY_FOR_TITLE} weight='bold'>
                {name}
              </Text>
              <Text weight='bold' color={PRICE_ORANGE}>
                {formatMonney(price)}
              </Text>
              <Text>
                {description}
              </Text>
            </Column>

            <Column>
              <TouchableOpacity
                onPress={navigate(ScreenKey.DETAIL_SERVICE, { service: { _id: _id } })}
                style={[styles.btnDetail]}>
                <Text weight='bold'>
                  Chi tiết
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={navigate(ScreenKey.CREATE_BOOKING, {})}
                style={[styleElement.centerChild, styles.btnBooking]}>
                <Text weight='bold' color={BLUE_FB}>
                  Đặt lịch
                </Text>
              </TouchableOpacity>
            </Column>

          </Column>
        </Column>
      </TouchableOpacity>
    </View>
  )
}

export default TemplateService

const styles = StyleSheet.create({
  btnBooking: {
    borderTopWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_5,
    paddingVertical: _moderateScale(8)
  },
  btnDetail: {
    borderColor: BORDER_COLOR,
    paddingVertical: _moderateScale(8),
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: _moderateScale(8 * 24),
    borderRadius: _moderateScale(8),
  },
  main: {
    width: _moderateScale(8 * 24),
    borderRadius: _moderateScale(8),
    overflow: 'hidden',
    backgroundColor: WHITE,
    margin: 8 * 2,
    marginBottom: 8
  }
})