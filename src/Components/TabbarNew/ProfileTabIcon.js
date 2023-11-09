import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import IconIProfile from '../../SGV/i_profile.svg'
import IconAProfile from '../../SGV/a_profile.svg'

import { _moderateScale } from '../../Constant/Scale';

const ProfileTabIcon = memo((props) => {


    return (
        <>
            {
                props?.focused ?
                    <IconAProfile
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
                    :
                    <IconIProfile
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
            }


        </>
    );
});


const styles = StyleSheet.create({

})


export default ProfileTabIcon;