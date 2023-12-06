import Column from '@Components/Column';
import LiAHeader from "@Components/Header/LiAHeader";
import HorizontalLine from '@Components/Line/HorizontalLine';
import Screen from '@Components/Screen';
import { FocusAwareStatusBar } from '@Components/StatusBar';
import { WHITE } from '@Constant/Color';
import { getPartnerDiary } from '@Redux/newfeeds/actions';
import { getInfoPostState, getPartnerDiaryState } from '@Redux/newfeeds/selectors';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommentBottom from './Components/CommentBottom';
import AvatarName from './Components/ItemFeed/AvatarName';
import Content from './Components/ItemFeed/Content';
import ListImages from './Components/ItemFeed/ListImages';
import ListDiaries from './Components/PartnerDiary/ListDiaries';
import NameDiary from './Components/PartnerDiary/NameDiary';

const DetailPost = () => {
  const dispatch = useDispatch()

  const { data: dataInfoPost } = useSelector(getInfoPostState)
  const { data: dataPartnerDiary } = useSelector(getPartnerDiaryState)

  useEffect(() => {
    if (dataInfoPost?.template) {
      const { partnerDiaryId } = dataInfoPost?.template?.data
      dispatch(getPartnerDiary.request(partnerDiaryId))
    }
  }, [dataInfoPost?.template])

  return (
    <Screen
      safeBottom
      style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <LiAHeader safeTop title={"Chi tiết bài viết"} />
      <ScrollView>
        <Column
          gap={8 * 2}
          paddingBottom={0}
          backgroundColor={WHITE}>
          <AvatarName data={dataInfoPost} />
          <Content data={dataInfoPost} />
          <ListImages data={dataInfoPost} />
        </Column>
        <HorizontalLine style={styles.line} />
        {
          dataPartnerDiary ?
            <>
              <NameDiary data={dataPartnerDiary} />
              <ListDiaries data={dataPartnerDiary} />
            </>
            : <></>
        }
      </ScrollView>
      <CommentBottom data={dataInfoPost} />
    </Screen>
  )
}

export default DetailPost

const styles = StyleSheet.create({
  line: {
    height: 8,
    marginVertical: 8
  },
  container: {
    backgroundColor: WHITE
  }
})
