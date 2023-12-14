import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Column from '@Components/Column'
import { BG_BEAUTY } from '@Constant/Color'
import { useSelector } from 'react-redux'
import { getServiceGroupState } from '@Redux/home/selectors'
import BtnMenu from './BtnMenu'

const ListServiceGroup = () => {
  const { data: dataServiceGR } = useSelector(getServiceGroupState);
  const [menuChoice, setMenuChoice] = useState('');

  const _handleChoiceMenu = (flag) => {
    setMenuChoice(flag)
  }

  return (
    <Column
      backgroundColor={BG_BEAUTY}
      width={80}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        {
          dataServiceGR?.map((item, index) => {
            return (
              <BtnMenu
                key={item?._id}
                onPress={_handleChoiceMenu}
                flag={item?.code}
                isActive={menuChoice == item?.code}
                title={item?.name} />
            )
          })
        }
      </ScrollView>
    </Column>
  )
}

export default ListServiceGroup

const styles = StyleSheet.create({})
