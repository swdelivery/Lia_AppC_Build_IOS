import React from "react";
import Row from "@Components/Row";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import { GREEN_SUCCESS, GREY, MAIN_BG, TITLE_GREY } from "@Constant/Color";

type Props = {
  rating: number;
  count?: number;
  size?: 10 | 14 | 16;
  larger?: boolean;
  lightContent?: boolean;
};

const CountStar2 = ({
  rating,
  count,
  size = 14,
  lightContent = false,
}: Props) => {
  if (!rating && !count) {
    return null;
  }

  const iconSize = size + 4;
  return (
    <Row gap={4}>
      <Row gap={-3} top={3}>
        <Icon
          name={rating >= 1 ? "star-box" : "star-box-outline"}
          color={rating >= 1 ? GREEN_SUCCESS : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 2 ? "star-box" : "star-box-outline"}
          color={rating >= 2 ? GREEN_SUCCESS : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 3 ? "star-box" : "star-box-outline"}
          color={rating >= 3 ? GREEN_SUCCESS : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 4 ? "star-box" : "star-box-outline"}
          color={rating >= 4 ? GREEN_SUCCESS : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 5 ? "star-box" : "star-box-outline"}
          color={rating >= 5 ? GREEN_SUCCESS : TITLE_GREY}
          size={iconSize}
        />
      </Row>
      {!!count && (
        <Text color={lightContent ? "white" : "black"} size={size}>
          {`(${count})`}
        </Text>
      )}
    </Row>
  );
};

export default CountStar2;
