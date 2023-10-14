import React, { memo } from 'react';
import { Text } from 'react-native';
import { randomStringFixLengthCode } from '../Constant/Utils';



const FlatListMemo = ((props) => {
    return (
        <Text>
            {`${props.data}${randomStringFixLengthCode(10)}`}
        </Text>
    );
});



export default memo(FlatListMemo);