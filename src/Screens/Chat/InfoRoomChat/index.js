import React, { memo } from 'react';
import { StyleSheet, View ,ScrollView} from 'react-native';
import * as Color from '../../../Constant/Color';
import Header from './Header';
import ListImagesMember from './ListImageMembers';
import MemberManagement from './MemberManagement';











const index = memo((props) => {
    return (
        <View style={[styles.container]}>
            <Header />
            <ScrollView style={styles.body}>
                <ListImagesMember/>
                <MemberManagement/>
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    }
})


export default index;