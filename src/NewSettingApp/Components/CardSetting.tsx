import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from "react";
import Text from '@Components/Text';
import Row from '@Components/Row';
import { BG_GREY_OPACITY_7, BORDER_COLOR, GREEN_SUCCESS, WHITE } from '@Constant/Color';
import Column from '@Components/Column';
import OnOffButton from './OnOffButton';
import { _moderateScale } from '@Constant/Scale';


type Props = {
  title: string;
  description: string;
  enabled?: boolean;
  onUpdate?: (value: boolean) => void;
};

const CardSetting = ({ title, description, enabled, onUpdate }: Props) => {
  const handleUpdate = useCallback(
    (value: boolean) => () => {
      onUpdate(value);
    },
    [onUpdate]
  );

  return (
    <Row
      gap={8 * 3}
      backgroundColor={WHITE}
      borderWidth={1}
      borderColor={BORDER_COLOR}
      borderRadius={8}
      padding={8 * 2}
      marginHorizontal={8 * 2}
    >
      <Column flex={1} gap={8}>
        <Text weight="bold">{title}</Text>
        <Text>{description}</Text>
      </Column>
      {enabled ? (
        <TouchableOpacity
          style={styles.btnActive}
          onPress={handleUpdate(false)}
        >
          <View style={styles.btnActive__child} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleUpdate(true)}
          style={styles.btnInActive}
        >
          <View style={styles.btnInActive__child} />
        </TouchableOpacity>
      )}
    </Row>
  );
};

export default CardSetting

const styles = StyleSheet.create({
  btnInActive__child: {
    width: _moderateScale(8 * 2.5),
    height: _moderateScale(8 * 2.5),
    borderRadius: _moderateScale(8 * 1.5),
    backgroundColor: WHITE,
  },
  btnInActive: {
    width: _moderateScale(8 * 5.5),
    height: _moderateScale(8 * 3),
    borderRadius: _moderateScale(8 * 2),
    backgroundColor: BG_GREY_OPACITY_7,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: _moderateScale(2),
  },
  btnActive__child: {
    width: _moderateScale(8 * 2.5),
    height: _moderateScale(8 * 2.5),
    borderRadius: _moderateScale(8 * 1.5),
    backgroundColor: WHITE,
  },
  btnActive: {
    width: _moderateScale(8 * 5.5),
    height: _moderateScale(8 * 3),
    borderRadius: _moderateScale(8 * 2),
    backgroundColor: GREEN_SUCCESS,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: _moderateScale(2),
  },
})
