import React from "react";
import SVGSetting from "../../SGV/setting.svg";
import SVGPhoneWhite from "../../SGV/phone.svg";
import SVGRightWhite from "../../SGV/rightWhite.svg";
import SVGBackWhite from "../../SGV/backWhite.svg";
import SVGBxh from "../../SGV/bxh.svg";
import SVGWallet from "../../SGV/wallet.svg";
import SVGHelp from "../../SGV/help.svg";
import SVGPolicy from "../../SGV/policy.svg";
import SVGRightArrow from "../../SGV/rightArrow.svg";
import SVGPartnerShip from "../../SGV/partnerShip.svg";
import SVGTeamConnect from "../../SGV/teamConnect.svg";
import SVGCheckOrder from "../../SGV/checkOrder.svg";
import SVGCustomer from "../../SGV/customer.svg";
import SVGDoubleRightArrow from "../../SGV/doubleRightArrow.svg";
import SVGIsChecked from "../../SGV/ischecked.svg";
import SVGNotChecked from "../../SGV/notchecked.svg";
import SVGEyeBase from "../../SGV/eyeBase.svg";
import SVGCashIn from "../../SGV/cashIn.svg";
import SVGCashOut from "../../SGV/cashOut.svg";
import SVGCommision from "../../SGV/commision.svg";
import SVGCrown from "../../SGV/crown.svg";
import SVGBackBase from "../../SGV/backBase.svg";
import SVGBook from "../../SGV/book.svg";
import SVGBrone from "../../SGV/brone.svg";
import SVGSilver from "../../SGV/silver.svg";
import SVGGold from "../../SGV/gold.svg";
import SVGDiamond from "../../SGV/diamond.svg";
import SVGCopy from "../../SGV/copy.svg";
import SVGShare from "../../SGV/share.svg";
import SVGCancelWhite from "../../SGV/cancelWhite.svg";
import SVGDollars from "../../SGV/dollars.svg";
import SVGFindGrey from "../../SGV/findGrey.svg";
import SVGBackGrey from "../../SGV/backGrey.svg";
import SVGMirror from "../../SGV/mirror.svg";
import SVGAffiliate from "../../SGV/affiliate.svg";
import SVGComment from "../../SGV/comment.svg";
import SVGHand from "../../SGV/hand.svg";
import SVGTrash from "../../SGV/trash.svg";
import SVGArrowDown from "../../SGV/arrowDown.svg";
import SVGQRScaner from "../../SGV/qrScaner.svg";
import SVGTick from "../../SGV/tick.svg";
import SVGVoucher from "../../SGV/voucher.svg";
import SVGVoucherGold from "../../SGV/voucherGold.svg";
import SVGChecklistWhite from "../../SGV/checklistWhite.svg";
import SVGHistoryWhite from "../../SGV/historyWhite.svg";
import SVGHelpWhite from "../../SGV/iconHelpWhite.svg";
import SVGCancelGrey from "../../SGV/cancelGrey.svg";
import SVGBtnMission from "../../SGV/btnMission.svg";
import SVGBtnHistory from "../../SGV/btnHistory.svg";
import SVGCoin from "../../SGV/coin.svg";
import SVGArrowRightLarge from "../../SGV/arrowRightLarge.svg";
import SVGIncrease from "../../SGV/increase.svg";
import SVGDecrease from "../../SGV/decrease.svg";
import SVGPlay from "../../SGV/iconPlay.svg";
import SVGHeartWhite from "../../SGV/heartWhite.svg";
import SVGHeartFilled from "../../SGV/heartFilled.svg";
import SVGCommentWhite from "../../SGV/commentWhite.svg";
import SVGLineArrowDown from "../../SGV/lineArrowDown.svg";
import SVGHospital from "../../SGV/hospital.svg";
import SVGPhoneBase from "../../SGV/phoneBase.svg";
import SVGLocationBase from "../../SGV/locationBase.svg";
import SVGDoctorBase from "../../SGV/doctorBase.svg";
import SVGCalendarBase from "../../SGV/calendar.svg";
import SVGPlusGrey from "../../SGV/plusGrey.svg";
import { _moderateScale } from "../../Constant/Scale";
import { SvgProps } from "react-native-svg";

