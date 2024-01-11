import Column from '@Components/Column'
import Text from '@Components/Text'
import { getDoctorsByResEye } from '@Redux/resultcanningeyes/actions'
import { getDoctorByResScanningListState } from '@Redux/resultcanningeyes/selectors'
import DoctorItem from '@Screens/SoYoungDoctor/components/DoctorItem'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { NEW_BASE_COLOR } from '../../../Constant/Color'
import { _moderateScale, _width } from '../../../Constant/Scale'
import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'

const RecomendDoctor = () => {
    const dispatch = useDispatch()
    const { dataDoctors } = useSelector(getDoctorByResScanningListState)

    useEffect(() => {
        requestAnimationFrame(() => {
            dispatch(getDoctorsByResEye.request({}));
        })
    }, [])

    return (
        <AfterTimeoutFragment timeout={500}>
            <Column>
                <Column
                    margin={8 * 2}>
                    <Text
                        color={NEW_BASE_COLOR}
                        weight='bold'>
                        BÁC SĨ / CHUYÊN VIÊN
                    </Text>
                </Column>
                <Column alignItems='center'>
                    {
                        dataDoctors?.slice(0, 3)?.map((item, index) => {
                            return (
                                <DoctorItem
                                    key={item?._id}
                                    styleContainer={{
                                        width: _width - 8 * 4
                                    }}
                                    item={item}
                                />
                            )
                        })
                    }
                </Column>
            </Column>
        </AfterTimeoutFragment>
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
