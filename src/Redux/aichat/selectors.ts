import { AppState } from "../Reducers/RootReducer";

export const getAIMessagesState = (state: AppState) => state.aichat.messages;
