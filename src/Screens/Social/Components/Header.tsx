import Avatar from '@Components/Avatar'
import { IconAlarmWhite, IconPlusBase } from "@Components/Icon/Icon";
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, NEW_BASE_COLOR, WHITE } from "@Constant/Color";
import SVGFindGrey from "src/SGV/findGrey.svg";
import { getInfoUserReducer } from "@Redux/Selectors";
import { openModalRightNoti } from "@Redux/modal/actions";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Column from "@Components/Column";
import { styleElement } from '@Constant/StyleElement'
import { stylesFont } from '@Constant/Font'
import { getPostSearchSuggestion } from '@Redux/Action/PostAction'
import { getListPosts } from '@Redux/newfeeds/actions'
import useVisible from 'src/Hooks/useVisible'
import Collapsible from 'react-native-collapsible'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import useRequireLoginCallback from 'src/Hooks/useRequireLoginAction'
import TextInput from "@Components/TextInput";

const Header = () => {
  const { navigate } = useNavigate()
  const dispatch = useDispatch();
  const { infoUser } = useSelector(getInfoUserReducer);
  const { top } = useSafeAreaInsets();
  const [listSg, setListSg] = useState([])
  const [textValue, setTextValue] = useState('')

  const visibleListSg = useVisible()

  const _handleShowRightNoti = () => {
    dispatch(openModalRightNoti());
  };

  useEffect(() => {
    _getPostSearchSuggestion("")
  }, [])

  const _getPostSearchSuggestion = async (code) => {
    const result = await getPostSearchSuggestion(code)
    if (result?.isAxiosError) return
    setListSg(result?.data?.data)
  }

  const _handleBlur = useCallback(() => {
    dispatch(getListPosts.request({
      condition: {
      },
      page: 1,
      limit: 10,
      "search": textValue,
    }))
    setTimeout(() => {
      visibleListSg.hide()
    }, 5000);

  }, [textValue])

  const _handleGoToCreatePost = useRequireLoginCallback(() => {
    navigate(ScreenKey.CREATE_NEW_FEED)()
  }, [])
  const _handleGoToMyPage = useRequireLoginCallback(() => {
    navigate(ScreenKey.MY_PERSONAL_PAGE)()
  }, [])

  const ItemSG = useCallback(({ data }) => {
    const _handleSearch = useCallback(() => {
      setTextValue(data?.content)
      dispatch(getListPosts.request({
        condition: {
        },
        page: 1,
        limit: 10,
        "search": data?.content,
      }))
    }, [])

    return (
      <TouchableOpacity onPress={_handleSearch}>
        <Column
          borderRadius={8 * 2}
          paddingVertical={4}
          backgroundColor={WHITE}
          paddingHorizontal={8 * 1.5}>
          <Text
            weight='bold'
            color={NEW_BASE_COLOR}
            size={12}>
            {data?.content}
          </Text>
        </Column>
      </TouchableOpacity>
    )
  }, [listSg])

  return (
    <Column style={styles.container} paddingTop={top}>
      <View style={styles.header__box}>
        <Row gap={8 * 2} paddingHorizontal={8 * 2}>
          <TouchableOpacity onPress={_handleGoToMyPage}>
            <Avatar size={8 * 4} circle avatar={infoUser?.fileAvatar} />
          </TouchableOpacity>
          <View style={styles.containerSearch}>
            <Row gap={8} paddingHorizontal={8}>
              <SVGFindGrey width={18} height={18} />
              <TextInput
                onFocus={visibleListSg.show}
                onBlur={_handleBlur}
                value={textValue}
                onChangeText={setTextValue}
                style={[styleElement.flex, stylesFont.fontNolan500, { paddingVertical: 0 }]}
                placeholder='Nhập thông tin tìm kiếm' />
            </Row>
          </View>

          <TouchableOpacity
            onPress={_handleGoToCreatePost}
            style={styles.containerBtnAdd}>
            <IconPlusBase color={BASE_COLOR} />
          </TouchableOpacity>

          <TouchableOpacity onPress={_handleShowRightNoti}>
            <IconAlarmWhite />
          </TouchableOpacity>
        </Row>
      </View>
      <Collapsible collapsed={!visibleListSg.visible}>
        <Row
          gap={8}
          padding={8 * 2}
          flexWrap='wrap'>
          {
            listSg?.map((item, index) => {
              return (
                <ItemSG data={item} key={index} />
              )
            })
          }
        </Row>
      </Collapsible>


    </Column>
  );
};

export default Header

const styles = StyleSheet.create({
  containerBtnAdd: {
    width: 8 * 3,
    height: 8 * 3,
    borderRadius: 8 * 2,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSearch: {
    backgroundColor: WHITE,
    flex: 1,
    borderRadius: 8,
    height: 8 * 4,
    justifyContent: 'center'
  },
  header__box: {
    height: 50,
    justifyContent: 'center'
  },
  container: {
    backgroundColor: BASE_COLOR
  }
})
