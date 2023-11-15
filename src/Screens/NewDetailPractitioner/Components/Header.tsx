import Avatar from "@Components/Avatar";
import Text from "@Components/Text";
import { _moderateScale, _width, _widthScale } from "@Constant/Scale";
import { Doctor } from "@typings/doctor";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "src/Hooks/useNavigation";
import IconBackBlack from "../../../SGV/backArrBlack.svg";
import Row from "@Components/Row";
import { Practitioner } from "@typings/practitioner";

type Props = {
  scrollY: SharedValue<number>;
  practitioner: Practitioner;
};

export default function Header({ scrollY, practitioner }: Props) {
  const { top } = useSafeAreaInsets();
  const { navigation } = useNavigate();

  const animSizeImg = useAnimatedStyle(() => {
    const interpolateWidth = interpolate(scrollY.value, [0, 1], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    });
    const interpolateOpacity = interpolate(scrollY.value, [0, 100], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    });

    return {
      opacity: interpolateOpacity,
      transform: [
        {
          scale: interpolateWidth,
        },
      ],
    };
  });

  const containerStyle = useMemo(() => {
    return {
      paddingTop: top,
    };
  }, [top]);

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.bg, animSizeImg]} />
      <Row left={16} right={16}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigation.goBack}
          hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
        >
          <IconBackBlack
            width={_moderateScale(8 * 3)}
            height={_moderateScale(8 * 3)}
          />
        </TouchableOpacity>
        <Animated.View style={[styles.content, animSizeImg]}>
          <Avatar size={32} circle avatar={practitioner.avatar} />
          <View>
            <Text size={12} weight="bold">
              {practitioner?.name}
            </Text>
            <Text size={12}>
              {practitioner?.position} <Text color={"grey"}>|</Text>{" "}
              {practitioner?.experience}
            </Text>
          </View>
        </Animated.View>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: _width,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: _moderateScale(8 * 7),
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,.2)",
    paddingBottom: _moderateScale(8),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    gap: 8,
    paddingVertical: 8,
  },
  bg: {
    backgroundColor: "white",
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: _moderateScale(4),
  },
});
