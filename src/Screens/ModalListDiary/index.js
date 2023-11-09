import React, { memo, useEffect, useState } from 'react';
import { ScrollView,Text, StyleSheet, View } from 'react-native';
import Header from '../../Components/Header/Header';
import { BASE_COLOR, BG_BEAUTY, SECOND_COLOR, WHITE } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';
import { getListTreatmentDiary } from '../../Redux/Action/Diary';
import ItemDiary from './Components/ItemDiary';
import { useSelector, useDispatch } from 'react-redux';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { stylesFont } from '../../Constant/Font';
import { getPartnerDiary } from '../../Redux/Action/PartnerDiary';




const index = memo((props) => {
    const dispatch = useDispatch()

    const [listPayment, setListPayment] = useState([])

    useEffect(() => {
        // dispatch(getPartnerDiary({
        //     limit: 1000,
        //     page: 1
        // }))
    }, [])

    const diary = useSelector(state => state?.partnerDiaryReducer?.listPartnerDiary)

    return (
        <View style={styles.container}>
            <StatusBarCustom/>
            <Header title={"Nhật ký của bạn"} styleTit={{color: WHITE}}
            backStyle={`white`}
            styleCus={{backgroundColor: BASE_COLOR}}/>
            { diary?.length>0?
            <ScrollView contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8) }}>
                {
                  
                    diary?.map((item, index) => {
                        return (
                            <ItemDiary data={item} key={item?._id} />
                        )
                    })
                    
                }
                <View style={{height:_moderateScale(8*4)}}/>
            </ScrollView>
            :
            <View style={{
                flex:1,
                backgroundColor: WHITE,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text 
                style={{...stylesFont.fontNolan500}}
                >Bạn chưa có nhật ký điều trị...</Text>
            </View>}
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