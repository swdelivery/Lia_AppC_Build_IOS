import React, { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import PractitionerItem from "./components/PractitionerItem";
import { useDispatch, useSelector } from "react-redux";
import { getPractitionerList } from "@Redux/practitioner/actions";
import { getPractitionerListState } from "@Redux/practitioner/selectors";

const SoYoungPractitioner = memo(() => {
  const dispatch = useDispatch();
  const { data } = useSelector(getPractitionerListState);

  useEffect(() => {
    dispatch(getPractitionerList.request());
  }, []);

  return (
    <>
      {data?.length > 0 ? (
        <View style={styles.container}>
          {data?.map((item, index) => {
            return <PractitionerItem key={item._id} item={item} />;
          })}
        </View>
      ) : (
        <View style={{ height: _height }} />
      )}
    </>
  );
});

export default SoYoungPractitioner;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
    width: 220,
  },
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  start2: {
    width: 8 * 1,
    height: 8 * 1,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: _width - 8 * 2,
    paddingVertical: 8,
    paddingHorizontal: 8 * 1,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    paddingHorizontal: 8 * 1,
    backgroundColor: "#F5F9FA",
    paddingBottom: 30,
    minHeight: _height,
  },
});
