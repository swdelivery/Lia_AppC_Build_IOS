import { convertImageCoordsToDeviceCoords } from "../common";

test("Convert image coords to device coords - image ratio is bigger than device ratio", () => {
  const [x, y] = convertImageCoordsToDeviceCoords([100, 50], 200, 100, 60, 80);
  expect(x).toBe(30);
  expect(y).toBe(40);
});
