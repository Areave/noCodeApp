import {envMode} from "./utils/enums";

const hostname =( process.env.NODE_ENV === envMode.PRODUCTION) ?
    '' : 'http://localhost:3000/assets/stub/';
export const userEndpoint = hostname + 'user.json';

export const toastTimeout = 4000;
export const GOOGLE_CLIENT_ID = '871750554909-04pasva29etn40b6igfq7k4auh4158je.apps.googleusercontent.com';
export const GOOGLE_CLIENT_SECRET = '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';
