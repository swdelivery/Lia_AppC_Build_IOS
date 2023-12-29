import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import Header from "./Components/Header";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_5,
  BG_GREY_OPACITY_9,
  BLACK_OPACITY_8,
  GREY,
  RED,
  WHITE,
} from "../../Constant/Color";
import RecentFind from "./Components/RecentFind";
import {
  getDataSuggestionSearch,
  getServicev2,
} from "../../Redux/Action/Service";
import { _heightScale, _moderateScale, _width } from "../../Constant/Scale";
import { stylesFont } from "../../Constant/Font";
import Collapsible from "react-native-collapsible";
import { getServiceGroupv2 } from "../../Redux/Action/ServiceGroup";
import { getListBranchV2 } from "../../Redux/Action/BranchAction";
import { getAllDoctorv2, getPractitioner } from "../../Redux/Action/DoctorAction";
import { getEncyclopedia } from "../../Redux/Action/News";
import { styleElement } from "../../Constant/StyleElement";
import ListService from "./Components/ListService";
import ListBranch from "./Components/ListBranch";
import ListDoctor from "./Components/ListDoctor";
import { sizeIcon } from "../../Constant/Icon";
import { getAllProductv2 } from "../../Redux/Action/Product";
import AsyncStorage from "@react-native-community/async-storage";
import Screen from "../../Components/Screen";
import { StatusBar } from "@Components/StatusBar";
import ListPractitioner from "./Components/ListPractitioner";

