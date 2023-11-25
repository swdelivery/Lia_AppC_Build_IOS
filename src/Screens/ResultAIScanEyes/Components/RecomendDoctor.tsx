import Column from '@Components/Column'
import Text from '@Components/Text'
import { getDoctorByResScanningListState } from '@Redux/resultcanningeyes/selectors'
import DoctorItem from '@Screens/SoYoungDoctor/components/DoctorItem'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { GREY_FOR_TITLE } from '../../../Constant/Color'
import { _moderateScale } from '../../../Constant/Scale'

const RecomendDoctor = () => {

    const { dataDoctors } = useSelector(getDoctorByResScanningListState)

    return (
        <View style={styles.main}>
            <View style={styles.child}>
                <LinearGradient
                    style={[StyleSheet.absoluteFill, styles.linear]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={["#C4E5FC", "white"]}
                />
                <Column margin={8 * 2}>
                    <Text size={16} weight='bold' color={GREY_FOR_TITLE}>
                        Đội ngũ bác sĩ sẵn sàng tư vấn miễn phí
                    </Text>
                </Column>
                <View style={{ alignItems: 'center' }}>
                    {
                        dataDoctors?.map((item, index) => {
                            return (
                                <DoctorItem item={item} />
                            )
                        })
                    }
                </View>



            </View>
        </View>
    )
}

export default RecomendDoctor


const styles = StyleSheet.create({
    linear: {
        zIndex: -1,
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8)
    },
    child: {
        width: '100%',
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8)
    },
    main: { marginTop: _moderateScale(4) }
})
