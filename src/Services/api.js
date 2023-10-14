import { Platform } from "react-native";
import fetchApi from "./config";
import fetchApiLocal from "./configLocal";

const METHOD = {
    POST: 'post',
    GET: 'get',
    PUT: 'put',
    DELETE: 'delete',
};

// LOGIN
// export const _login =
export const _createNewTokenFCM = (data) => () => {
    return fetchApi(`/api/device`, data, METHOD.POST, {}, {})
}

export const _logout = (data) => () => {
    return fetchApi(`/api/users/logout`, { fcmToken: data }, METHOD.POST, {}, {})
}

// ---------------------------------------
export const _getAllDataFlowMoney = (dateFilter) => () => {
    return fetchApiLocal(`/money`, {}, METHOD.GET, {}, dateFilter)
}
export const _getAllDataServiceReveunue = (dateFilter) => () => {
    return fetchApiLocal(`/doanhthu/dichvu`, {}, METHOD.GET, {}, dateFilter)
}

export const _getAllDataBranchRevenue = (dateFilter) => () => {
    return fetchApiLocal(`/doanhthu/chinhanh`, {}, METHOD.GET, {}, dateFilter)
}

export const _getAllDataCostPart = (dateFilter) => () => {
    return fetchApiLocal(`/chiphi/bophan`, {}, METHOD.GET, {}, dateFilter)
}

export const _getAllDataCostItem = (dateFilter) => () => {
    return fetchApiLocal(`/chiphi/khoanmuc`, {}, METHOD.GET, {}, dateFilter)
}

export const _getDetailRevenueByTk = (dateFilter) => () => {
    return fetchApiLocal(`/doanhthu/chitietdichvu`, {}, METHOD.GET, {}, dateFilter)
}

export const _getRevenueViaBranch = (dateFilter) => () => {
    return fetchApiLocal(`/doanhthu/dichvubophan`, {}, METHOD.GET, {}, dateFilter)
}

export const _getX = () => () => {
    return fetchApi(`/user`, {}, METHOD.GET, {})
}


// CHATTING

export const _getChatGroupByCode = (groupCode) => () => {
    return fetchApi(`/api/chat-group/get-by-code`, {}, METHOD.GET, {}, { groupCode })
}


export const _getChatGroupByReceiverId = (receiverId) => () => {
    return fetchApi(`/api/chat-group/get-by-receiver-id`, {}, METHOD.GET, {}, { receiverId })
}

export const _createGroupChat = (data) => () => {
    return fetchApi(`/api/chat-group`, data, METHOD.POST, {}, {})
}

export const _getMoreMessageByLastedId = (params) => () => {
    return fetchApi(`/api/chat-message/get-for-group`, {}, METHOD.GET, {}, params)
}

export const _getNewestMessageByFirstMessageId = (params) => () => {
    return fetchApi(`/api/chat-message/get-for-group`, {}, METHOD.GET, {}, params)
}

export const _removeMemberInGroupChat = (data) => () => {
    return fetchApi(`/api/chat-group/remove-member`, data, METHOD.POST, {}, {})
}

export const _addMembersToGroupChat = (data) => () => {
    return fetchApi(`/api/chat-group/add-member`, data, METHOD.POST, {}, {})
}

// TASK

export const _getCommentsSubTask = (subTaskId) => () => {
    return fetchApi(`/api/task-comment/get-by-sub-task`, {}, METHOD.GET, {}, { subTaskId: subTaskId })
}

export const _getMoreCommentsSubTask = (subTaskId, lastCommentId) => () => {
    return fetchApi(`/api/task-comment/get-by-sub-task`, {}, METHOD.GET, {}, { subTaskId: subTaskId, lastTaskCommentId: lastCommentId })
}

export const _deleteCommentSubTask = (taskCommentId) => () => {
    return fetchApi(`/api/task-comment/${taskCommentId}`, {}, METHOD.DELETE, {}, {})
}

export const _commentSubTask = (data) => () => {
    return fetchApi(`/api/task-comment`, data, METHOD.POST, {}, {})
}


// UPLOAD MODULE
export const _uploadModule = (data) => () => {
    let formData = new FormData();

    data.files.forEach((item, index) => {
        if (!item.mime)
            return;
        let typeOfImageSplit = item.mime.split('/');
        if (typeOfImageSplit.length < 1)
            return;

        let typeOfImage = typeOfImageSplit[1];
        formData.append(`files`, {
            name: `${item.name}.${typeOfImage}`,
            type: item.mime,
            uri: Platform.OS === "android" ? item.uri : item.uri.replace("file://", "")
        });
    })

    console.log(formData);


    return fetchApi(`/api/file/upload`, formData, METHOD.POST, {}, { moduleName: data.moduleName })
}

// UPLOAD MODULE DOCUMENT
export const _uploadModuleDocument = (data) => () => {
    let formData = new FormData();

    data.files.forEach((item, index) => {
        formData.append(`files`, {
            name: `${item.name}`,
            type: item.type,
            uri: Platform.OS === "android" ? item.uri : item.uri.replace("file://", "")
        });
    }) 

    console.log(formData);


    return fetchApi(`/api/file/upload`, formData, METHOD.POST, {}, { moduleName: data.moduleName })
}


// NEW FEED
export const _getMoreReplyCommentAPI = (data) => () => {
    return fetchApi(`/api/post-comment/get-by-parent`, {}, METHOD.GET, {}, data)
}