import React, { memo } from 'react';
import { Text } from 'react-native';



const HeaderFlastList = (props) => {

    return (
        <Text style={{ color: 'red' }}>
            {`${props.title}`}
        </Text>
    );
}


 
export default memo(HeaderFlastList);