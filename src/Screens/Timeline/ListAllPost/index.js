import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import FlatListAllPost from './FlatListAllPost';
import Header from './Header';

const index = (props) => {

    return (
        <View style={[styles.container]}>
            {/* {
                Platform.OS == 'ios' &&
                <View style={{
                    height: _heightScale(getStatusBarHeight()),
                    backgroundColor: WHITE
                }} />
            } */}
            
            <Header />
            {/* <Text>
                {randomStringFixLengthCode(10)}
            </Text> */}
            <FlatListAllPost />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E9F1'
    }
})

export default memo(index);