import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import { BASE_COLOR, BG_GREY_OPACITY_7, BORDER_COLOR, GREY } from '@Constant/Color'
import { IconIsChecked, IconNotChecked } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'

type Props = {
    isTicked: boolean
}

const SquareTick = ({ isTicked }: Props) => {

    return (
        <>
            {
                isTicked ?
                    <TouchableOpacity>
                        <IconIsChecked style={sizeIcon.lg}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <IconNotChecked style={sizeIcon.lg}/>
                    </TouchableOpacity>
            }
        </>
    )
}

export default SquareTick

const styles = StyleSheet.create({
    inActive: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 3 / 2),
        borderWidth: 2,
        borderColor: BG_GREY_OPACITY_7,
    },
    active__child: {
        width: _moderateScale(8 * 2),
        height: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8 * 2 / 2),
        backgroundColor: BASE_COLOR,
    },
    active: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 3 / 2),
        borderWidth: 2,
        borderColor: BASE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    }

})