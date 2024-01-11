import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import { stylesFont } from "../../../Constant/Font";
import { _moderateScale, _widthScale, _width, _height } from "../../../Constant/Scale";
import {
  WHITE,
  BG_GREY_OPACITY_2,
  BG_GREY_OPACITY_5,
  GREY,
  BLUE_FB,
  GREY_FOR_TITLE,
  PRICE_ORANGE,
  BLACK_OPACITY_7,
  BLACK,
  BASE_COLOR,
} from "../../../Constant/Color";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { URL_ORIGINAL } from "../../../Constant/Url";
import { styleElement } from "../../../Constant/StyleElement";
import { sizeIcon } from "../../../Constant/Icon";
import _isEmpty from "lodash/isEmpty";
import { formatMonney } from "../../../Constant/Utils";
import { cloneDeep } from "lodash";
import { TabView } from "react-native-tab-view";
import RenderHtml from "react-native-render-html";
import { Service } from "@typings/serviceGroup";
import Row from "@Components/Row";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@Components/Icon";
import { TabInfo } from "./Components/TabInfo";
import { TabDescription } from "./Components/TabDescription";

type Props = {
  confirm?: (currChoice, listTopping) => void;
  data?: Service;
  show?: boolean;
  hide?: () => void;
};

const ModalPickToppingNew = ({ confirm, data, show, hide }: Props) => {
  const [routes] = useState([
    { key: "first", title: "Thông tin" },
    { key: "second", title: "Hình ảnh" },
  ]);
  const [index, setIndex] = useState(0);

  const [listChoice, setListChoice] = useState([]);
  const [isCollapDescription, setIsCollapDescription] = useState(false);

  const [currDescriptionTopping, setCurrDescriptionTopping] = useState({});

  useEffect(() => {
    let listChoiceTemp = [];
    data?.options?.map((item) => {
      if (item?.type == "single") {
        if (item?.data?.length > 0) {
          listChoiceTemp.push({ ...item?.data[0], groupCode: item?.groupCode });
        }
      }
    });

    setListChoice(listChoiceTemp);
  }, [data]);

  useEffect(() => {
    if (data?.description?.length > 85) {
      setIsCollapDescription(true);
    } else {
      setIsCollapDescription(false);
    }
  }, [data?.description]);

  const _handleChoiceSingle = (data, groupCode) => {
    console.log({ data, listChoice, groupCode });
    let tempListChoice = cloneDeep(listChoice);

    let indexItem = tempListChoice?.findIndex(
      (item) => item?._id == data?._id && item?.groupCode == data?.groupCode
    );
    if (indexItem !== -1) {
      tempListChoice.splice(indexItem, 1);
    } else {
      tempListChoice = tempListChoice?.filter(
        (itemFilter) => itemFilter?.groupCode !== groupCode
      );
      tempListChoice.push({ ...data, groupCode });
    }
    setListChoice(tempListChoice);
  };

  const _handleChoiceMulti = (data, groupCode) => {
    console.log({ data, listChoice });
    let tempListChoice = cloneDeep(listChoice);

    let indexItem = tempListChoice?.findIndex(
      (item) => item?._id == data?._id && item?.groupCode == data?.groupCode
    );
    if (indexItem !== -1) {
      tempListChoice.splice(indexItem, 1);
    } else {
      tempListChoice.push({ ...data, groupCode });
    }
    setListChoice(tempListChoice);
  };

  const _handleConfirm = () => {
    confirm(data, listChoice);
    hide();
  };

  const _setCurrDescriptionTopping = (data) => {
    setCurrDescriptionTopping(data);
  };

  const _confirmToppingFromTab2 = (data) => {
    if (listChoice?.find((itemFind) => itemFind?._id == data?._id && itemFind?.groupCode == data?.groupCode)) return;

    console.log({ data });
    if (data?.typeOption == "single") {
      _handleChoiceSingle(data, data?.groupCode);
    }
    if (data?.typeOption == "multiple") {
      _handleChoiceMulti(data, data?.groupCode);
    }
  };


  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <TabInfo
            setIsCollapDescription={setIsCollapDescription}
            isCollapDescription={isCollapDescription}
            setCurrDescriptionTopping={_setCurrDescriptionTopping}
            setIndex={setIndex}
            _handleConfirm={_handleConfirm}
            _handleChoiceSingle={_handleChoiceSingle}
            _handleChoiceMulti={_handleChoiceMulti}
            listChoice={listChoice}
            data={data}
            onCancel={hide}
          />
        );
      case "second":
        return (
          <TabDescription
            confirmTopping={_confirmToppingFromTab2}
            setIndex={setIndex}
            currDescriptionTopping={currDescriptionTopping}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      style={{
        margin: 0,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
      isVisible={show}
      useNativeDriver={true}
      coverScreen={Platform.OS == "ios" ? true : true}
      backdropTransitionOutTiming={0}
      onModalShow={() => { }}
      onModalHide={() => {
        setListChoice([]);
      }}
      onBackButtonPress={() => {
        hide();
      }}
      onBackdropPress={() => {
        hide();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "position" : null}
        enabled
      >
        <View style={styles.container}>
          <Column flex={1}>
            {
              data && (
                <TabView
                  renderTabBar={() => <View></View>}
                  swipeEnabled={false}
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  lazy
                />
              )
            }
          </Column>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnBranch__nameBranch: {
    flex: 1,
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(14),
    color: GREY_FOR_TITLE,
  },
  btnBranch: {
    backgroundColor: BG_GREY_OPACITY_2,
    borderRadius: _moderateScale(8),
    marginBottom: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
  },
  backAndTitle: {
    paddingHorizontal: _moderateScale(8 * 2),
    paddingTop: _moderateScale(8 * 2),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  btnConfirm: {
    marginHorizontal: _moderateScale(8 * 2),
    backgroundColor: BLUE_FB,
    paddingVertical: _moderateScale(6),
    marginTop: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: _width,
    height: _height,
    backgroundColor: WHITE,
  },
  styleBtnConfirm: {
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BASE_COLOR,
    flex: 1,
  },
});

export default ModalPickToppingNew;
