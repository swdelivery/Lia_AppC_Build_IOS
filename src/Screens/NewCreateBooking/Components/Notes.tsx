import Text from '@Components/Text'
import { BORDER_COLOR } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { selectDescription } from '@Redux/booking/actions'
import { getDataCreateBookingState } from '@Redux/booking/selectors'
import React, { useCallback } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Notes = () => {
  const dispatch = useDispatch();

  const { dataDescription } = useSelector(getDataCreateBookingState);

  const _handleChangeText = useCallback((content) => {
    dispatch(selectDescription(content));
  }, []);

  return (
    <View style={styles.container}>
      <Text size={14} weight="bold">
        Ghi chú
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={_handleChangeText}
          value={dataDescription}
          placeholder={"vd: Tôi muốn xử lí da dư"}
          multiline
          scrollEnabled={false}
          style={{
            flex: 1,
            fontSize: _moderateScale(14),
          }}
        />
      </View>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _moderateScale(8 * 2),
  },
  inputContainer: {
    minHeight: _moderateScale(8 * 10),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginTop: _moderateScale(8),
    borderRadius: _moderateScale(8),
    padding: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
});
