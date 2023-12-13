import {messageTypes} from "./enums";

export namespace Types {

    // UTIL TYPES

    type useStateBooleanFunction = (arg: boolean) => void;
    type useStateDataFunction = (arg: any) => void;

    // ENTITY TYPES

    export interface User {
        name: string,
        picture: string
    }
    export interface Message {
        // type: messageTypes.ERROR | messageTypes.MESSAGE,
        type: string,
        text: string
    }

    // STATES

    export interface CommonState {
        isAuthorized: boolean,
        isLoading: boolean,
        messages: Message[],
        user: User
    }

    export interface MessagesState {
        messages: Message[]
    }

    // PAGES

    export interface AuthPage {}

    export interface MainPage {}

    // COMPS

    export interface Comp {}

    export interface Header {
        name: string
    }
    export interface Loader {
        isForItem?: boolean
    }

    // RESPONSES

    export type FetchUserResponse = {
        data: User
    }
}