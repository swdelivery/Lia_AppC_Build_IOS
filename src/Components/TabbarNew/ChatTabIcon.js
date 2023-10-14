import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import IconIChat from '../../SGV/i_chat.svg'
import IconAChat from '../../SGV/a_chat.svg'

import { _moderateScale } from '../../Constant/Scale';

const ChatTabIcon = memo((props) => {


    return (
        <>
            {
                props?.focused ?
                    <IconAChat
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
                    :
                    <IconIChat
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
            }


        </>
    );
});


const styles = StyleSheet.create({

})


export default ChatTabIcon;