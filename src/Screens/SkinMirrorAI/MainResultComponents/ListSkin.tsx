import Column from '@Components/Column'
import LinearGradient from '@Components/LinearGradient'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import ScreenKey from '@Navigation/ScreenKey'
import React, { useCallback, useState } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

const DEMO_HTML_DATA = '<p><strong>Da dư dưới mắt</strong> là tình trạng lão hóa các mô xung quanh mắt hình thành rãnh nếp nhăn. Sau đó, lượng mỡ hỗ trợ mắt sẽ di chuyển vào mí mắt, gây ra bọng mắt dưới. Ngoài ra, chất lỏng cũng có thể tích tụ làm tăng độ sưng của bọng mắt.</p><p><strong><u>Nguyên nhân da dư và mỡ dư nhiều</u></strong><br>- Lão hóa: Bọng mắt có thể là cảnh báo cơ thể đang già đi. Cơ bắp và các dây chằng trở nên yếu đi theo tuổi tác, khiến vùng da dưới mắt chảy xệ. Mỡ sẽ tích tụ bên dưới mắt và khiến chúng trông sưng húp. Những bọng mắt này có thể trở nên rõ hơn nữa khi chủ nhân của nó rơi vào căng thẳng hoặc ốm đau.<br>- Di truyền: Nếu bọng mắt là tài sản được thừa kế. Một số người sẽ có bọng mắt bất kể già hay trẻ vì họ có điều này trong gene. Nếu bọng mắt đã là một di sản trong gia đình, bạn có thể có bọng mắt ngay cả khi vẫn còn rất trẻ.<br>- Dị ứng: Dị ứng có thể là câu trả lời cho túi dưới mắt. Tiếp xúc với một số chất gây dị ứng có thể dẫn đến viêm mắt. Điều này cũng sẽ đi kèm với kích ứng, sưng, ngứa. Ngứa có thể khiến người bệnh dụi mắt và sẽ dẫn đến sự phát triển của bọng mắt. Nếu dị ứng là nguyên nhân cơ bản của bọng mắt, người bệnh sẽ gặp các triệu chứng khác, chẳng hạn như chảy nước mắt, nghẹt mũi và đau xung quanh cung mắt và má.<br>- Thay đổi nội tiết: Khi cơ thể trải qua thay đổi nội tiết tố có thể phát triển bọng mắt. Sự thay đổi nội tiết tố dẫn đến tình trạng ứ nước dưới mắt, từ đó sẽ làm tăng bọng mắt. Điều này khá phổ biến ở phụ nữ trong thời kỳ mang thai và kinh nguyệt. Nếu bọng mắt là di truyền thì thay đổi nội tiết tố làm nó trầm trọng hơn.<br>- Nạp vào cơ thể quá nhiều natri và… rượu: Ăn thực phẩm giàu natri (muối) cũng sẽ góp phần vào sự phát triển của bọng mắt vì muối có xu hướng giữ nước. Đối với rượu thì hơi khác nhưng hậu quả lại giống nhau, uống quá nhiều rượu làm mất nước cơ thể và làm cho các mô dưới mắt yếu đi và nhão.</p><p><strong><u>Cách khắc phục tình trạng da dư và mỡ dư nhiều</u></strong></p><p><strong>Thuốc</strong><br>Nếu bạn nghĩ mình bị sưng dưới mắt là do dị ứng, hãy hỏi bác sĩ về các loại thuốc dị ứng theo toa. Nhiều phương pháp điều trị nếp nhăn khác nhau được sử dụng để cải thiện sự xuất hiện của bọng mắt. Chúng bao gồm laser tái tạo bề mặt da, lột da bằng hóa chất và tiêm xoá nhăn giúp cải thiện da, căng da và trẻ hóa phần da dưới mắt.</p><p><strong>Điều trị nếp nhăn quanh mắt</strong><br>Một số phương pháp giúp xóa tan nếp nhăn và bọng mắt được áp dụng phổ biến hiện nay đó là dùng tia laser để tái tạo bề mặt da, dùng filler, lột da hóa học, trẻ hóa và làm săn chắc làn da ở khu vực bọng mắt.</p><p><strong>Phẫu thuật mí mắt</strong><br>Phụ thuộc vào nguyên nhân gây bọng mắt là gì mà bệnh nhân có thể lựa chọn biện pháp phẫu thuật phù hợp với tình trạng của bản thân. Bác sĩ sẽ tiến hành loại bỏ phần mỡ thừa để bọng mắt giảm đi cảm giác nặng nề, đem lại vẻ đẹp trẻ trung tự nhiên cho đôi mắt. Bên cạnh sửa lại bọng mắt, phẫu thuật mí mắt cũng giúp khắc phục những tình trạng sau:<br>+ Loại bỏ da thừa trên mí mắt để cải thiện tầm nhìn.<br>+ Mí mắt bị phồng hoặc rộng.<br>+ Da thừa, chùng nhão ở mí mắt dưới.<br>+ Mí mắt dưới sụp nhiều làm xuất hiện phần màu trắng dưới mống mắt.</p>'


const ListSkin = () => {
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

  const { navigate } = useNavigate()

  const _renderItem = useCallback(({ item, index }) => {
    const _handlePress = () => {
      navigate(ScreenKey.SCREEN_HTML, { title: 'Hiểu rõ hơn về da dầu', value: DEMO_HTML_DATA })()
    }

    return (
      <Column
        onPress={_handlePress}
        borderRadius={8}
        overflow='hidden'
        height={8 * 8}
        marginLeft={index % 2 == 0 ? 0 : 8}
        width={(_width - 8 * 5) / 2}>
        <LinearGradient
          horizontal
          style={[StyleSheet.absoluteFillObject, { padding: 8, justifyContent: 'center' }]}
          colors={['#D2F2FD', '#EFFAFE']} >
          <Row gap={8}>
            <Image
              style={styles.image}
              source={{ uri: `https://hvclinic.vn/wp-content/uploads/2021/09/da-dau.jpg` }} />
            <Column flex={1}>
              <Text weight='bold' size={12}>
                {item?.name}
              </Text>
              <Text
                size={12}
                numberOfLines={1}>
                Dưới mỗi lỗ chân lông có một tuyến bã nhờn sản xuất ra các loại dầu tự nhiên (bã nhờn) sẽ giúp cho da ngậm nước và trở nên khỏe mạnh
              </Text>
            </Column>
          </Row>
        </LinearGradient>

      </Column>
    )

  }, [])

  return (
    <Column marginHorizontal={8 * 2}>
      <FlatList
        contentContainerStyle={{ gap: 8 }}
        renderItem={_renderItem}
        scrollEnabled={false}
        numColumns={2}
        data={listData} />
    </Column>
  )
}

export default ListSkin

const styles = StyleSheet.create({
  image: {
    width: 8 * 4,
    height: 8 * 4,
    borderRadius: 8 * 2,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  }
})
