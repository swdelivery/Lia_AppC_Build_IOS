import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from "react-redux";
import { _moderateScale } from '../../Constant/Scale';

const IconTabUser = props => {

    const stateRedux = useSelector(state => state.userReducer) 


    return (
        <View>
            <Image
                style={{
                    width: _moderateScale(22),
                    height: _moderateScale(22),
                    borderRadius:_moderateScale(11),
                    marginTop:_moderateScale(2)
                }}
                source={{ uri: `https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/104112421_1996173593847855_4902466515527279857_n.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=WVyAM2aj-hYAX9hAeMS&_nc_ht=scontent.fvca1-1.fna&oh=a6f97caf5eb0d3b035ebbef1aa136c71&oe=60261412` }} />
        </View>
    );
};



export default IconTabUser;