import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import RenderHTML from '../../Components/RenderHTML/RenderHTML'
import { _moderateScale } from '@Constant/Scale'

const Instruct = (props) => {

    const {infoMaterial} = props

    return (
      <View style={styles.container}>
        <RenderHTML data={infoMaterial?.tutorial} />
      </View>
    );
}

export default Instruct

const styles = StyleSheet.create({
  container: { paddingHorizontal: _moderateScale(8 * 2), paddingBottom: 30 },
});