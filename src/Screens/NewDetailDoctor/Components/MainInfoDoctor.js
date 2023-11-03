import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'

const MainInfoDoctor = memo((props) => {

    const { infoDoctor } = props;

    return (
        <View style={styles.container}>

            <Text style={{
                fontSize: _moderateScale(14),
                fontWeight: 'bold',
                marginBottom: _moderateScale(8 * 1)
            }}>
                Thông tin Bác sĩ
            </Text>

            <View style={{ height: 0 }} />
            <Text style={{ color: 'grey' ,fontSize:_moderateScale(14)}}>
                {infoDoctor?.description}
            </Text>

        </View>
    )
})

export default MainInfoDoctor

const styles = StyleSheet.create({
    iconChat: {
        width: _moderateScale(8 * 2),
        height: _moderateScale(8 * 2)
    },
    avatarDoctor: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2)
    },
    doctorCard: {
        minWidth: _widthScale(200),
        borderRadius: _moderateScale(8),
        marginRight: _moderateScale(8),
        backgroundColor: "#F7F8FA",
        flexDirection: 'row',
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8)
    },
    name: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold'
    },
    avatarBranch: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2),
        resizeMode: 'contain',
    },
    container: {
        width: _width,
        paddingVertical: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: _moderateScale(8 * 1),
    }
})