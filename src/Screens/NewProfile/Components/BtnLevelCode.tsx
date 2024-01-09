import React from "react";
import Text from "@Components/Text";
import { BASE_COLOR } from "@Constant/Color";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Column from "@Components/Column";

type Props = {
  name: string;
  bgColor: string;
};

const BtnLevelCode = ({ name, bgColor }: Props) => {
  const { navigate } = useNavigate();

  return (
    <Column
      gap={8}
      onPress={navigate(ScreenKey.NEW_AFFILIATE)}
      backgroundColor={"white"}
      borderRadius={16}
      paddingHorizontal={8}
      paddingBottom={2}
      alignSelf="flex-start"
    >
      <Text size={14} weight="bold" color={BASE_COLOR}>
        {name}
      </Text>
    </Column>
  );
};

export default BtnLevelCode;
