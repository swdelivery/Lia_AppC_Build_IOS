import React from "react";
import Row from "@Components/Row";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import { BASE_COLOR, TITLE_GREY } from "@Constant/Color";
import { PersonsIcon } from "src/SGV";

type Props = {
  rating: number;
  count?: number;
  countPartner?: number;
  size?: 9 | 10 | 12 | 14 | 16;
  larger?: boolean;
  lightContent?: boolean;
};

const CountStar2 = ({
  rating = 0,
  count = 0,
  countPartner,
  size = 14,
  lightContent = false,
}: Props) => {
  const iconSize = size + 4;
  return (
    <Row gap={size / 5}>
      <Row gap={-3} marginTop={3}>
        <Icon
          name={rating >= 1 ? "star-box" : "star-box-outline"}
          color={rating >= 1 ? BASE_COLOR : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 2 ? "star-box" : "star-box-outline"}
          color={rating >= 2 ? BASE_COLOR : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 3 ? "star-box" : "star-box-outline"}
          color={rating >= 3 ? BASE_COLOR : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 4 ? "star-box" : "star-box-outline"}
          color={rating >= 4 ? BASE_COLOR : TITLE_GREY}
          size={iconSize}
        />
        <Icon
          name={rating >= 5 ? "star-box" : "star-box-outline"}
          color={rating >= 5 ? BASE_COLOR : TITLE_GREY}
          size={iconSize}
        />
      </Row>
      <Text color={lightContent ? "white" : "black"} size={size}>
        {`(${count})`}
      </Text>
      {countPartner !== undefined && (
        <>
          <Text left={4} right={4}>
            |
          </Text>
          <PersonsIcon />
          <Text left={0} size={size}>{`(${countPartner})`}</Text>
        </>
      )}
    </Row>
  );
};

export default CountStar2;
