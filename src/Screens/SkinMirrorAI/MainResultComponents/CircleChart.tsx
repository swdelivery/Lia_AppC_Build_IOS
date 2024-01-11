import Column from '@Components/Column';
import Icon from '@Components/Icon';
import Row from '@Components/Row';
import Spacer from '@Components/Spacer';
import Text from '@Components/Text';
import { GREY, NEW_BASE_COLOR, RED, WHITE } from '@Constant/Color';
import { _width } from '@Constant/Scale';
import { styleElement } from '@Constant/StyleElement';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Popover from 'react-native-popover-view';
import Svg, { Circle, G, Line, Polygon, Text as SVGText } from 'react-native-svg';
import useVisible from 'src/Hooks/useVisible';

const WIDTH_DEVICE = _width

const CircleChart = () => {
  const visiblePopover = useVisible()
  const x1 = WIDTH_DEVICE / 2 - 20; // left corner
  const y1 = 200; // bottom corner
  const x2 = WIDTH_DEVICE / 2 + 20; // right corner
  const y2 = 200; // bottom corner
  const x3 = WIDTH_DEVICE / 2; // top corner
  const y3 = 0; // top corner

  const [listData, setListData] = useState([
    { name: 'Khô', condition: 'high' },
    { name: 'Lão hoá', condition: 'dangerous' },
    { name: 'Mụn', condition: 'high' },
    { name: 'Nám', condition: 'medium' },
    { name: 'Tàn nhan', condition: 'dangerous' },
    { name: 'Săn chắc', condition: 'high' },
    { name: 'Vết chân chim', condition: 'normal' },
    { name: 'Bọng mỡ', condition: 'dangerous' },
    { name: 'Nhạy cảm', condition: 'high' },
    { name: 'Quầng thâm', condition: 'normal' },
  ])

  const _generateY3 = useCallback((condition) => {
    switch (condition) {
      case 'normal':
        return 130
      case 'medium':
        return 100
      case 'high':
        return 70
      case 'dangerous':
        return 40

      default:
        break;
    }
  }, [])

  const _generateColorCondition = useCallback((condition) => {
    switch (condition) {
      case 'normal':
        return '#039FDD'
      case 'medium':
        return "#71974C"
      case 'high':
        return "#D44725"
      case 'dangerous':
        return RED

      default:
        break;
    }
  }, [])

  const _generateNameByCondition = useCallback((condition) => {
    switch (condition) {
      case 'normal':
        return 'Bình thường'
      case 'medium':
        return 'Chú ý'
      case 'high':
        return "Cao"
      case 'dangerous':
        return "Nguy hiểm"

      default:
        break;
    }
  }, [])

  return (
    <Column>
      <Row marginHorizontal={8 * 2} justifyContent='space-between'>
        <Text
          weight='bold'
          color={NEW_BASE_COLOR}>
          TÌNH TRẠNG DA
        </Text>
        <Popover
          onRequestClose={visiblePopover.hide}
          isVisible={visiblePopover.visible}
          from={() => (
            <TouchableOpacity
              hitSlop={styleElement.hitslopMd}
              onPress={visiblePopover.show}>
              <Icon color={NEW_BASE_COLOR} name='information-outline' />
            </TouchableOpacity>
          )}>
          <Column padding={8 * 2}>
            <Text>
              Công nghệ A1 Smart chụp các thông tin chi tiết về làn da của bạn. Công nghệ tiên tiến này sử dụng máy ảnh độ phân giải cao 16 megapixel để chụp ảnh khuôn
            </Text>
          </Column>
        </Popover>
      </Row>

      <Column
        marginTop={8 * 2}
        marginHorizontal={8 * 2}>
        <Text>
          Kết quả phân tích cho thấy bạn có bề mặt da tương đối tốt, tuy nhiên có nhiều điểm cần lưu ý như độ lão hoá, tàn nhan và bọng mỡ. Cần khắc phục để có một làn da khoẻ đẹp. Hãy xem biểu đồ bên dưới để nắm rõ hơn.
        </Text>
      </Column>

      <Spacer top={8 * 2} />
      <View style={{ height: 400 }}>
        <Svg height={'100%'} width={'100%'}>

          <Circle
            cx={WIDTH_DEVICE / 2}
            cy={200}
            r={160}
            opacity={.5}
            fill={'none'}
            strokeDasharray={[5]}
            stroke={NEW_BASE_COLOR}
            strokeWidth=".5" />
          <Circle
            cx={WIDTH_DEVICE / 2}
            cy={200}
            r={130}
            opacity={.5}
            fill={'none'}
            strokeDasharray={[5]}
            stroke={NEW_BASE_COLOR}
            strokeWidth=".5" />
          <Circle
            cx={WIDTH_DEVICE / 2}
            cy={200}
            r={100}
            opacity={.5}
            fill={'none'}
            strokeDasharray={[5]}
            stroke={NEW_BASE_COLOR}
            strokeWidth=".5" />

          <Circle
            cx={WIDTH_DEVICE / 2}
            cy={200}
            r={70}
            opacity={.5}
            fill={'none'}
            strokeDasharray={[5]}
            stroke={NEW_BASE_COLOR}
            strokeWidth=".5" />

          {
            listData?.map((item, index) => {
              return (
                <G transform={`rotate(${index * 360 / listData?.length} ${WIDTH_DEVICE / 2} ${200})`}>
                  <Polygon
                    opacity={.5}
                    points={`${x1},${y1} ${x2},${y2} ${x3},${_generateY3(item?.condition)}`}
                    fill={NEW_BASE_COLOR}
                  />
                  <Circle
                    cx={x3}
                    cy={_generateY3(item?.condition)}
                    r={2}
                    fill={NEW_BASE_COLOR}
                    stroke={NEW_BASE_COLOR}
                    strokeWidth=".5" />
                  <Line x1={WIDTH_DEVICE / 2} y1={40} x2={WIDTH_DEVICE / 2} y2={200} strokeDasharray={[5]} opacity={.5} stroke={NEW_BASE_COLOR} strokeWidth=".5" />
                  <Circle
                    cx={x3}
                    cy={40}
                    r={4}
                    fill={WHITE}
                    // stroke={NEW_BASE_COLOR}
                    stroke={_generateColorCondition(item?.condition)}
                    strokeWidth="2" />
                  <G transform={`rotate(${360 - index * 36} ${x3} ${25})`}>
                    <SVGText
                      // x={index < 5 ? x3 : x3 + 8 * 5}
                      x={x3}
                      y={index == 0 ? 25 : index < 3 ? 25 - 8 : index > 7 ? 25 - 8 : 25 + 8}
                      fontWeight={'bold'}
                      // textAnchor={index == 0 || index == listData?.length / 2 ? 'middle' : index < 5 ? 'start' : 'end'}
                      textAnchor='middle'
                      // fill={NEW_BASE_COLOR}
                      fill={_generateColorCondition(item?.condition)}
                      fontSize="10">
                      {item?.name}
                    </SVGText>
                  </G>
                </G>
              )
            })
          }
          <Circle cx={WIDTH_DEVICE / 2} cy={200} r={25} fill={WHITE} stroke={NEW_BASE_COLOR} strokeWidth="4" />
        </Svg>
      </View>

      <Column marginHorizontal={8 * 2}>
        {
          ['normal', 'medium', 'high', 'dangerous']?.map((item, index) => {
            return (
              <Row gap={8}>
                <Column borderRadius={4} width={8 * 10} height={8 * 2} backgroundColor={_generateColorCondition(item)} />
                <Text>
                  {_generateNameByCondition(item)}
                </Text>
              </Row>
            )
          })
        }
      </Column>

      <Text
        style={{ marginVertical: 8 * 2, marginBottom: 8 * 4 }}
        alignSelf='center'
        size={12}
        fontStyle='italic'
        color={GREY}>
        Kết quả kiểm tra có thể thay đổi tuỳ theo góc chụp/ ánh sáng
      </Text>



    </Column>
  )
}

export default CircleChart

const styles = StyleSheet.create({})
