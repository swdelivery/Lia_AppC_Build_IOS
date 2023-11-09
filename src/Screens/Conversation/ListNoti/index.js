import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import ItemNoti from './Components/ItemNoti'
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationForPartner } from '../../../Redux/Action/NotificationAction';


const index = memo((props) => {
    const dispacth = useDispatch()

    const listAllNotiRedux = useSelector(state => state.notificationReducer.listAllNoti)


    useEffect(()=>{
        dispacth(getNotificationForPartner({
            limit:20
        }))
    },[])

    return (
        <View>
            {
                listAllNotiRedux?.map((item, index) => {
                    return (
                        <ItemNoti data={item} 
                        // active={index == 0} 
                        key={index} />
                    )
                })
            }
        </View>
    );
});



export default index;