import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { IconDoctorBase, IconHospital, IconLocationBase, IconPhoneBase, IconPhoneWhite, IconRightArrow } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { _moderateScale } from '@Constant/Scale'
import { BASE_COLOR, WHITE } from '@Constant/Color'
import Column from '@Components/Column'
import { Doctor } from '@typings/doctor'
import { useDispatch } from 'react-redux'
import { clearDoctor, clearPractitioner, selectDoctor, selectPractitioner } from '@Redux/booking/actions'
import { Alert } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import useDoctorDetailsNavigation from 'src/Hooks/navigation/useDoctorDetailsNavigation'


type Props = {
    data: Doctor;
    onClose: () => void;
};

const CardDoctor = ({ data, onClose }: Props) => {

    const handleNavigateDetailDoctor = useDoctorDetailsNavigation();

    const { navigate } = useNavigate()

    const dispatch = useDispatch()

    const _handleChoiceDoctor = () => {
      if (data?.identification == "doctor") {
        dispatch(selectDoctor(data));
        dispatch(clearPractitioner());
        onClose();
      } else if (data?.identification == "practitioner") {
        dispatch(selectPractitioner(data));
        dispatch(clearDoctor());
        onClose();
      }
    };

    const _handleGoDetail = useCallback(() => {
        if (data?.identification == 'doctor') {
            handleNavigateDetailDoctor(data);
        } else if (data?.identification == 'practitioner') {
            navigate(ScreenKey.DETAIL_PRACTITIONER, { practitioner: data })();
        }
    }, [data])

    return (
        <TouchableOpacity
            onPress={_handleChoiceDoctor}
            activeOpacity={.8} style={[styles.container, shadow]}>
            <Column gap={16}>
                <Row gap={16}>
                    <View style={{
                        width: _moderateScale(8 * 3),
                    }}>
                        <IconDoctorBase style={sizeIcon.lg} />
                    </View>
                    <Text style={{ flex: 1 }} weight='bold'>
                        {data?.name}
                    </Text>
                    <TouchableOpacity onPress={_handleGoDetail}>
                        <Row>
                            <Text style={{ fontStyle: 'italic' }} color={BASE_COLOR} size={12}>
                                Chi tiết
                            </Text>
                            <Text color={BASE_COLOR}>
                                {` >>`}
                            </Text>
                        </Row>
                    </TouchableOpacity>
                </Row>

                <Row gap={16}>
                    <View style={{
                        width: _moderateScale(8 * 3),
                    }}>
                        <IconHospital style={sizeIcon.md} />
                    </View>
                    <Text style={{ flex: 1 }}>
                        {data?.branch?.address}
                    </Text>
                </Row>

            </Column>
        </TouchableOpacity>
    )
}

export default CardDoctor

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8 * 2,
        borderRadius: 8,
        padding: 8 * 2,
        backgroundColor: WHITE
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3
}
