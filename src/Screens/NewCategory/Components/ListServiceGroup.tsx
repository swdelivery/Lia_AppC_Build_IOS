import Column from '@Components/Column'
import { BG_BEAUTY } from '@Constant/Color'
import { selectServiceParentCodeGroup } from '@Redux/category/actions'
import { getDataFilterServiceState } from '@Redux/category/selectors'
import { getServiceGroupState } from "@Redux/service/selectors";
import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BtnMenu from './BtnMenu'

const ListServiceGroup = () => {
  const dispatch = useDispatch()
  const { data: dataServiceGR } = useSelector(getServiceGroupState);
  const { dataServiceParentCodeGroup } = useSelector(getDataFilterServiceState);

  const _handleChoiceMenu = useCallback((item) => () => {
    dispatch(selectServiceParentCodeGroup(item))
  }, [])

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
                onPress={_handleChoiceMenu(item)}
                flag={item?.code}
                isActive={dataServiceParentCodeGroup?.code == item?.code}
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
