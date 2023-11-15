import { StyleSheet, View } from 'react-native'
import React from 'react'
import Row from '@Components/Row'
import Text from '@Components/Text'


type Props = {
    status: string;
    // other props
}

const StatusBooking = ({ status }: Props) => {

    const _renderTextStatusBooking = (status: string) => {
        switch (status) {
            case "WAITING":
                return `Chưa Check in`

            default:
                return ``
        }
    }
    const _renderColor = (status: string) => {
        switch (status) {
            case "WAITING":
                return `red`

            default:
                return ``
        }
    }

    return (
        <View>
            <Row gap={8}>
                <View style={[styles.dot, { backgroundColor: _renderColor(status) }]} />
                <Text weight='bold' color={_renderColor(status)}>{_renderTextStatusBooking(status)}</Text>
            </Row>
        </View>
    )
}

export default StatusBooking

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        top:1.5
    }
})