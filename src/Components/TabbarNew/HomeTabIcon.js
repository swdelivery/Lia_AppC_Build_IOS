import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import IconIHome from '../../SGV/i_home.svg'
import IconAHome from '../../SGV/a_home.svg'

import { _moderateScale } from '../../Constant/Scale';

const HomeTabIcon = memo((props) => {


    return (
        <>
            {
                props?.focused ?
                    <IconAHome
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
                    :
                    <IconIHome
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
            }


        </>
    );
});


const styles = StyleSheet.create({

})


export default HomeTabIcon;