import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '@Components/Screen'
import Header from '@Components/NewHeader/Header'
import ListBookings from './ListBookings'
import { useDispatch, useSelector } from 'react-redux'
import { getStateActionSheetBottom } from '@Redux/modal/selectors'
import ActionSheetBottom from '@Components/ModalBottom/ActionSheetBottom'
import { openActionSheetBottom } from '@Redux/modal/actions'

const NewListBookings = () => {
    const dispatch = useDispatch()

    const { showActionSheetBottom } = useSelector(getStateActionSheetBottom)

    console.log({ showActionSheetBottom });

    const _handleOnCloseActionSheetBottom = () => {
        dispatch(openActionSheetBottom({
            flag: false,
            data: {}
        }))
    }

    const _handleConfirm = (data) => {
        console.log({ data });
    }

    return (
        <Screen>
            <ActionSheetBottom
                onConfirm={_handleConfirm}
                indexRed={1}
                options={[
                    { name: 'Chỉnh sửa lịch hẹn', type: 'edit' },
                    { name: 'Huỷ lịch hẹn', type: 'cancel' },
                ]}
                onClose={_handleOnCloseActionSheetBottom}
                visible={showActionSheetBottom?.flag} />

            <Header title={'Danh sách đặt hẹn'} />
            <ListBookings />
        </Screen>
    )
}

export default NewListBookings

const styles = StyleSheet.create({})