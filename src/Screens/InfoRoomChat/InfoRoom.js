import React, { memo, useEffect } from 'react';
import { StyleSheet ,ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import { BG_BEAUTY } from '../../Constant/Color';


const InfoRoom = memo((props) => {

    const dispatch = useDispatch()

   

    useEffect(() => {
    }, [])

    return (
        <ScrollView style={[styles.container]}>


        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})

export default InfoRoom;