import React, { memo, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Components/Header/Header';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { BASE_COLOR, BG_BEAUTY, GREY, SECOND_COLOR, WHITE } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';
import { getAssets, getServiceMaterials } from '../../Redux/Action/OrtherAction';
import ItemMaterial from "./Components/ItemMaterial"
import HeaderLeft from '../../Components/HeaderLeft';
import { stylesFont } from '../../Constant/Font';



const index = memo((props) => {
    const dispatch = useDispatch()

    // const listMaterial = useSelector(state=>state?.ortherReducer?.asset)
    const [refresh, setRefresh] = useState(false)

    const [listServiceMaterials, setListServiceMaterials] = useState([])

    useEffect(() => {
        // dispatch(getAssets({
        //     condition:{
        //         type:{
        //             equal:"materialService"
        //         }
        //     }
        // }))
        _getServiceMaterials()
    }, [])

    const _getServiceMaterials = async () => {
        let result = await getServiceMaterials(props?.route?.params?.idService)
        if (result?.isAxiosError) return
        setListServiceMaterials(result?.data?.data)

    }

    const _onRefresh = () => {
        setRefresh(true)
        // dispatch(getAssets({
        //     condition:{
        //         type:{
        //             equal:"materialService"
        //         }
        //     }
        // }))
        _getServiceMaterials()
        setTimeout(() => {
            setRefresh(false)
        }, 500);
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom />
            {/* <Header title={`Vật liệu`} keyGoBack={props?.route?.params?.keyGoBack} 
            styleTit={{color: WHITE}}
            styleCus={{backgroundColor: SECOND_COLOR}}/> */}
            <HeaderLeft title={"Vật liệu"} />

            {
                listServiceMaterials?.length > 0 ?
                    <>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={() => {
                                        _onRefresh()
                                    }}
                                />
                            }
                            contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8) }}>
                            {
                                listServiceMaterials?.map((item, index) => {
                                    return (
                                        <ItemMaterial data={item} key={item?._id} serviceName={props?.route?.params?.serviceName} />
                                    )
                                })
                            }
                        </ScrollView>
                    </>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                            Chưa có dữ liệu
                        </Text>
                    </View>
            }


            <View style={{ height: 50 }} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})


export default index;