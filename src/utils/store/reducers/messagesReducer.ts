import {Types} from '../../types'
import {createReducer} from "@reduxjs/toolkit";
import {createAddMessageAction} from "../actionCreators";

const initialMessagesState: Types.MessagesState = {
    messages: []
};

const messagesReducer = createReducer(initialMessagesState, (builder) => {
    builder.addCase(createAddMessageAction, (state, action) => {state.messages = [...state.messages, action.payload]});
});

export default messagesReducer;