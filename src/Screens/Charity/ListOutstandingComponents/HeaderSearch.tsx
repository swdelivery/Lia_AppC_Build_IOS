import { IconBackBlue, IconFindGrey } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import TextInput from "@Components/TextInput";
import { BORDER_COLOR } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { styleElement } from '@Constant/StyleElement'
import React from 'react'
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  value: string;
  setValue: (value) => void;
};

const HeaderSearch = ({ value, setValue }: Props) => {
  const { navigation } = useNavigate()

  return (
    <Row
      gap={8 * 2}
      paddingHorizontal={8 * 2}>
      <TouchableOpacity onPress={navigation.goBack}>
        <IconBackBlue />
      </TouchableOpacity>
      <Row
        gap={8}
        paddingHorizontal={8 * 2}
        borderWidth={1}
        borderRadius={8}
        borderColor={BORDER_COLOR}
        flex={1}>
        <IconFindGrey style={sizeIcon.md} />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder='Tìm kiếm'
          style={[styleElement.flex, styles.textInput]} />
      </Row>
    </Row>
  )
}

export default HeaderSearch

const styles = StyleSheet.create({
  textInput: {
    height: 8 * 5
  }
})
