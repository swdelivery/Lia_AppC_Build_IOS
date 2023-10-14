import React, { memo, useEffect, useState } from 'react';
import { ScrollView,Text, StyleSheet, View } from 'react-native';
import Header from '../../Components/Header/Header';
import { BG_BEAUTY, WHITE } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';
import { getListTreatmentDiary } from '../../Redux/Action/Diary';
import ItemDiary from './Components/ItemDiary';
import { useSelector, useDispatch } from 'react-redux';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { stylesFont } from '../../Constant/Font';




const index = memo((props) => {
    const dispatch = useDispatch()

    const [listPayment, setListPayment] = useState([])

    useEffect(() => {
        dispatch(getListTreatmentDiary({
            limit: 1000,
            page: 1
        }))
    }, [])

    const diary = useSelector(state => state?.diaryReducer?.listTreatmentDiary)
    // console.log({diary})

    return (
        <View style={styles.container}>
            <StatusBarCustom/>
            <Header title={"Danh sách Điều trị"} />
            { diary?.length>0?
            <ScrollView contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8) }}>
                {
                  
                    diary?.map((item, index) => {
                        return (
                            <ItemDiary data={item} key={item?._id} />
                        )
                    })
                    
                }
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