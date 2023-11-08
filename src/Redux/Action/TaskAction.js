import * as ActionType from '../Constants/ActionType'
import Axios from 'axios'
import {  URL_ORIGINAL } from '../../Constant/Url';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { Platform } from 'react-native';
import { navigation, dispatch } from '../../../rootNavigation';
import { isEmpty } from 'lodash'
import store from "../store";


export const modalCreateTask = (props) => {
    return {
        type: ActionType.MODAL_CREATE_TASK,
        payload: {
            flag: props
        }
    }
}

export const clearDataCreateTask = () => {
    return {
        type: ActionType.CLEAR_DATA_AFTER_CREATE_TASK,
        payload: null
    }
}

export const leaderRemoveTask = (TaskId) => {
    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xoá...'
            }
        })
        Axios.delete(`${URL_ORIGINAL}/api/task/${TaskId}`, {})
            .then(res => {
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
            })
            .catch(err => {
                console.log({ ...err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getAllMyTask = (props) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/mine`, props)
            .then(res => {

                dispatch({
                    type: ActionType.GET_ALL_TASK,
                    payload: {
                        data: res.data.data,
                    }
                })
            })
            .catch(err => {
                console.log({ ...err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}


export const getAllMyTaskNotStarted = (setRefreshing, setFlagLoadmoreTask) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/mine`, {
            params: {
                status: "NOT_STARTED"
            }
        })
            .then(res => {
                dispatch({
                    type: ActionType.SET_MY_TASKS_NOT_STARTED,
                    payload: {
                        data: res.data.data,
                    }
                })
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadmoreTask) {
                    setFlagLoadmoreTask(true)
                }
            })
            .catch(err => {
                console.log({ ...err });
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadmoreTask) {
                    setFlagLoadmoreTask(true)
                }
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getAllMyTaskNotStartedMore = (props, setFlagLoadmoreTask) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/mine`, {
            params: {
                status: "NOT_STARTED",
                lastTaskId: props
            }
        })
            .then(res => {
                if (isEmpty(res.data.data)) {
                    return setFlagLoadmoreTask(false)
                }

                dispatch({
                    type: ActionType.SET_MY_TASKS_NOT_STARTED_MORE,
                    payload: {
                        data: res.data.data,
                    }
                })
            })
            .catch(err => {
                console.log({ ...err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getAllMyTaskInProgress = (setRefreshing, setFlagLoadmoreTask) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/mine`, {
            params: {
                status: "IN_PROGRESS",
            }
        })
            .then(res => {
                dispatch({
                    type: ActionType.SET_MY_TASKS_IN_PROGRESS,
                    payload: {
                        data: res.data.data,
                    }
                })
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadmoreTask) {
                    setFlagLoadmoreTask(true)
                }
            })
            .catch(err => {
                console.log({ loi: err });
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadmoreTask) {
                    setFlagLoadmoreTask(true)
                }
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getAllMyTaskInProgressMore = (props, setFlagLoadmoreTask) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/mine`, {
            params: {
                status: "IN_PROGRESS",
                lastTaskId: props
            }
        })
            .then(res => {
                if (isEmpty(res.data.data)) {
                    return setFlagLoadmoreTask(false)
                }
                dispatch({
                    type: ActionType.SET_MY_TASKS_IN_PROGRESS_MORE,
                    payload: {
                        data: res.data.data,
                    }
                })
                // setFlagLoadmoreTask(true)
            })
            .catch(err => {
                console.log({ loi: err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getAllMyTaskCompleted = (setRefreshing, setFlagLoadmoreTask) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/mine`, {
            params: {
                status: "COMPLETED"
            }
        })
            .then(res => {
                dispatch({
                    type: ActionType.SET_MY_TASKS_COMPLETED,
                    payload: {
                        data: res.data.data,
                    }
                })
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadmoreTask) {
                    setFlagLoadmoreTask(true)
                }
            })
            .catch(err => {
                console.log({ loi: err });
                if (setRefreshing) {
                    setRefreshing(false)
                }
                if (setFlagLoadmoreTask) {
                    setFlagLoadmoreTask(true)
                }
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getAllMyTaskCompletedMore = (props, setFlagLoadmoreTask) => {

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/mine`, {
            params: {
                status: "COMPLETED",
                lastTaskId: props
            }
        })
            .then(res => {
                console.log({ ...res });
                if (isEmpty(res.data.data)) {
                    return setFlagLoadmoreTask(false)
                }
                dispatch({
                    type: ActionType.SET_MY_TASKS_COMPLETED_MORE,
                    payload: {
                        data: res.data.data,
                    }
                })
            })
            .catch(err => {
                console.log({ loi: err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}



export const confirmEditTask = (props) => {

    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xử lí...'
            }
        })

        Axios.put(`${URL_ORIGINAL}/api/task/${props.id}`, props.data)
            .then(res => {
                console.log({ ...res });
                dispatch({
                    type: ActionType.UPDATE_TASK_AFTER_EDIT,
                    payload: {
                        data: res.data.data,
                    }
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                navigation.goBack()
            })
            .catch(err => {
                console.log({ ...err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const movingTaskToStart = (props) => {

    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xử lí...'
            }
        })
        Axios.post(`${URL_ORIGINAL}/api/task/start`, {
            taskId: props
        })
            .then(res => {
                console.log({ ...res });
                // dispatch({
                //     type: ActionType.UPDATE_STATUS_TASK,
                //     payload: {
                //         data: res.data.data,
                //     }
                // })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
            })
            .catch(err => {
                console.log({ ...err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const movingTaskToDone = (props) => {

    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xử lí...'
            }
        })
        Axios.post(`${URL_ORIGINAL}/api/task/make-complete`, {
            taskId: props
        })
            .then(res => {
                console.log({ ...res });
                // dispatch({
                //     type: ActionType.UPDATE_STATUS_TASK,
                //     payload: {
                //         data: res.data.data,
                //     }
                // })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
            })
            .catch(err => {
                console.log({ ...err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const getInfoTaskById = (props, flag) => {
    if (isEmpty(props)) return

    return async dispatch => {
        Axios.get(`${URL_ORIGINAL}/api/task/${props}`, {})
            .then(res => {
                console.log({ ...res });
                if (flag == 'see') {
                    dispatch({
                        type: ActionType.SAVE_INFO_CURR_TASK_SEE,
                        payload: {
                            data: res.data.data,
                        }
                    })
                }
                if (flag == 'edit') {
                    dispatch({
                        type: ActionType.SAVE_INFO_CURR_TASK_EDIT,
                        payload: {
                            data: res.data.data,
                        }
                    })
                }
            })
            .catch(err => {
                console.log({ ...err });

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}


export const setDoneSubTaskSee = props => {

    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xử lí...'
            }
        })
        Axios.post(`${URL_ORIGINAL}/api/sub-task/make-complete`, {
            subTaskId: props.data._id,
            isComplete: true
        })
            .then(res => {
                console.log({ ...res });
                dispatch({
                    type: ActionType.SET_DONE_SUB_TASK_SEE,
                    payload: {
                        data: props.data,
                        flag: props.flag
                    }
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                // navigation.goBack()
            })
            .catch(err => {
                console.log({ Loiiiii: err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const removeSubTaskSee = props => {

    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xoá...'
            }
        })
        Axios.delete(`${URL_ORIGINAL}/api/sub-task/${props._id}`, {})
            .then(res => {
                console.log({ ...res });
                dispatch({
                    type: ActionType.REMOVE_SUB_TASK_SEE,
                    payload: {
                        data: props._id
                    }
                })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
            })
            .catch(err => {
                console.log({ Loiiiii: err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}




export const setCurrTaskEditName = props => {
    return {
        type: ActionType.SET_CURR_TASK_EDIT_NAME,
        payload: {
            content: props
        }
    }
}

export const setCurrTaskEditDescription = props => {
    return {
        type: ActionType.SET_CURR_TASK_EDIT_DESCRIPTION,
        payload: {
            content: props
        }
    }
}

export const addMembersToEditTask = props => {
    return {
        type: ActionType.ADD_MEMBER_TO_EDIT_TASK,
        payload: {
            data: props
        }
    }
}

export const removeMembersToEditTask = props => {
    return {
        type: ActionType.REMOVE_MEMBER_TO_EDIT_TASK,
        payload: {
            data: props
        }
    }
}
export const pickLeaderEditTask = props => {
    return {
        type: ActionType.PICK_LEADER_EDIT_TASK,
        payload: {
            data: props
        }
    }
}


export const setDeadlineEditTask = props => {
    console.log({ propssssss: props });

    return {
        type: ActionType.SET_DEADLINE_EDIT_TASK,
        payload: {
            data: props
        }
    }
}

export const setDoneMiniEditTask = props => {
    return {
        type: ActionType.SET_DONE_MINI_EDIT_TASK,
        payload: {
            data: props.data,
            flag: props.flag
        }
    }
}

export const removeMiniEditTask = props => {

    return {
        type: ActionType.REMOVE_MINI_EDIT_TASK,
        payload: {
            data: props
        }
    }
}






export const setTitleCreateTask = props => {
    return {
        type: ActionType.SET_TITLE_CREATE_TASK,
        payload: {
            content: props
        }
    }
}

export const setDescriptionCreateTask = props => {
    return {
        type: ActionType.SET_DESCRIPTION_CREATE_TASK,
        payload: {
            content: props
        }
    }
}

export const addMemberToTask = props => {
    return {
        type: ActionType.ADD_MEMBER_TO_TASK,
        payload: {
            data: props
        }
    }
}

export const pickLeaderTask = props => {
    return {
        type: ActionType.PICK_LEADER_TASK,
        payload: {
            data: props
        }
    }
}

export const removeMemberToTask = props => {
    return {
        type: ActionType.REMOVE_MEMBER_TO_TASK,
        payload: {
            data: props
        }
    }
}

export const setDeadlineTask = props => {
    return {
        type: ActionType.SET_DEADLINE_TASK,
        payload: {
            data: props
        }
    }
}


export const addMiniTask = props => {
    return {
        type: ActionType.ADD_MINI_TASK,
        payload: {
            data: props
        }
    }
}

export const removeMiniTask = props => {

    return {
        type: ActionType.REMOVE_MINI_TASK,
        payload: {
            data: props
        }
    }
}

export const setDoneMiniTask = props => {
    return {
        type: ActionType.SET_DONE_MINI_TASK,
        payload: {
            data: props.data,
            flag: props.flag
        }
    }
}


export const addSubTask = props => {
    return async dispatch => {
        Axios.post(`${URL_ORIGINAL}/api/sub-task`, props)
            .then(res => {
                dispatch({
                    type: ActionType.ADD_NEW_SUBTASK,
                    payload: {
                        data: res.data.data,
                    }
                })
                // navigation.goBack()
            })
            .catch(err => {
                console.log({ Loiiiii: err });
                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }
}

export const addNewTask = props => {

    return async dispatch => {
        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xử lí...'
            }
        })

        Axios.post(`${URL_ORIGINAL}/api/task`, props)
            .then(res => {
                console.log({ ...res });
                // dispatch({
                //     type: ActionType.ADD_NEW_TASK,
                //     payload: {
                //         data: res.data.data,
                //     }
                // })
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })
                navigation.goBack()
            })
            .catch(err => {
                console.log({ ...err });
                dispatch({
                    type: ActionType.LOADING_DONE,
                    payload: null
                })

                if (err.response) {
                    setTimeout(() => {
                        alert(err.response.data.message)
                    }, 100);
                } else {
                    setTimeout(() => {
                        alert("Máy chủ không phản hồi")
                    }, 100);
                }
            })
    }

    // return dispatch => {
    //     dispatch({
    //         type: ActionType.ADD_NEW_TASK,
    //         payload: {
    //             data: props,
    //         }
    //     })
    //     navigation.goBack()
    // }
}

export const setCurrSeeTaskDetail = props => {
    return {
        type: ActionType.SET_CURR_SEE_TASK_DETAIL,
        payload: {
            data: props
        }
    }
}
