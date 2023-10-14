import * as ActionType from "../Constants/ActionType";

let initialState = {
    modalCreateTask: false,
    currTaskCreate: {
        title: '',
        description: '',
        listMembers: [],
        deadline: null,
        listMiniTasks: []
    },
    currTaskEdit: {

    },
    currTaskSee: {

    },
    listMainTask: [],
    currSeeTaskDeTail: {},
    listMyTasksNotStarted: [],
    listMyTasksInProgress: [],
    listMyTasksCompleted: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionType.UPDATE_TASK_AFTER_EDIT:
            return {
                ...state,
            }

        case ActionType.NEW_ASSIGN_TASK:
            return {
                ...state,
                listMyTasksNotStarted: [action.payload.data, ...state.listMyTasksNotStarted]
            }

        case ActionType.NEW_TASK_HAS_REMOVED:
            switch (action.payload.data.status) {
                case "NOT_STARTED":
                    return {
                        ...state,
                        listMyTasksNotStarted: [...state.listMyTasksNotStarted].filter(itemFilter => itemFilter._id !== action.payload.data._id),
                    }
                case "IN_PROGRESS":
                    return {
                        ...state,
                        listMyTasksInProgress: [...state.listMyTasksInProgress].filter(itemFilter => itemFilter._id !== action.payload.data._id),
                    }
                default:
                    break;
            }

        case ActionType.NEW_TASK_HAS_CHANGE_STATUS:
            switch (action.payload.data.status) {
                case "IN_PROGRESS":
                    return {
                        ...state,
                        listMyTasksNotStarted: [...state.listMyTasksNotStarted].filter(itemFilter => itemFilter._id !== action.payload.data._id),
                        listMyTasksInProgress: [action.payload.data, ...state.listMyTasksInProgress]
                    }
                case "COMPLETED":
                    return {
                        ...state,
                        listMyTasksInProgress: [...state.listMyTasksInProgress].filter(itemFilter => itemFilter._id !== action.payload.data._id),
                        listMyTasksCompleted: [action.payload.data, ...state.listMyTasksCompleted]
                    }
                default:
                    break;
            }
        case ActionType.NEW_TASK_HAS_UPDATED:
            switch (action.payload.data.status) {
                case "NOT_STARTED":
                    let templistMyTasksNotStartedForUpdate = [...state.listMyTasksNotStarted].filter(itemFilter => itemFilter._id !== action.payload.data._id);
                    templistMyTasksNotStartedForUpdate = [action.payload.data, ...templistMyTasksNotStartedForUpdate]
                    return {
                        ...state,
                        listMyTasksNotStarted: templistMyTasksNotStartedForUpdate
                    }
                case "IN_PROGRESS":
                    let templistMyTasksInProgressForUpdate = [...state.listMyTasksInProgress].filter(itemFilter => itemFilter._id !== action.payload.data._id);
                    templistMyTasksInProgressForUpdate = [action.payload.data, ...templistMyTasksInProgressForUpdate]
                    return {
                        ...state,
                        listMyTasksInProgress: templistMyTasksInProgressForUpdate
                    }
                case "COMPLETED":
                    let templistMyTasksCompletedForUpdate = [...state.listMyTasksCompleted].filter(itemFilter => itemFilter._id !== action.payload.data._id);
                    templistMyTasksCompletedForUpdate = [action.payload.data, ...templistMyTasksCompletedForUpdate]
                    return {
                        ...state,
                        listMyTasksCompleted: templistMyTasksCompletedForUpdate
                    }
                default:
                    break;
            }
        case ActionType.MODAL_CREATE_TASK:
            return {
                ...state,
                modalCreateTask: action.payload.flag
            }
        case ActionType.SET_TITLE_CREATE_TASK:
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, title: action.payload.content }
            }
        case ActionType.SET_DESCRIPTION_CREATE_TASK:
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, description: action.payload.content }
            }
        case ActionType.GET_ALL_TASK:
            return {
                ...state,
                listMainTask: [...action.payload.data]
            }
        case ActionType.ADD_MEMBER_TO_TASK:
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, listMembers: [...state.currTaskCreate.listMembers, action.payload.data] }
            }
        case ActionType.REMOVE_MEMBER_TO_TASK:
            let listMembersTemp = [...state.currTaskCreate.listMembers].filter(item => item._id !== action.payload.data._id)
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, listMembers: listMembersTemp }
            }
        case ActionType.PICK_LEADER_TASK:
            // let listMembersTemp = [...state.currTaskCreate.listMembers].filter(item => item._id !== action.payload.data._id)
            let tempListMembersForPickLeader = [...state.currTaskCreate.listMembers];

            tempListMembersForPickLeader.map(itemMap => {
                // let indexFindForPickLeader = tempListMembersForPickLeader.findIndex(itemFindIndex => itemFindIndex._id == action.payload.data._id)
                if (itemMap._id == action.payload.data._id) {
                    return itemMap["isLeader"] = true
                } else {
                    return itemMap["isLeader"] = false
                }
            })
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, listMembers: tempListMembersForPickLeader }
            }
        case ActionType.SET_DEADLINE_TASK:
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, deadline: action.payload.data }
            }
        case ActionType.ADD_MINI_TASK:
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, listMiniTasks: [...state.currTaskCreate.listMiniTasks, action.payload.data] }
            }
        case ActionType.REMOVE_MINI_TASK:
            let listMiniTasksAfterRemoveTemp = [...state.currTaskCreate.listMiniTasks].filter(item => item._id !== action.payload.data._id)
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, listMiniTasks: listMiniTasksAfterRemoveTemp }
            }
        case ActionType.SET_DONE_MINI_TASK:
            let listMiniTasksTemp = [...state.currTaskCreate.listMiniTasks]
            let index = listMiniTasksTemp.findIndex(itemFind => itemFind._id == action.payload.data._id);
            if (index !== -1) {
                listMiniTasksTemp[index].done = action.payload.flag
            }
            return {
                ...state,
                currTaskCreate: { ...state.currTaskCreate, listMiniTasks: listMiniTasksTemp }
            }
        case ActionType.ADD_NEW_TASK:
            return {
                ...state,
                currTaskCreate: {
                    title: '',
                    description: '',
                    listMembers: [],
                    deadline: null,
                    listMiniTasks: []
                },
                // listMyTasksNotStarted: [action.payload.data, ...state.listMyTasksNotStarted]
            }

        case ActionType.CLEAR_DATA_AFTER_CREATE_TASK:
            return {
                ...state,
                currTaskCreate: {
                    title: '',
                    description: '',
                    listMembers: [],
                    deadline: null,
                    listMiniTasks: []
                }
            }

        case ActionType.SET_CURR_SEE_TASK_DETAIL:
            let indexOfCurrTaskDetailInListMainTask = state.listMainTask.findIndex(itemFind => itemFind._id == action.payload.data._id);
            console.log({ indexOfCurrTaskDetailInListMainTask });
            if (indexOfCurrTaskDetailInListMainTask !== -1) {
                return {
                    ...state,
                    currSeeTaskDeTail: state.listMainTask[indexOfCurrTaskDetailInListMainTask]
                }
            } else {
                return {
                    ...state
                }
            }

        case ActionType.ADD_NEW_SUBTASK:
            // let indexTaskForAddSubTask = state.listMainTask.findIndex(itemFind => itemFind?._id == action?.payload?.data?.taskId)
            // console.log({ indexTaskForAddSubTask, action: action.payload.data });
            // if (indexTaskForAddSubTask !== -1) {
            //     let tempListMainTaskForAddSubTask = [...state.listMainTask]
            //     tempListMainTaskForAddSubTask[indexTaskForAddSubTask].subTasks = [...tempListMainTaskForAddSubTask[indexTaskForAddSubTask].subTasks, action.payload.data]
            //     return {
            //         ...state,
            //         listMainTask: tempListMainTaskForAddSubTask
            //     }
            // }

            return {
                ...state,
                // currSeeTaskDeTail: { ...state.currSeeTaskDeTail, subTasks: [action.payload.data, ...state.currSeeTaskDeTail.subTasks] }
                currTaskSee: { ...state.currTaskSee, subTasks: [action.payload.data, ...state.currTaskSee.subTasks] }
            }
        case ActionType.SAVE_INFO_CURR_TASK_EDIT:
            return {
                ...state,
                currTaskEdit: action.payload.data
            }
        case ActionType.SAVE_INFO_CURR_TASK_SEE:
            return {
                ...state,
                currTaskSee: action.payload.data
            }
        case ActionType.SET_CURR_TASK_EDIT_NAME:
            return {
                ...state,
                currTaskEdit: {
                    ...state.currTaskEdit,
                    name: action.payload.content
                }
            }
        case ActionType.SET_CURR_TASK_EDIT_DESCRIPTION:
            return {
                ...state,
                currTaskEdit: {
                    ...state.currTaskEdit,
                    description: action.payload.content
                }
            }
        case ActionType.ADD_MEMBER_TO_EDIT_TASK:
            return {
                ...state,
                currTaskEdit: {
                    ...state.currTaskEdit,
                    assignedUsers: [...state.currTaskEdit.assignedUsers, action.payload.data]
                },
            }
        case ActionType.REMOVE_MEMBER_TO_EDIT_TASK:
            return {
                ...state,
                currTaskEdit: {
                    ...state.currTaskEdit,
                    assignedUsers: [...state.currTaskEdit.assignedUsers].filter(itemFilter => itemFilter?.userId?._id !== action?.payload?.data?.userId?._id)
                },
            }
        case ActionType.PICK_LEADER_EDIT_TASK:
            console.log({ action: action.payload.data });


            let tempListMembersForPickLeaderEditTask = [...state.currTaskEdit.assignedUsers];

            tempListMembersForPickLeaderEditTask.map(itemMap => {
                if (itemMap?.userId?._id == action?.payload?.data?.userId?._id) {
                    return itemMap["isMain"] = true
                } else {
                    return itemMap["isMain"] = false
                }
            })
            return {
                ...state,
                currTaskEdit: { ...state.currTaskEdit, assignedUsers: tempListMembersForPickLeaderEditTask }
            }
        case ActionType.SET_DEADLINE_EDIT_TASK:
            return {
                ...state,
                currTaskEdit: { ...state.currTaskEdit, deadline: action.payload.data }
            }
        case ActionType.SET_DONE_MINI_EDIT_TASK:
            let listMiniTasksEditTemp = [...state.currTaskEdit.subTasks]
            let indexMiniTasksEditTemp = listMiniTasksEditTemp.findIndex(itemFind => itemFind._id == action.payload.data._id);
            if (indexMiniTasksEditTemp !== -1) {
                listMiniTasksEditTemp[indexMiniTasksEditTemp].isComplete = action.payload.flag
            }
            return {
                ...state,
                currTaskEdit: { ...state.currTaskEdit, subTasks: listMiniTasksEditTemp }
            }
        case ActionType.REMOVE_MINI_EDIT_TASK:
            let listMiniEditTasksAfterRemoveTemp = [...state.currTaskEdit.subTasks].filter(item => item._id !== action.payload.data._id)
            return {
                ...state,
                currTaskEdit: { ...state.currTaskEdit, subTasks: listMiniEditTasksAfterRemoveTemp }
            }

        case ActionType.SET_DONE_SUB_TASK_SEE:
            let listSubTaskSeeTemp = [...state.currTaskSee.subTasks]
            let indexSubTaskSeeTemp = listSubTaskSeeTemp.findIndex(itemFind => itemFind._id == action.payload.data._id);
            if (indexSubTaskSeeTemp !== -1) {
                listSubTaskSeeTemp[indexSubTaskSeeTemp].isComplete = action.payload.flag
            }
            return {
                ...state,
                currTaskSee: { ...state.currTaskSee, subTasks: listSubTaskSeeTemp }
            }

        case ActionType.REMOVE_SUB_TASK_SEE:
            let listSubTasksSeeAfterRemoveTemp = [...state.currTaskSee.subTasks].filter(item => item._id !== action.payload.data)
            return {
                ...state,
                currTaskSee: { ...state.currTaskSee, subTasks: listSubTasksSeeAfterRemoveTemp }
            }
        case ActionType.UPDATE_STATUS_TASK:
            switch (action.payload.data.status) {
                case "IN_PROGRESS":
                    return {
                        ...state,
                        listMyTasksNotStarted: [...state.listMyTasksNotStarted].filter(itemFilter => itemFilter._id !== action.payload.data._id),
                        listMyTasksInProgress: [action.payload.data, ...state.listMyTasksInProgress]
                    }
                case "COMPLETED":
                    return {
                        ...state,
                        listMyTasksInProgress: [...state.listMyTasksInProgress].filter(itemFilter => itemFilter._id !== action.payload.data._id),
                        listMyTasksCompleted: [action.payload.data, ...state.listMyTasksCompleted]
                    }
                default:
                    break;
            }

        // let tempListMainTaskForUpdateStatusTask = [...state.listMainTask].map(item => {
        //     if (item._id == action.payload.data._id) {
        //         return action.payload.data
        //     } else {
        //         return item
        //     }
        // })
        // return {
        //     ...state,
        //     listMainTask: tempListMainTaskForUpdateStatusTask
        // }
        case ActionType.SET_MY_TASKS_NOT_STARTED:
            return {
                ...state,
                listMyTasksNotStarted: action.payload.data
            }
        case ActionType.SET_MY_TASKS_NOT_STARTED_MORE:
            return {
                ...state,
                listMyTasksNotStarted: [...state.listMyTasksNotStarted, ...action.payload.data]
            }
        case ActionType.SET_MY_TASKS_IN_PROGRESS:
            return {
                ...state,
                listMyTasksInProgress: action.payload.data
            }
        case ActionType.SET_MY_TASKS_IN_PROGRESS_MORE:
            return {
                ...state,
                listMyTasksInProgress: [...state.listMyTasksInProgress, ...action.payload.data]
            }
        case ActionType.SET_MY_TASKS_COMPLETED:
            return {
                ...state,
                listMyTasksCompleted: action.payload.data
            }
        case ActionType.SET_MY_TASKS_COMPLETED_MORE:
            return {
                ...state,
                listMyTasksCompleted: [...state.listMyTasksCompleted, ...action.payload.data]
            }

        default:
            return state;
    }
};

export default reducer;
