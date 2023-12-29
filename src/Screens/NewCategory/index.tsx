import { IconExpand, IconFilter } from '@Components/Icon/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { clearServiceDataFilter, selectServiceParentCodeGroup } from '@Redux/category/actions'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigationParams } from 'src/Hooks/useNavigation'
import useVisible from 'src/Hooks/useVisible'
import BtnCategory from './Components/BtnCategory'
import BtnChangePrice from './Components/BtnChangePrice'
import BtnFilter from './Components/BtnFilter'
import BtnMostPopular from './Components/BtnMostPopular'
import BtnPopover from './Components/BtnPopover'
import Header from './Components/Header'
import ListServiceGroup from './Components/ListServiceGroup'
import ResultBranch from './Components/ResultBranch'
import ResultDoctor from './Components/ResultDoctor'
import ResultMaterial from './Components/ResultMaterial'
import ResultPractitioner from './Components/ResultPractitioner'
import ResultService from './Components/ResultService'
import ModalFilter from './ModalFilter'
import { BASE_COLOR } from "@Constant/Color";


const NewCategory = () => {
  const dispatch = useDispatch()
  const [categoryChoice, setCategoryChoice] = useState('service');
  const visibleModalFilter = useVisible()
  const { parentCodeParam } = useNavigationParams<any>();

  const _handleChoiceCategory = (flag) => {
    setCategoryChoice(flag)
  }

  useEffect(() => {
    return () => {
      dispatch(clearServiceDataFilter())
    };
  }, [])

  useEffect(() => {
    if (parentCodeParam) {
      dispatch(selectServiceParentCodeGroup(parentCodeParam))
    }
  }, [parentCodeParam])

  return (
    <Screen safeBottom>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Header />
      <Row justifyContent="space-between" marginHorizontal={8 * 2}>
        <BtnCategory
          onPress={_handleChoiceCategory}
          flag="service"
          isActive={categoryChoice == "service"}
          title="Dịch vụ"
        />
        <BtnCategory
          onPress={_handleChoiceCategory}
          flag="branch"
          isActive={categoryChoice == "branch"}
          title="Phòng khám"
        />
        <BtnCategory
          onPress={_handleChoiceCategory}
          flag="doctor"
          isActive={categoryChoice == "doctor"}
          title="Bác sĩ"
        />
        <BtnCategory
          onPress={_handleChoiceCategory}
          flag="practitioner"
          isActive={categoryChoice == "practitioner"}
          title="Chuyên viên"
        />
        <BtnCategory
          onPress={_handleChoiceCategory}
          flag="material"
          isActive={categoryChoice == "material"}
          title="Vật liệu"
        />
      </Row>
      <HorizontalLine style={styles.horizontalLine} />
      <Row
        paddingVertical={8}
        justifyContent="space-between"
        paddingHorizontal={8 * 2}
        backgroundColor={BASE_COLOR}
      >
        <BtnPopover
          icon={<IconExpand width={8 * 1.5} height={8 * 1.5} />}
          isActive
          title="Giới thiệu"
        />

        <BtnMostPopular />

        <BtnChangePrice />

        <BtnFilter
          icon={<IconFilter width={8 * 1.5} height={8 * 1.5} />}
          onPress={visibleModalFilter.show}
          title="Bộ lọc"
        />
      </Row>

      <Row flex={1}>
        {/* LEFT MENU */}
        <ListServiceGroup />

        {/* RIGHT RESULT */}
        {categoryChoice == "service" ? <ResultService /> : <></>}
        {categoryChoice == "branch" ? <ResultBranch /> : <></>}
        {categoryChoice == "doctor" ? <ResultDoctor /> : <></>}
        {categoryChoice == "practitioner" ? <ResultPractitioner /> : <></>}
        {categoryChoice == "material" ? <ResultMaterial /> : <></>}
      </Row>

      <ModalFilter
        onClose={visibleModalFilter.hide}
        visible={visibleModalFilter.visible}
      />
    </Screen>
  );
}

export default NewCategory

const styles = StyleSheet.create({
  horizontalLine: {
    backgroundColor: "#C8CCD9",
    height: 4,
    marginTop: 8 * 2
  }
})
