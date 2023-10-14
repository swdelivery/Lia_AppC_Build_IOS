import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { _moderateScale } from '../../Constant/Scale'
import { IconBXH, IconBackWhite, IconEyeBase, IconWallet } from '../../Components/Icon/Icon'
import { stylesFont } from '../../Constant/Font'
import { sizeIcon } from '../../Constant/Icon'
import { navigation } from '../../../rootNavigation'
import ScreenKey from '../../Navigation/ScreenKey'


const ItemF1 = (data) => {
    return (
        <TouchableOpacity 
        onPress={()=>{
            navigation.navigate(ScreenKey.INFO_F1)
        }}
        style={{
            padding:_moderateScale(8*2),
            borderBottomWidth:.5,
            borderColor:'rgba(0,0,0,.2)',
            flexDirection:'row',
            alignItems:'center'
        }}>
            <Text style={[stylesFont.fontNolanBold,{flex:1}]}>
                {data?.indexX + 1}. Nguyễn Văn Anh
            </Text>
            <IconEyeBase style={sizeIcon.sm}/>
        </TouchableOpacity>
    )
}

const ListF1 = () => {


    const _renderItem = ({ item, index }) => {
        return (
            <ItemF1 indexX={index} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: getStatusBarHeight()
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity 
                        onPress={()=>{
                            navigation.goBack()
                        }}
                        >
                            <IconBackWhite />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            Danh sách người đã giới thiệu
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                </View>
            </View>
            <FlatList
                renderItem={_renderItem}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                keyExtractor={(item, index) => index}
                ListFooterComponent={()=>{
                    return(
                        <View style={{height:100}}/>
                    )
                }}
            />
            <Text>ListF1</Text>
        </View>
    )
}

export default ListF1

const styles = StyleSheet.create({
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})