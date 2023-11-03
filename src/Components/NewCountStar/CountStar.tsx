import React from "react";
import Row from "@Components/Row";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import { GREEN_SUCCESS } from "@Constant/Color";

type Props = {
  rating: number;
  count?: number;
  size?: number;
  larger?: boolean;
  lightContent?: boolean;
};

const CountStar2 = ({
  rating,
  count,
  size = 14,
  lightContent = false,
}: Props) => {
  const iconSize = size + 4;
  return (
    <Row gap={4}>
      <Row gap={-3} top={3}>
        <Icon name="star-box" color={GREEN_SUCCESS} size={iconSize} />
        <Icon name="star-box" color={GREEN_SUCCESS} size={iconSize} />
        <Icon name="star-box" color={GREEN_SUCCESS} size={iconSize} />
        <Icon name="star-box" color={GREEN_SUCCESS} size={iconSize} />
        <Icon name="star-box" color={GREEN_SUCCESS} size={iconSize} />
      </Row>

      <Text color={lightContent ? "white" : "black"} size={size}>
        {`(${rating})`}
      </Text>
      {count !== undefined && (
        <>
          <Text color={lightContent ? "white" : "black"} size={size}>
            |
          </Text>
          <Icon
            name="account-multiple"
            size={iconSize}
            color={lightContent ? "white" : "black"}
          />
          <Text color={lightContent ? "white" : "black"} size={size}>
            {`(${count})`}
          </Text>
        </>
      )}
    </Row>
  );
};

export default CountStar2;