export { default as IconOclock } from "../../SGV/oclock.svg";
export { default as IconLocation } from "../../SGV/locationBase.svg";
export { default as IconPlusBase } from "../../SGV/plusBase.svg";
export { default as IconChat } from "../../SGV/chat.svg";
export { default as IconBooking } from "../../SGV/booking.svg";
export { default as IconMirrorr } from "../../SGV/mirror.svg";
export { default as IconEmpty } from "../../SGV/empty.svg";
export { default as IconArrowRightRed } from "../../SGV/arrowRightRed.svg";
export { default as IconBagFat } from "../../SGV/bongmat.svg";
export { default as IconCurvedArrow } from "../../SGV/curvedArr.svg";
export { default as IconDiary } from "../../SGV/diary.svg";
export { default as IconHeart } from "../../SGV/heart.svg";
export { default as IconHome } from "../../SGV/home.svg";
export { default as IconHandHeart } from "../../SGV/handHeart.svg";
export { default as IconProfileBooking } from "../../SGV/profile_booking.svg";
export { default as IconProfileHistory } from "../../SGV/profile_history.svg";
export { default as IconProfileMedical } from "../../SGV/profile_medical.svg";
export { default as IconProfilePayment } from "../../SGV/profile_payment.svg";
export { default as IconProfileCare } from "../../SGV/profile_care.svg";
export { default as IconProfileCoin } from "../../SGV/profile_coin.svg";
export { default as IconProfileShield } from "../../SGV/profile_shield.svg";
export { default as IconProfileStar } from "../../SGV/profile_star.svg";
export { default as IconProfileWallet } from "../../SGV/profile_wallet.svg";
export { default as IconProfileVoucher } from "../../SGV/profile_voucher.svg";
export { default as IconProfilePayLater } from "../../SGV/profile_payLater.svg";
export { default as IconProfileInsurance } from "../../SGV/profile_insurance.svg";
export { default as IconProfileHandHeartIn } from "../../SGV/profile_handHeartIn.svg";
export { default as IconProfileEducation } from "../../SGV/profile_education.svg";
export { default as IconProfileFindJob } from "../../SGV/profile_findJob.svg";
export { default as IconProfileLoveCare } from "../../SGV/profile_loveCare.svg";
export { default as IconProfilePolicy } from "../../SGV/profile_policy.svg";
export { default as IconProfileProtect } from "../../SGV/profile_protect.svg";
export { default as IconProfilePartnerShip } from "../../SGV/profile_partnership.svg";

export const IconSetting = (props) => {
  return <SVGSetting width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
    height={
      props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
    } />;
};

export const IconPhoneWhite = (props) => {
  return <SVGPhoneWhite width={props?.width} height={props?.height} />;
};

