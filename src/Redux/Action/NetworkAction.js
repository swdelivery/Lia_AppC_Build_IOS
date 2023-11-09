import * as ActionType from '../Constants/ActionType'


export const setNetworkInfo = props => {
    return {
        type: ActionType.SET_NETWORK_INFO,
        payload: {
            flag: props
        }
    }
}
