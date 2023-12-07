import { combineReducers } from "redux";
import * as ActionType from "../Constants/ActionType";
import authReducer from "./AuthReducer";
import userReducer from "./index";
import infoUserReducer from "./InfoUserReducer";
import membersReducer from "./MembersReducer";
import messageReducer from "./MessageReducer";
import networkReducer from "./NetworkReducer";
import notificationReducer from "./NotificationReducer";
import postReducer from "./PostsReducer";
import revenueAndCostReducer from "./RevenueAndCostReducer";
import taskReducer from "./TaskReducer";
import serviceReducer from "./ServiceReducer";
import serviceGroupReducer from "./ServiceGroupReducer";
import bookingReducer from "./BookingReducer";
import infoReducer from "./InfoReducer";
import ortherReducer from "./OrtherReducer";
import branchReducer from "./BranchReducer";
import doctorReducer from "./DoctorReducer";
import productReducer from "./ProductReducer";
import productGroupReducer from "./ProductGroupReducer";
import diaryReducer from "./DiaryReducer";
import loseWeightReducer from "./LoseWeightReducer";
import newsReducer from "./NewsReducer";
import partnerDiaryReducer from "./PartnerDiaryReducer";
import walletReducer from "./WalletReducer";
import affiliateReducer from "./AffiliateReducer";
import home from "../home/reducers";
import branch from "../branch/reducers";
import service from "../service/reducers";
import doctor from "../doctor/reducers";
import practitioner from "../practitioner/reducers";
import booking from "../booking/reducers";
import user from "../user/reducers";
import voucher from "../voucher/reducers";
import insurance from "../insurance/reducers";
import chat from "../chat/reducers";
import { resetable } from "@Redux/resettableReducer";
import modal from "../modal/reducers";
import resultcanningeyes from "../resultcanningeyes/reducers";
import relatives from "../relatives/reducers";
import aichat from "../aichat/reducers";
import material from "../material/reducers";
import newfeeds from "../newfeeds/reducers";

const rootReducer = combineReducers({
  newsReducer,
  productGroupReducer,
  productReducer,
  doctorReducer,
  branchReducer,
  userReducer,
  taskReducer,
  authReducer,
  membersReducer,
  networkReducer,
  infoUserReducer,
  messageReducer,
  notificationReducer,
  postReducer,
  revenueAndCostReducer,
  serviceReducer,
  serviceGroupReducer,
  bookingReducer,
  infoReducer,
  ortherReducer,
  diaryReducer,
  loseWeightReducer,
  partnerDiaryReducer,
  walletReducer,
  affiliateReducer,

  home,
  branch,
  service,
  doctor,
  practitioner,
  material,
  booking,
  voucher,
  insurance,
  chat,
  user: resetable(user),
  modal,
  resultcanningeyes,
  relatives,
  aichat,
  newfeeds,
});

// const rootReducer = (state, action) => {
//     if (action.type === 'USER_LOGOUT') {
//         state = undefined
//     }

//     return appReducer(state, action)
// }

// export default rootReducer;
export default (state, action) =>
  rootReducer(
    action.type === ActionType.CLEAR_STORE_REDUX ? undefined : state,
    action
  );

export type AppState = ReturnType<typeof rootReducer>;
