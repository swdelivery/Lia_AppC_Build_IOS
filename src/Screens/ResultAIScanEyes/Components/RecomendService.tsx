import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { getServiceByResScanningListState } from '@Redux/resultcanningeyes/selectors'
import ServiceItem from '@Screens/SoYoungService/components/ServiceItem'
import React, { memo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { GREY_FOR_TITLE } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'

const RecomendService = memo(() => {

    const { dataServices } = useSelector(getServiceByResScanningListState)

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
                        Giải pháp làm đẹp mắt
                    </Text>
                </Column>
                <ScrollView horizontal>
                    <Row flexWrap='wrap'>
                        {
                            dataServices?.map((item, index) => {
                                return (
                                    <Column width={_widthScale(_width / 2)}>
                                        <ServiceItem key={item?._id} item={item} />
                                    </Column>
                                )
                            })
                        }
                    </Row>
                </ScrollView>

            </View>
        </View>
    )
})

export default RecomendService


const styles = StyleSheet.create({
    child: {
        width: '100%',
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8)
    },
    main: { marginTop: _moderateScale(4) },
    linear: {
        zIndex: -1,
        borderTopStartRadius: _moderateScale(8),
        borderTopEndRadius: _moderateScale(8)
    }
})