export const IconRightWhite = (props) => {
  return (
    <SVGRightWhite
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconBackWhite = (props) => {
  return (
    <SVGBackWhite
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconBXH = (props) => {
  return (
    <SVGBxh
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconWallet = (props) => {
  return (
    <SVGWallet
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconHelp = (props) => {
  return (
    <SVGHelp
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconPolicy = (props) => {
  return (
    <SVGPolicy
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconRightArrow = (props) => {
  return (
    <SVGRightArrow
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconPartnerShip = (props) => {
  return (
    <SVGPartnerShip
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconTeamConnect = (props) => {
  return (
    <SVGTeamConnect
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconCheckOrder = (props) => {
  return (
    <SVGCheckOrder
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconCustomer = (props) => {
  return (
    <SVGCustomer
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconDoubleRightArrow = (props) => {
  return (
    <SVGDoubleRightArrow
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconIsChecked = (props) => {
  return (
    <SVGIsChecked
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconNotChecked = (props) => {
  return (
    <SVGNotChecked
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconEyeBase = (props) => {
  return (
    <SVGEyeBase
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconCashIn = (props) => {
  return (
    <SVGCashIn
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconCashOut = (props) => {
  return (
    <SVGCashOut
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconCommision = (props) => {
  return (
    <SVGCommision
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconCrown = (props) => {
  return (
    <SVGCrown
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconBackBase = (props) => {
  return (
    <SVGBackBase
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconBook = (props) => {
  return (
    <SVGBook
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconBrone = (props) => {
  return (
    <SVGBrone
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconSilver = (props) => {
  return (
    <SVGSilver
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconGold = (props) => {
  return (
    <SVGGold
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconDiamond = (props) => {
  return (
    <SVGDiamond
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconCopy = (props) => {
  return (
    <SVGCopy
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconShare = (props) => {
  return (
    <SVGShare
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconCancelWhite = (props) => {
  return (
    <SVGCancelWhite
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconCancelGrey = (props) => {
  return (
    <SVGCancelGrey
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconDollars = (props) => {
  return (
    <SVGDollars
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconFindGrey = (props) => {
  return (
    <SVGFindGrey
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconBackGrey = (props) => {
  return (
    <SVGBackGrey
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconMirror = (props) => {
  return (
    <SVGMirror
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconAffiliate = (props) => {
  return (
    <SVGAffiliate
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconComment = (props) => {
  return (
    <SVGComment
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconHand = (props) => {
  return (
    <SVGHand
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconTrash = (props) => {
  return (
    <SVGTrash
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconArrowDown = (props) => {
  return (
    <SVGArrowDown
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconQRScaner = (props) => {
  return (
    <SVGQRScaner
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconTick = (props) => {
  return (
    <SVGTick
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconVoucher = (props) => {
  return (
    <SVGVoucher
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconVoucherGold = (props) => {
  return (
    <SVGVoucherGold
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconChecklistWhite = (props) => {
  return (
    <SVGChecklistWhite
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};

export const IconHistoryWhite = (props) => {
  return (
    <SVGHistoryWhite
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconHelpWhite = ({ style, ...props }: SvgProps) => {
  return (
    <SVGHelpWhite
      width={style?.width ? style?.width : _moderateScale(8 * 4)}
      height={style?.height ? style?.height : _moderateScale(8 * 4)}
      {...props}
    />
  );
};
export const BtnMission = (props) => {
  return (
    <SVGBtnMission
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const BtnHistory = (props) => {
  return (
    <SVGBtnHistory
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconCoin = (props) => {
  return (
    <SVGCoin
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconArrowRightLarge = (props) => {
  return (
    <SVGArrowRightLarge
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconIncrease = (props) => {
  return (
    <SVGIncrease
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconDecrease = (props) => {
  return (
    <SVGDecrease
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconPlayWhite = (props) => {
  return (
    <SVGPlay
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconHeartWhite = (props) => {
  return (
    <SVGHeartWhite
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconHeartFilled = (props) => {
  return (
    <SVGHeartFilled
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconCommentWhite = (props) => {
  return (
    <SVGCommentWhite
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconLineArrowDown = (props) => {
  return (
    <SVGLineArrowDown
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconHospital = (props) => {
  return (
    <SVGHospital
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconPhoneBase = (props) => {
  return (
    <SVGPhoneBase
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconLocationBase = (props) => {
  return (
    <SVGLocationBase
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconDoctorBase = (props) => {
  return (
    <SVGDoctorBase
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconCalendarBase = (props) => {
  return (
    <SVGCalendarBase
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
export const IconPlusGrey = (props) => {
  return (
    <SVGPlusGrey
      width={props?.style?.width ? props?.style?.width : _moderateScale(8 * 4)}
      height={
        props?.style?.height ? props?.style?.height : _moderateScale(8 * 4)
      }
    />
  );
};
