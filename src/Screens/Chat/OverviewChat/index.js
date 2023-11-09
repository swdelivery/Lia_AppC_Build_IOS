import React, { memo } from 'react';
import { RefreshControl, StyleSheet, View ,ScrollView,TouchableOpacity} from 'react-native';
import { useDispatch } from "react-redux";
import * as Color from '../../../Constant/Color';
// ACTION 
import { getLastedMessage } from '../../../Redux/Action/MessageAction';
import Header from './Header';
import ListLastedMessages from './ListLastedMessages';
import ListUsersOnline from './ListUsersOnline';







const index = memo((props) => {
    const dispatch = useDispatch()

    const [refresh, setRefresh] = React.useState(false)
    const _onRefresh = () => {
        setRefresh(true)
        dispatch(getLastedMessage(setRefresh))
    }
    const [isTick, setIsTick] = React.useState(false)


    React.useEffect(() => {
        dispatch(getLastedMessage())
        console.log('CALL API GET LASTED ======');
    }, [])

    return (
        <View style={[styles.container]}>
            <Header />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={_onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}>
                <ListUsersOnline />
                <ListLastedMessages />
            </ScrollView>
           




            {/* <TouchableOpacity onPress={() => {
                setIsTick(!isTick)
            }}>
                <Text>
                    {`${isTick}`}
                </Text>
            </TouchableOpacity> */}
        </View> 
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    }
})

export default index;