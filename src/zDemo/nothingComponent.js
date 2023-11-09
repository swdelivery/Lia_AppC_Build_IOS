import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { randomStringFixLengthCode } from '../Constant/Utils';

const nothingComponent = memo((props) => {

    console.log({alo:'a'});
    

    return (
        <View>
            <Text>
                {props?.data?.content}--{randomStringFixLengthCode(3)}
            </Text>
            {
                !isEmpty(props?.data?.repCmts) ? 
                    <>
                        {
                            props?.data?.repCmts?.map((item, index) => {
                                return(
                                    <Text style={{marginLeft:40}}>
                                        {item?.content}--{randomStringFixLengthCode(3)}
                                    </Text>
                                )
                            })
                        }
                    </>
                    :
                    <></>
            }
        </View>
    );
});



export default nothingComponent;