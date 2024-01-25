import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { getDetailCampainState } from '@Redux/charity/selectors'
import React, { useCallback, useState } from 'react'
import { TabBar, TabView } from 'react-native-tab-view'
import { useSelector } from 'react-redux'
import Header from './Components/Header'
import ListImages from './ListImages'
import ListVideos from './ListVideos'

const ListImageVideo = () => {
  const { data: { representationFileArr } } = useSelector(getDetailCampainState)
  const [routes] = useState([
    { key: 'first', title: 'Hình ảnh' },
    { key: 'second', title: 'Video' },
  ]);
  const [index, setIndex] = useState(0);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ListImages data={representationFileArr} />
      case 'second':
        return <ListVideos data={representationFileArr} />
      default:
        return null;
    }
  };
  const renderTabBar = useCallback((props) => {
    return (
      <TabBar
        tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
        {...props}
        indicatorStyle={{ backgroundColor: NEW_BASE_COLOR }}
        style={{
          backgroundColor: WHITE,
        }}
        inactiveColor="grey"
        activeColor={NEW_BASE_COLOR}
        getLabelText={({ route }) => route.title}
      />
    )
  }, [])

  return (
    <Screen>
      <FocusAwareStatusBar barStyle={'ligh-content'} />
      <Header title='Ảnh/Video' />
      <TabView
        renderTabBar={renderTabBar}
        swipeEnabled={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        lazy
      />
    </Screen>
  )
}

export default ListImageVideo
