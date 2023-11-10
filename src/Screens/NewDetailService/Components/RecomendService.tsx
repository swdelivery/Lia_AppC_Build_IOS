import { StyleSheet } from "react-native";
import React from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { getServiceByGroupsListState } from "@Redux/service/selectors";
import { useSelector } from "react-redux";
import HorizontalServicesV2 from "@Components/HorizontalServicesV2";

const RecomendService = () => {

  const { data } = useSelector(getServiceByGroupsListState);

  console.log({abc:data});
  

  return (
    <HorizontalServicesV2
      title="Có thể bạn sẽ quan tâm"
      items={data}
      containerStyle={styles.container}
    />
  );
};

export default RecomendService;

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.25,
    height: 8 * 1.25,
    marginLeft: 1,
    resizeMode: "contain",
  },
  rcmService: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
  },
  container: {
    width: _widthScale(360),
    minHeight: 200,
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(8),
    padding: _moderateScale(8 * 2),
  },
});