const NewSearchHome = memo((props) => {
  const [keySearch, setKeySearch] = useState("");
  const [listSG, setListSG] = useState([]);

  const RefScrollView = useRef(null);

  const [currOption, setCurrOption] = useState("DV");
  const [list5Service, setList5Service] = useState([]);
  const [list5Branch, setList5Branch] = useState([]);
  const [list5Doctor, setList5Doctor] = useState([]);
  const [list5Product, setList5Product] = useState([]);
  const [list5Practitioner, setList5Practitioner] = useState([]);
  const [list5Bachkhoa, setList5Bachkhoa] = useState([]);

  const [showResult, setShowResult] = useState(false);

  const [listServiceGrFinded, setListServiceGrFinded] = useState([]);

  const [onlayoutHeightHeaderMain, setOnlayoutHeightHeaderMain] = useState(0);

  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    if (keySearch?.length > 0) {
      _handleGetSuggest(keySearch);
    } else {
      setListSG([]);
      setShowResult(false);
    }
  }, [keySearch]);

  useEffect(() => {
    setIsFirstLoad(true);

    if (props?.route?.params?.keySearch) {
      setKeySearch(props?.route?.params?.keySearch);
      _pressSearch(props?.route?.params?.keySearch);
    }
  }, []);

  const _handleOnchangeSearch = (value) => {
    setKeySearch(value);
  };

  const _handleGetSuggest = async (key) => {
    let result = await getDataSuggestionSearch(key);
    if (result?.isAxiosError) return;
    setListSG(result?.data?.data);
  };

  const _pressSearch = async (key) => {
    // let listHistorySearchKey = []

    // listHistorySearchKey.push(`${key}`);

    let listHistorySearchKey = JSON.parse(
      await AsyncStorage.getItem("listHistorySearchKey")
    );
    // listHistorySearchKey.push(`${key}`)

    if (!listHistorySearchKey) {
      listHistorySearchKey = [];
    }

    listHistorySearchKey.push(`${key}`);

    console.log({ listHistorySearchKey });
    AsyncStorage.setItem(
      "listHistorySearchKey",
      JSON.stringify(listHistorySearchKey)
    );

    setShowResult(true);

    if (key?.length == 0) return;
    let result = await getServiceGroupv2({
      search: key,
    });
    if (result?.isAxiosError) return;
    setListServiceGrFinded(result?.data?.data);

    if (true) {
      let result = await getServicev2({
        sort: {
          orderNumber: -1,
        },
        page: 1,
        search: key,
      });
      if (result?.isAxiosError) return;
      setList5Service(result?.data);
    }
    if (true) {
      let result = await getListBranchV2({
        sort: {
          orderNumber: -1,
        },
        page: 1,
        search: key,
      });
      if (result?.isAxiosError) return;
      setList5Branch(result?.data);
    }
    if (true) {
      let result = await getAllDoctorv2({
        sort: {
          orderNumber: -1,
        },
        page: 1,
        search: key,
      });
      if (result?.isAxiosError) return;
      setList5Doctor(result?.data);
    }
    if (true) {
      let result = await getPractitioner({
        page: 1,
        search: key,
      });
      if (result?.isAxiosError) return;
      setList5Practitioner(result?.data);
    }
    if (true) {
      let result = await getEncyclopedia({
        page: 1,
        search: key,
      });
      if (result?.isAxiosError) return;
      setList5Bachkhoa(result?.data);
    }
    setTimeout(() => {
      RefScrollView.current?.scrollTo({
        y: onlayoutHeightHeaderMain,
        animated: true,
      });
    }, 100);
  };

  useEffect(() => {
    if (currOption && isFirstLoad && keySearch?.length > 0) {
      _getDataByOption(currOption);
    }
  }, [currOption]);

  const _getDataByOption = async (currOption) => {
    if (currOption == "DV") {
      let result = await getServicev2({
        sort: {
          orderNumber: -1,
        },
        page: 1,
        search: keySearch,
      });
      if (result?.isAxiosError) return;
      setList5Service(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
    if (currOption == "PK") {
      let result = await getListBranchV2({
        sort: {
          orderNumber: -1,
        },
        page: 1,
        search: keySearch,
      });
      if (result?.isAxiosError) return;
      setList5Branch(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
    if (currOption == "BS") {
      let result = await getAllDoctorv2({
        sort: {
          orderNumber: -1,
        },
        page: 1,
        search: keySearch,
      });
      if (result?.isAxiosError) return;
      setList5Doctor(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
    if (currOption == "SP") {
      let result = await getAllProductv2({
        page: 1,
        search: keySearch,
      });
      if (result?.isAxiosError) return;
      setList5Product(result?.data);
      setTimeout(() => {
        RefScrollView.current?.scrollTo({
          y: onlayoutHeightHeaderMain,
          animated: true,
        });
      }, 100);
      return;
    }
  };

  const _saveKeySearch = (key) => {
    setKeySearch(key);
  };

  return (
    <Screen style={styles.container} safeTop>
      <StatusBar barStyle="dark-content" />
      <Header
        pressSearch={_pressSearch}
        setKeySearch={setKeySearch}
        value={keySearch}
        onchangeText={_handleOnchangeSearch}
      />

      <Collapsible collapsed={listSG?.length > 0 ? false : true}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: _moderateScale(8 * 2.5),
          }}
        >
          {listSG?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  _pressSearch(item?.content);
                  setKeySearch(item?.content);
                }}
                style={{
                  paddingHorizontal: _moderateScale(8 * 2),
                  paddingVertical: _moderateScale(4),
                  backgroundColor: BASE_COLOR,
                  margin: _moderateScale(8),
                  marginBottom: 0,
                  borderRadius: _moderateScale(8),
                }}
              >
                <Text
                  style={[
                    stylesFont.fontNolanBold,
                    { fontSize: _moderateScale(12), color: WHITE },
                  ]}
                >
                  {item?.content}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Collapsible>

      {showResult ? (
        <View style={styleElement.flex}>
          <View>
            <View>
              <View
                style={[
                  styleElement.rowAliCenter,
                  {
                    width: "100%",
                    height: 50,
                    borderBottomWidth: 1,
                    borderColor: BG_GREY_OPACITY_5,
                    justifyContent: "space-evenly",
                    backgroundColor: WHITE,
                    zIndex: 1,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setCurrOption("DV");
                  }}
                >
                  <Text
                    style={[
                      styles.titleTab,
                      currOption == "DV" && styles.titleTabActive,
                    ]}
                  >
                    Dịch vụ
                  </Text>
                  {currOption == "DV" ? (
                    <View style={styles.lineActive} />
                  ) : (
                    <></>
                  )}
                  {list5Service?.data?.length > 0 ? (
                    <View style={styles.dotCount}>
                      <Text
                        style={{
                          color: WHITE,
                          ...stylesFont.fontNolanBold,
                          fontSize: _moderateScale(12),
                        }}
                      >
                        {list5Service?.data?.length}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setCurrOption("PK");
                  }}
                >
                  <Text
                    style={[
                      styles.titleTab,
                      currOption == "PK" && styles.titleTabActive,
                    ]}
                  >
                    Phòng khám
                  </Text>
                  {currOption == "PK" ? (
                    <View style={styles.lineActive} />
                  ) : (
                    <></>
                  )}
                  {list5Branch?.data?.length > 0 ? (
                    <View style={styles.dotCount}>
                      <Text
                        style={{
                          color: WHITE,
                          ...stylesFont.fontNolanBold,
                          fontSize: _moderateScale(12),
                        }}
                      >
                        {list5Branch?.data?.length}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setCurrOption("BS");
                  }}
                >
                  <Text
                    style={[
                      styles.titleTab,
                      currOption == "BS" && styles.titleTabActive,
                    ]}
                  >
                    Bác sĩ
                  </Text>
                  {currOption == "BS" ? (
                    <View style={styles.lineActive} />
                  ) : (
                    <></>
                  )}
                  {list5Doctor?.data?.length > 0 ? (
                    <View style={styles.dotCount}>
                      <Text
                        style={{
                          color: WHITE,
                          ...stylesFont.fontNolanBold,
                          fontSize: _moderateScale(12),
                        }}
                      >
                        {list5Doctor?.data?.length}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setCurrOption("CV");
                  }}
                >
                  <Text
                    style={[
                      styles.titleTab,
                      currOption == "CV" && styles.titleTabActive,
                    ]}
                  >
                    Chuyên viên
                  </Text>
                  {currOption == "CV" ? (
                    <View style={styles.lineActive} />
                  ) : (
                    <></>
                  )}
                  {list5Practitioner?.data?.length > 0 ? (
                    <View style={styles.dotCount}>
                      <Text
                        style={{
                          color: WHITE,
                          ...stylesFont.fontNolanBold,
                          fontSize: _moderateScale(12),
                        }}
                      >
                        {list5Practitioner?.data?.length}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => {
                    setCurrOption("BK");
                  }}
                >
                  <Text
                    style={[
                      styles.titleTab,
                      currOption == "BK" && styles.titleTabActive,
                    ]}
                  >
                    Bách khoa
                  </Text>
                  {currOption == "BK" ? (
                    <View style={styles.lineActive} />
                  ) : (
                    <></>
                  )}
                  {list5Bachkhoa?.data?.length > 0 ? (
                    <View style={styles.dotCount}>
                      <Text
                        style={{
                          color: WHITE,
                          ...stylesFont.fontNolanBold,
                          fontSize: _moderateScale(12),
                        }}
                      >
                        {list5Bachkhoa?.data?.length}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity> */}
              </View>
            </View>
          </View>

          <ScrollView>
            {currOption == "DV" ? (
              <>
                <View style={{ height: _moderateScale(8) }} />
                {list5Service?.data?.length > 0 ? (
                  <></>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: _heightScale(100),
                    }}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: GREY,
                        fontStyle: "italic",
                      }}
                    >
                      Chưa có dữ liệu
                    </Text>
                  </View>
                )}
                <ListService data={list5Service} />
              </>
            ) : (
              <></>
            )}
            {currOption == "PK" ? (
              <>
                <View style={{ height: _moderateScale(8) }} />
                {list5Branch?.data?.length > 0 ? (
                  <>
                  </>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: _heightScale(100),
                    }}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: GREY,
                        fontStyle: "italic",
                      }}
                    >
                      Chưa có dữ liệu
                    </Text>
                  </View>
                )}
                <View style={{ height: _moderateScale(8) }} />
                <ListBranch data={list5Branch} />
              </>
            ) : (
              <></>
            )}
            {currOption == "BS" ? (
              <>
                <View style={{ height: _moderateScale(8) }} />
                {list5Doctor?.data?.length > 0 ? (
                  <>
                  </>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: _heightScale(100),
                    }}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: GREY,
                        fontStyle: "italic",
                      }}
                    >
                      Chưa có dữ liệu
                    </Text>
                  </View>
                )}
                <View style={{ height: _moderateScale(8) }} />
                <ListDoctor data={list5Doctor} />
              </>
            ) : (
              <></>
            )}
            {currOption == "CV" ? (
              <>
                <View style={{ height: _moderateScale(8) }} />
                {list5Practitioner?.data?.length > 0 ? (
                  <>
                  </>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: _heightScale(100),
                    }}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: GREY,
                        fontStyle: "italic",
                      }}
                    >
                      Chưa có dữ liệu
                    </Text>
                  </View>
                )}
                <View style={{ height: _moderateScale(8) }} />
                <ListPractitioner data={list5Practitioner} />
              </>
            ) : (
              <></>
            )}

            {currOption == "BK" ? (
              <>
                <View style={{ height: _moderateScale(8) }} />
                {list5Bachkhoa?.data?.length > 0 ? (
                  <View
                    style={{
                      alignItems: "flex-end",
                      paddingHorizontal: _moderateScale(8 * 2),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(ScreenKey.LIST_ALL_ENCYCLOPEDIA);
                      }}
                      style={[styleElement.rowAliCenter]}
                    >
                      <Text
                        style={{
                          ...stylesFont.fontNolan500,
                          fontSize: _moderateScale(14),
                          color: BLACK_OPACITY_8,
                        }}
                      >
                        Xem tất cả bách khoa
                      </Text>

                      <Image
                        style={sizeIcon.md}
                        source={require("../../Icon/arrowRight_grey.png")}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: _heightScale(100),
                    }}
                  >
                    <Text
                      style={{
                        ...stylesFont.fontNolan500,
                        fontSize: _moderateScale(14),
                        color: GREY,
                        fontStyle: "italic",
                      }}
                    >
                      Chưa có dữ liệu
                    </Text>
                  </View>
                )}
                <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                  {list5Bachkhoa?.data?.map((item, index) => {
                    return <ItemEncyclopedia key={index} data={item} />;
                  })}
                </View>
              </>
            ) : (
              <></>
            )}

            <View style={{ height: 200 }} />
          </ScrollView>
        </View>
      ) : (
        <ScrollView>
          <View style={{}}>
            <RecentFind
              setKeySearch={setKeySearch}
              pressSearch={_pressSearch}
            />
          </View>
        </ScrollView>
      )}
    </Screen>
  );
});

