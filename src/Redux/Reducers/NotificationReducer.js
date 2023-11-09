import * as ActionType from "../Constants/ActionType";


let initialState = {
    listMyNotificationsForTask: [],
    listMyNotificationsForPost: [],
    listAllNoti: [],
    showListAllNoti: false,
    showModalNoti: false,
    notification: {},
    isShowBagedDiary: {
        show: false,
        data: []
    },
    isShowRequireAvatar:false
};

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {



        case ActionType.SHOW_MODAL_REQUIRE_AVATAR:
            return {
                ...state,
                isShowRequireAvatar:action?.payload?.flag
            }

        case ActionType.SHOW_BAGED_DIARY:
            return {
                ...state,
                isShowBagedDiary: {
                    ...state?.isShowBagedDiary,
                    show: action?.payload?.data
                }
            }
        case ActionType.SET_DATA_BAGED_DIARY:
            return {
                ...state,
                isShowBagedDiary: {
                    ...state?.isShowBagedDiary,
                    data: action?.payload?.data
                }
            }

        case ActionType.UPDATE_SEEN_LIST_NOTI:
            let listAllNotiTemp = [...state.listAllNoti];
            listAllNotiTemp?.map((item, index) => {
                if (action?.payload?.data?.find(itemFind => itemFind == item?._id)) {
                    item['seenAt'] = new Date()
                }
            })
            return {
                ...state,
                listAllNoti: listAllNotiTemp
            }

        case ActionType.SHOW_LIST_ALL_NOTI:
            return {
                ...state,
                showListAllNoti: action?.payload?.data
            }

        case ActionType.SHOW_MODAL_NOTI:
            return {
                ...state,
                showModalNoti: action?.payload?.data,
                notification: action?.payload?.noti
            }

        case ActionType.ADD_NEW_PARTNER_NOTI:
            return {
                ...state,
                listAllNoti: [action.payload.data, ...state?.listAllNoti]
            }

        case ActionType.SAVE_LIST_NOTI:
            return {
                ...state,
                listAllNoti: action.payload.data
            }

        case ActionType.SET_NOTIFICATION_FOR_TASK:
            return {
                ...state,
                listMyNotificationsForTask: action.payload.data
            }
        case ActionType.SET_NOTIFICATION_FOR_POST:
            return {
                ...state,
                listMyNotificationsForPost: action.payload.data
            }

        case ActionType.NEW_NOTIFICATION_HAS_COME_FOR_TASK:
            return {
                ...state,
                listMyNotificationsForTask: [action.payload.data, ...state.listMyNotificationsForTask]
            }
        case ActionType.NEW_NOTIFICATION_HAS_COME_FOR_POST:
            return {
                ...state,
                listMyNotificationsForPost: [action.payload.data, ...state.listMyNotificationsForPost]
            }
        case ActionType.UPDATE_VIEWER_NOTIFI_POST:
            let tempNotiPostUpdateViewer = [...state.listMyNotificationsForPost]
            let indexNotifiForUpdateViewer = tempNotiPostUpdateViewer.findIndex(itemFind => itemFind._id == action.payload.data._id);
            if (indexNotifiForUpdateViewer !== -1) {
                tempNotiPostUpdateViewer[indexNotifiForUpdateViewer] = action.payload.data
            }
            return {
                ...state,
                listMyNotificationsForPost: tempNotiPostUpdateViewer
            }
        case ActionType.UPDATE_VIEWER_NOTIFI_TASK:
            let tempNotiTaskUpdateViewer = [...state.listMyNotificationsForTask]
            let indexNotifiTaskForUpdateViewer = tempNotiTaskUpdateViewer.findIndex(itemFind => itemFind._id == action.payload.data._id);
            if (indexNotifiTaskForUpdateViewer !== -1) {
                tempNotiTaskUpdateViewer[indexNotifiTaskForUpdateViewer] = action.payload.data
            }
            return {
                ...state,
                listMyNotificationsForTask: tempNotiTaskUpdateViewer
            }

        default:
            return state;
    }
};

export default NotificationReducer;
