import Column from '@Components/Column'
import { WHITE } from '@Constant/Color'
import { Post } from "@typings/newfeeds"
import React from 'react'
import AvatarName from './AvatarName'
import CommentLike from './CommentLike'
import Content from './Content'
import CountCommentLike from './CountCommentLike'
import DiaryBox from './DiaryBox'
import ListImages from './ListImages'
import PreviewComment from './PreviewComment'

type Props = {
  data: Post
};

const ItemFeed = ({ data }: Props) => {

  return (
    <Column
      gap={8 * 2}
      paddingBottom={0}
      backgroundColor={WHITE}>
      <AvatarName data={data} />
      <Content data={data} />
      <ListImages data={data} />
      <DiaryBox data={data} />
      <CountCommentLike data={data} />
      <CommentLike data={data} />
      {/* <PreviewComment data={data} /> */}

    </Column>
  )
}

export default ItemFeed

