import * as ActionType from "../Constants/ActionType";

let initialState = {
    listMembersOfSystem: [],
    listUserOnline: [],
    listDoctor: []
};

const MemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_LIST_MEMBERS_OF_SYSTEM:
            return {
                ...state,
                listMembersOfSystem: action.payload.data
            }
        case ActionType.SAVE_LIST_USERS_IN_APP:
            return {
                ...state,
                listMembersOfSystem: action.payload.data
            }
        case ActionType.SAVE_LIST_USERS_ONLINE:
            return {
                ...state,
                listUserOnline: action.payload.data
            }

        case ActionType.SAVE_LIST_DOCTOR:
            return {
                ...state,
                listDoctor: action.payload.data
            }

        case ActionType.NEW_USER_ONLINE:

            let tempListUserOnline = [...state.listUserOnline];

            let finding = tempListUserOnline.find(itemFind => itemFind == action.payload.data);
            if (finding) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    listUserOnline: [action.payload.data, ...state.listUserOnline]
                }
            }

        case ActionType.NEW_USER_OFFLINE:
            return {
                ...state,
                listUserOnline: [...state.listUserOnline.filter(item => item !== action.payload.data)]
            }
        default:
            return state;
    }
};

export default MemberReducer;
