import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import RenderHTML from '../../Components/RenderHTML/RenderHTML'
import { _moderateScale } from '@Constant/Scale'

const Introduce = (props) => {

    const {infoMaterial} = props

    return (
      <View style={styles.container}>
        <RenderHTML data={infoMaterial?.introduction} />
      </View>
    );
}

export default Introduce

const styles = StyleSheet.create({
  container: { paddingHorizontal: _moderateScale(8 * 2), paddingBottom: 30 },
});