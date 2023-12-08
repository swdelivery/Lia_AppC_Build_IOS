import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from "@Components/Screen";
import { getConfigData } from '@Redux/Action/OrtherAction'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import LiAHeader from "@Components/Header/LiAHeader";

const ScreenHTML = (props) => {
  const [data, setData] = useState(null);

  const { code, title, value } = props?.route?.params;

  useEffect(() => {
    if (code) {
      _getConfigDataByCode(code);
    }
  }, [code]);

  useEffect(() => {
    if (value) {
      setData({ value })
    }
  }, [value])

  const _getConfigDataByCode = async (code) => {
    let result = await getConfigData(code);
    if (result?.isAxiosError) return;
    setData(result);
  };

  return (
    <Screen safeBottom>
      <LiAHeader safeTop title={title} />
      <ScrollView style={styles.scrollview}>
        {data?.value && <RenderHTML data={data?.value} />}
      </ScrollView>
    </Screen>
  );
};

export default ScreenHTML

const styles = StyleSheet.create({
  scrollview: {
    padding: 8 * 2
  }
})
