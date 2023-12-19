import { View, Text } from 'react-native'
import React from 'react'
import Column from '@Components/Column'

type Props = {
  height: number;
};

const BlankView = ({ height }: Props) => {
  return (
    <Column height={height} />
  )
}

export default BlankView
