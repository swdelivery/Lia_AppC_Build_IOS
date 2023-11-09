import React, { memo } from 'react';
import { Text } from 'react-native';
import { randomStringFixLengthCode } from '../Constant/Utils';



const Hero = (props) => {
    return (
        <Text>
            {`${props.name} ${randomStringFixLengthCode(10)}`}
        </Text>
    );
}

Hero.propTypes = {

};

export default memo(Hero);