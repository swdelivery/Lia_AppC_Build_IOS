import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Column from '@Components/Column'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'
import HorizontalLine from '@Components/Line/HorizontalLine'
import { _width } from '@Constant/Scale'
import Row from '@Components/Row'
import { IconProfileBooking, IconProfileCare, IconProfileCoin, IconProfileHistory, IconProfileMedical, IconProfilePayment, IconProfileShield, IconProfileStar } from '@Components/Icon/Icon'

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
                      icon={item?.icon} />
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
                      icon={item?.icon} />
                  )
                })
              }
            </Column>
        }

      </Column>

    </View>
  )
}

const BtnIcon = ({ name = '', icon = null, horizontal = false, lasted = null }) => {

  if (horizontal) {
    return (
      <TouchableOpacity>
        <Row padding={8 * 2} gap={8 * 2}>
          <View>
            {icon}
          </View>
          <View >
            <Text size={12}>
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
      <TouchableOpacity style={styles.btn}>
        <View style={styles.btn_icon}>
          {icon}
        </View>
        <View style={styles.btn_text}>
          <Text style={{ textAlign: 'center' }} size={12}>
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
