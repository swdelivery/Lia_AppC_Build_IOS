import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CardBooking from '@Components/Booking/CardBooking'

const ListBookings = () => {

    const [listBookings, setListBookings] = useState([1, 2, 3, 4, 5])

    const _renderItem = () => {
        return (
            <CardBooking />
        )
    }

    return (
        <FlatList
            data={listBookings}
            contentContainerStyle={styles.styleContent}
            renderItem={_renderItem}
            keyExtractor={(item, index) => item._id}
        />
    )
}

export default ListBookings

const styles = StyleSheet.create({
    styleContent: { gap: 8, paddingTop: 8 * 2, paddingBottom: 8 * 10 }
})