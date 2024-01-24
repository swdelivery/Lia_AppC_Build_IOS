import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";
import {
  _moderateScale,
  _widthScale,
  _width,
  _height,
} from "../../../Constant/Scale";
import _isEmpty from "lodash/isEmpty";
import { cloneDeep } from "lodash";
import { TabView } from "react-native-tab-view";
import { Service } from "@typings/serviceGroup";
import Column from "@Components/Column";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
    if (show) {
      setListChoice([]);
    }
  }, [show]);

  useEffect(() => {
    if (data?.description?.length > 85) {
      setIsCollapDescription(true);
    } else {
      setIsCollapDescription(false);
    }
  }, [data?.description]);

  const handleChoiceSingle = (data, groupCode) => {
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

  const handleChoiceMulti = (data, groupCode) => {
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

  const handleConfirm = () => {
    confirm(data, listChoice);
    hide();
  };

  const _setCurrDescriptionTopping = (data) => {
    setCurrDescriptionTopping(data);
  };

  const _confirmToppingFromTab2 = (data) => {
    if (
      listChoice?.find(
        (itemFind) =>
          itemFind?._id == data?._id && itemFind?.groupCode == data?.groupCode
      )
    )
      return;
    if (data?.typeOption == "single") {
      handleChoiceSingle(data, data?.groupCode);
    }
    if (data?.typeOption == "multiple") {
      handleChoiceMulti(data, data?.groupCode);
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
            handleConfirm={handleConfirm}
            handleChoiceSingle={handleChoiceSingle}
            handleChoiceMulti={handleChoiceMulti}
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
      visible={show}
      presentationStyle={"pageSheet"}
      onRequestClose={hide}
      animationType="slide"
    >
      <Column flex={1}>
        {data && (
          <TabView
            renderTabBar={() => <View></View>}
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            lazy
          />
        )}
      </Column>
    </Modal>
  );
};

export default ModalPickToppingNew;
