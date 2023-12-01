import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Column from '@Components/Column'
import { BASE_COLOR, BG_GREY_OPACITY_7, BORDER_COLOR, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { stylesFont } from '@Constant/Font'
import TitleIcon from './TitleIcon'
import { IconHeart } from '@Components/Icon/Icon'

const HealthData = ({
  bloodPressure,
  bloodSugar,
  axitUric,
  cholesteron,
  setBloodPressure,
  setBloodSugar,
  setAxitUric,
  setCholesteron
}) => {
  return (
    <Column marginTop={8 * 3} gap={8 * 2} marginHorizontal={8 * 2}>
      <TitleIcon title={"Dữ liệu sức khỏe"} icon={<IconHeart />} />
      <Row gap={8 * 2}>
        <Item
          value={bloodPressure}
          onchangeText={setBloodPressure}
          name="Huyết áp"
          unit="(mmHg)"
        />

        <Item
          value={bloodSugar}
          onchangeText={setBloodSugar}
          name="Đường huyết"
          unit="(mg/dL)"
        />

        <Item
          value={axitUric}
          onchangeText={setAxitUric}
          name="Axit Uric"
          unit="(mg/dL)"
        />

        <Item
          value={cholesteron}
          onchangeText={setCholesteron}
          name="Cholesterol"
          unit="(mg/dL)"
        />
      </Row>
    </Column>
  );
}

export default HealthData

const Item = ({ name = '', unit = '', value, onchangeText }) => {
  return (
    <Column
      backgroundColor={WHITE}
      borderRadius={8}
      height={8 * 13}
      flex={1}
      borderWidth={.5}
      borderColor={BASE_COLOR}>

      <Column flex={1} style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => onchangeText(text)}
          value={value ? `${value}` : ''}
          selectTextOnFocus
          maxLength={5}
          keyboardType={'numeric'}
          placeholderTextColor={BG_GREY_OPACITY_7}
          style={styles.inputContainer__input}
          placeholder='0' />
      </Column>
      <Column
        style={styles.bottomName}
        alignItems='center'>
        <Text size={12}>{name}</Text>
        <Text size={12}>{unit}</Text>
      </Column>
    </Column>
  )
}

const styles = StyleSheet.create({
  inputContainer__input: {
    fontSize: _moderateScale(20),
    ...stylesFont.fontNolanBold,
    color: BASE_COLOR,
    flex: 1,
    textAlign: 'center'
  },
  inputContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 8 * 2,
    width: '100%',
  },
  bottomName: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center'
  }
})
