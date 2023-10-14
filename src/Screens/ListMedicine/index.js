import React, { memo, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import Header from '../../Components/Header/Header';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { BASE_COLOR, BG_BEAUTY, SECOND_COLOR, WHITE, GREY } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';
import ItemMedicine from './Components/ItemMedicine';

import { getMedicalPrescription } from '../../Redux/Action/InfoAction';
import { styleElement } from '../../Constant/StyleElement';
import { stylesFont } from '../../Constant/Font';


const index = memo((props) => {
    const dispatch = useDispatch()

    const medicalPrescriptionRedux = useSelector(state => state?.infoReducer?.medicalPrescription)



    useEffect(() => {
        // dispatch(getMedicalPrescription())
    }, [])

    console.log('medicalPrescriptionRedux', medicalPrescriptionRedux)

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={BASE_COLOR} />
            <Header title={`Đơn thuốc`} keyGoBack={props?.route?.params?.keyGoBack}
                styleTit={{ color: WHITE }}
                backStyle={`white`}
                styleCus={{ backgroundColor: BASE_COLOR }} />

            {
                medicalPrescriptionRedux?.length > 0 ?
                    <ScrollView contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8) }}>
                        {
                            medicalPrescriptionRedux?.map((item, index) => {
                                return (
                                    <ItemMedicine data={item} key={item?._id} />
                                )
                            })
                        }
                        <View style={{ height: 50 }} />
                    </ScrollView>
                    :
                    <View style={[{ flex: 1 }, styleElement.centerChild]}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                            Dữ liệu trống
                                    </Text>
                    </View>
            }

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