export default NewSearchHome;

const styles = StyleSheet.create({
  dotCount: {
    position: "absolute",
    width: _moderateScale(8 * 2),
    height: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    backgroundColor: RED,
    top: -_moderateScale(8 * 1.2),
    right: -_moderateScale(8),
    ...styleElement.centerChild,
  },
  categoryFinded__text: {
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(14),
  },
  categoryFinded__image: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
    borderWidth: 0.5,
    borderColor: BG_GREY_OPACITY_5,
  },
  categoryFinded: {
    width: (_width - _moderateScale(8 * 2)) / 5,
    height: (_width - _moderateScale(8 * 2)) / 5,
    ...styleElement.centerChild,
    paddingHorizontal: _moderateScale(4),
  },
  input: {
    borderWidth: 1,
    flex: 1,
    marginHorizontal: _moderateScale(8 * 2),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale(4),
    borderColor: BG_GREY_OPACITY_9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8),
  },
  header: {
    height: _moderateScale(8 * 7),
    borderBottomWidth: 2,
    borderColor: BG_GREY_OPACITY_5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8),
  },
  lineActive: {
    height: _moderateScale(2),
    width: "100%",
    backgroundColor: BASE_COLOR,
    position: "absolute",
    bottom: -_moderateScale(6),
    zIndex: 1,
  },
  titleTab: {
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(14),
    letterSpacing: -1,
    opacity: 0.5,
  },
  titleTabActive: {
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(14),
    letterSpacing: -1,
    color: "black",
    opacity: 1,
  },
  inputHeader: {
    width: _moderateScale(8 * 25),
    backgroundColor: BG_GREY_OPACITY_5,
    borderRadius: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    paddingHorizontal: _moderateScale(8 * 1.5),
    fontSize: _moderateScale(14),
    flexDirection: "row",
    alignItems: "center",
  },
  avatarLia: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  wave: {
    width: "100%",
    height: _moderateScale(8 * 4),
    backgroundColor: WHITE,
    borderTopStartRadius: _moderateScale(8 * 3),
    borderTopEndRadius: _moderateScale(8 * 3),
    position: "absolute",
    bottom: -_moderateScale(8 * 2),
  },
});
