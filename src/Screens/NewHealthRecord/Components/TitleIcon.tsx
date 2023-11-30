import { StyleSheet, View } from 'react-native'
import React from 'react'
import Row from '@Components/Row'
import { IconHeart } from '@Components/Icon/Icon'
import Text from '@Components/Text';


type Props = {
  title: string,
  icon: any
};


const TitleIcon = ({ title, icon }: Props) => {
  return (
    <Row gap={8}>
      {icon}
      <Text weight='bold'>{title}</Text>
    </Row>
  )
}

export default TitleIcon

const styles = StyleSheet.create({})
