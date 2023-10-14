import React, { memo } from 'react';
import { Text } from 'react-native';
import { randomStringFixLengthCode } from '../../../Constant/Utils';

const Demo = (props) => {
    return (
        <Text>
            {`${props.title.content} : ${randomStringFixLengthCode(10)}`}
        </Text>
    );
}



export default memo(Demo);