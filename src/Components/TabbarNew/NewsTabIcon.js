import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import IconINews from '../../SGV/i_news.svg'
import IconANews from '../../SGV/a_news.svg'

import { _moderateScale } from '../../Constant/Scale';

const NewsTabIcon = memo((props) => {


    return (
        <>
            {
                props?.focused ?
                    <IconANews
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
                    :
                    <IconINews
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
            }


        </>
    );
});


const styles = StyleSheet.create({

})


export default NewsTabIcon;