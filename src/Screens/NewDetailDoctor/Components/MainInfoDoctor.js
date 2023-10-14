import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'

const MainInfoDoctor = memo(() => {
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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
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