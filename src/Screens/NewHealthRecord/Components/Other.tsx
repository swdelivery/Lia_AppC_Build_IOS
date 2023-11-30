import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { _moderateScale } from '@Constant/Scale'
import { BORDER_COLOR, WHITE } from '@Constant/Color'

const Other = ({ otherIllness, setOtherIllness }) => {
  return (
    <View>
      <Column marginHorizontal={8 * 2}>
        <Text weight='bold'>Bệnh lý khác</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={otherIllness}
            onChangeText={text => setOtherIllness(text)}
            placeholder={"Nhập các bệnh lý khác"}
            multiline
            scrollEnabled={false}
            style={{
              flex: 1,
              fontSize: _moderateScale(14),
            }}
          />
        </View>
      </Column>
    </View>
  )
}

export default Other

const styles = StyleSheet.create({
  inputContainer: {
    minHeight: _moderateScale(8 * 10),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginTop: _moderateScale(8),
    borderRadius: _moderateScale(8),
    padding: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
    backgroundColor: WHITE
  },
})
