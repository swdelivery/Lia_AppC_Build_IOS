import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Icon from '@Components/Icon'
import { IconEarth } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY } from '@Constant/Color'
import { Post } from "@typings/newfeeds"
import moment from 'moment'
import React from 'react'

type Props = {
  data: Post
};

const AvatarName = ({ data }: Props) => {
  return (
    <Row
      gap={8 * 2}
      marginTop={8 * 2}
      marginHorizontal={8 * 2}>
      <Avatar
        size={8 * 5}
        circle
        avatar={data?.partner?.fileAvatar} />
      <Column
        flex={1}
        gap={4}>
        <Text weight='bold' >
          {data?.partner?.name}
        </Text>
        <Row
          gap={4}>
          {
            data?.scope == 'PUBLIC' ?
              <IconEarth />
              :
              <Icon size={16} color={GREY} name='lock-outline' />
          }
          <Text size={12} >
            {moment(data?.created).fromNow()}
          </Text>
        </Row>
      </Column>
    </Row>
  )
}

export default AvatarName
