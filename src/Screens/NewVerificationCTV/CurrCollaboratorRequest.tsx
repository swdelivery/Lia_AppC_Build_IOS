import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconTick } from '@Components/Icon/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { BASE_COLOR, BLUE_FB, GREEN_SUCCESS, GREY_FOR_TITLE, RED } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { URL_ORIGINAL } from '@Constant/Url'
import { getCurrentCollaborator } from '@Redux/Action/Affiilate'
import moment from 'moment'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'
import { useFocused } from 'src/Hooks/useNavigation'

const CurrCollaboratorRequest = () => {
  const [infoCurrentCollab, setInfoCurrentCollab] = useState({})

  useFocused(() => {
    _getCurrentCollaborator()
  })

  const _getCurrentCollaborator = async () => {
    let result = await getCurrentCollaborator()
    setInfoCurrentCollab(result?.data?.data)
  }

  const { status } = infoCurrentCollab

  return (
    <Screen safeBottom>
      <LiAHeader
        safeTop
        title={"Thông tin cộng tác viên"} />

      <ScrollView>
        {
          infoCurrentCollab?._id ?
            <Column
              gap={8 * 3}
              margin={8 * 2}>
              <Column>
                <Row gap={8 * 2}>
                  <Text
                    weight='bold'
                    color={GREY_FOR_TITLE}>
                    Thông tin CMND/CCCD
                  </Text>
                  {
                    status == "ACCEPT" ?
                      <Row gap={4}>
                        <IconTick style={sizeIcon.sm} />
                        <Text
                          color={'#52AD7D'}
                          weight='bold'>
                          Đã duyệt
                        </Text>
                      </Row>
                      : <></>
                  }
                </Row>

                {
                  infoCurrentCollab?.idCard ?
                    <Column
                      marginHorizontal={8}
                      gap={8}>
                      <Column
                        marginTop={8 * 2}
                        gap={4}>
                        <Text>
                          Số CMND/CCCD:
                        </Text>
                        <Text
                          size={16}
                          marginLeft={8}
                          weight='bold'
                          color={BLUE_FB}>
                          {
                            infoCurrentCollab?.idCard?.idNumber
                          }
                        </Text>
                      </Column>
                      <Column gap={4}>
                        <Text>
                          Ngày cấp:
                        </Text>
                        <Text
                          size={16}
                          marginLeft={8}
                          weight='bold'
                          color={BLUE_FB}>
                          {
                            moment(infoCurrentCollab?.idCard?.createdAt).format('DD/MM/YYYY')
                          }
                        </Text>
                      </Column>
                    </Column>
                    : <></>
                }

              </Column>
              <Column>
                <Row gap={8 * 2}>
                  <Column
                    gap={8}
                    alignItems='center'
                    flex={1}>
                    <Image
                      style={styles.image}
                      source={{ uri: `${URL_ORIGINAL}${infoCurrentCollab?.idImages[0]?.link}` }} />
                    <Text>
                      Mặt trước
                    </Text>
                  </Column>
                  <Column
                    gap={8}
                    alignItems='center'
                    flex={1}>
                    <Image
                      style={styles.image}
                      source={{ uri: `${URL_ORIGINAL}${infoCurrentCollab?.idImages[1]?.link}` }} />
                    <Text>
                      Mặt sau
                    </Text>
                  </Column>
                </Row>
              </Column>

              <HorizontalLine />

              <Column gap={8 * 2}>
                <Row gap={8 * 2}>
                  <Text
                    weight='bold'
                    color={GREY_FOR_TITLE}>
                    Thông tin ngân hàng của bạn
                  </Text>
                  {
                    status == "ACCEPT" ?
                      <Row gap={4}>
                        <IconTick style={sizeIcon.sm} />
                        <Text
                          color={'#52AD7D'}
                          weight='bold'>
                          Đã duyệt
                        </Text>
                      </Row>
                      : <></>
                  }

                </Row>

                <Column
                  marginHorizontal={8}
                  gap={8}>
                  <Column gap={4}>
                    <Text>
                      Tên ngân hàng :
                    </Text>
                    <Text
                      size={16}
                      marginLeft={8}
                      weight='bold'
                      color={BLUE_FB}>
                      {
                        infoCurrentCollab?.bankAccount?.bankName
                      }
                    </Text>
                  </Column>
                  <Column gap={4}>
                    <Text>
                      Số tài khoản:
                    </Text>
                    <Text
                      size={16}
                      marginLeft={8}
                      weight='bold'
                      color={BLUE_FB}>
                      {
                        infoCurrentCollab?.bankAccount?.accountNumber
                      }
                    </Text>
                  </Column>
                  <Column gap={4}>
                    <Text>
                      Tên chủ thẻ:
                    </Text>
                    <Text
                      size={16}
                      marginLeft={8}
                      weight='bold'
                      color={BLUE_FB}>
                      {
                        infoCurrentCollab?.bankAccount?.ownerName
                      }
                    </Text>
                  </Column>
                  {
                    infoCurrentCollab?.bankAccount?.bankBranch ?
                      <Column gap={4}>
                        <Text>
                          Tên chi nhánh:
                        </Text>
                        <Text
                          size={16}
                          marginLeft={8}
                          weight='bold'
                          color={BLUE_FB}>
                          {
                            infoCurrentCollab?.bankAccount?.bankBranch
                          }
                        </Text>
                      </Column>
                      : <></>
                  }

                </Column>

              </Column>

              {
                status == "WAIT" ?
                  <Text
                    color={RED}
                    fontStyle='italic'>
                    (*) Yêu cầu cộng tác viên của bạn đang được duyệt.
                  </Text>
                  :
                  <></>
              }
              {
                status == "ACCEPT" ?
                  <Text
                    weight='bold'
                    color={GREEN_SUCCESS}
                    fontStyle='italic'>
                    (*) Duyệt thành công, bạn đã trở thành cộng tác viên của LiA
                  </Text>
                  :
                  <></>
              }


            </Column>
            :
            <></>
        }
      </ScrollView>

    </Screen>
  )
}

export default CurrCollaboratorRequest

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 8 * 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BASE_COLOR
  }
})
