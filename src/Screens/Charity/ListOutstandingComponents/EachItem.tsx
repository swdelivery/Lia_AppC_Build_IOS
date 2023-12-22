import { StyleSheet, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column';
import { _width } from '@Constant/Scale';
import Image from '@Components/Image';
import Avatar from '@Components/Avatar';
import Text from '@Components/Text';
import { Donate } from '@typings/charity';

type Props = {
  data: Donate;
};

const WIDTH_ITEM = _width / 3

const EachItem = ({ data }: Props) => {
  const { partner: { name, fileAvatar } } = data

  return (
    <Column
      paddingHorizontal={4}
      paddingVertical={8}
      flex={1}
      gap={8}
      alignItems='center'>
      <Avatar
        circle
        size={8 * 8}
        avatar={fileAvatar} />
      <Text
        style={{ textAlign: 'center' }}
        numberOfLines={2}
      >
        {name}
      </Text>
    </Column>
  )
}

export default EachItem

const styles = StyleSheet.create({})
