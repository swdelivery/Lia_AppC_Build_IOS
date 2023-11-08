import Image from "@Components/Image";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import ScreenKey from "@Navigation/ScreenKey";
import { selectDoctor } from "@Redux/doctor/actions";
import { Doctor } from "@typings/doctor";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  item: Doctor;
};

export default function DoctorItem({ item }: Props) {
  const { navigation } = useNavigate();
  const dispatch = useDispatch();

  const handleDoctorPress = useCallback(() => {
    dispatch(selectDoctor(item));
    navigation.navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item._id });
  }, []);

  return (
    <Pressable
      key={item?._id}
      onPress={handleDoctorPress}
      style={styles.doctorItem}
    >
      <Image style={styles.image} avatar={item.avatar} />
      <Text weight="bold" size={12} top={4}>
        {item.name}
      </Text>
      <CountStar2
        size={10}
        rating={item.averageRating}
        count={item.reviewCount}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  doctorItem: {
    width: 100,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
});
