export const numberRegex = new RegExp('^[0-9]+$');
export const persianCharsRegex = new RegExp('[\u0620-\u064a]|[\ufb80-\ufefc]');
export const englishCharsRegex = new RegExp('^[a-zA-Z]+$');
export const asciiCharRegex = new RegExp('^[\x00-\xFF]+$');
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const mobileNumberRegex = new RegExp('^(09|9)\\d{9}')