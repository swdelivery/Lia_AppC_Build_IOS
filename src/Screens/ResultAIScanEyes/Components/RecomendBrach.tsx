import Column from '@Components/Column'
import Text from '@Components/Text'
import { getBranchByResScanningListState } from '@Redux/resultcanningeyes/selectors'
import BranchItem from '@Screens/SoYoungBranch/components/BranchItem'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { GREY_FOR_TITLE } from '../../../Constant/Color'
import { _moderateScale } from '../../../Constant/Scale'

const RecomendBrach = () => {

    const { dataBranchs } = useSelector(getBranchByResScanningListState)

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
                        Các phòng khám uy tín hàng đầu
                    </Text>
                </Column>
                <View style={{ alignItems: 'center' }}>
                    {
                        dataBranchs?.filter(item => item.isActive).map((item, index) => {
                            return (
                                <BranchItem item={item} key={item?._id} />
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default RecomendBrach

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
    main: {
        paddingHorizontal: _moderateScale(4),
        marginTop: _moderateScale(4)
    },
})
