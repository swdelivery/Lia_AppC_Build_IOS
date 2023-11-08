import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { sizeIcon } from '../../Constant/Icon';
import * as ActionType from "../../Redux/Constants/ActionType";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { _moderateScale } from "../../Constant/Scale";
import { GREEN_SUCCESS, RED } from "../../Constant/Color";
import ModalRemoveMessage from "../Message/ModalRemoveMessage";

const AlarmNotifi = memo((props) => {
  const dispatch = useDispatch();

  const listAllNotiRedux = useSelector(
    (state) => state.notificationReducer.listAllNoti
  );

  const _handleShowAllNoti = () => {
    dispatch({
      type: ActionType.SHOW_LIST_ALL_NOTI,
      payload: {
        data: true,
      },
    });
  };

  return (
    <TouchableOpacity onPress={_handleShowAllNoti}>
      {listAllNotiRedux?.length > 0 && !listAllNotiRedux?.[0]?.seenAt ? (
        <View style={styles.dot} />
      ) : (
        <></>
      )}
      <Image
        style={[sizeIcon.lllg]}
        source={require("../../Image/header/alarm.png")}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
    dot: {
        width: _moderateScale(8 * 1.25),
        height: _moderateScale(8 * 1.25),
        borderRadius: _moderateScale(8 * 1.25 / 2),
        backgroundColor: GREEN_SUCCESS,
        position: 'absolute',
        right: _moderateScale(2),
        top: _moderateScale(2),
        zIndex: 1,
        backgroundColor:RED
    }
})

export default AlarmNotifi;