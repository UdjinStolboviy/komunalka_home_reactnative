import { Validations } from "app/assets/constants/codes/Validations";

const urlRegex = require('url-regex');

export const validateName = (name: string): boolean => {
  const nameToValidate = name.trim();
  const wordsSeparatedBySpaceValid = nameToValidate.split(' ').length <= 2;
  const wordsSeparatedByHyphenValid = nameToValidate.split('-').length <= 2;
  const hyphenLast = nameToValidate[nameToValidate.length - 1] === '-';
  const allSpaces = nameToValidate.length === 0;
  if (!wordsSeparatedByHyphenValid || !wordsSeparatedBySpaceValid || hyphenLast || allSpaces) {
    return false;
  }
  const nameRegExp = RegExp(/^[a-zA-Z- ]*$/);
  return !!nameToValidate && nameToValidate.length >= Validations.MIN_NAME_LENGTH && nameRegExp.test(name);
};

export const validateEmail = (email: string): boolean => {
  const emailRegExp = RegExp(/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,10})+$/);
  return !!email && emailRegExp.test(email);
};

export const validateWebsite = (website: string): boolean => {
  const regex = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i');
  return regex.test(website)
};

export const validateNameWithSpaces = (name: string): boolean => {
  const nameWithSpacesRegExp = RegExp(/^[A-Za-z0-9 \"“”'‘’()[\]{}<>«»\\\/?!&@£$€¥.:;,-]{3}[*=#%+A-Za-z0-9 \"“”'‘’()[\]{}<>«»\\\/?!&@£$€¥.:;,-]{0,157}$/);
  return !!name && nameWithSpacesRegExp.test(name);
};
export const validateNumberWithSpaces = (text: string): boolean => {
  const nameWithSpacesRegExp = RegExp(/^[0-9 \.]{0}[0-9 \.]{0,30}$/);
  return !!text && nameWithSpacesRegExp.test(text);
};

export const validateCompanyName = (name: string): boolean => {
  const regex = RegExp(/^[a-zA-Z0-9?><;,{}[\]\-_+=!@#$%\^&*|'%]* $/);
  return !!name && regex.test(name);
};

export const validateLettersAndNumbers = (input: string): boolean => {
  const regex = RegExp('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$');
  return !!input && regex.test(input);
};

export const validateCode = (code: string): boolean => {
  return !!code && code.length === Validations.MIN_CODE_FROM_EMAIL_VALIDATIONS_LENGTH;
};

//todo use lib
export const isHttpSeparator = (input: string): boolean => {
  if (!input) return false;
  const array = input.split('://');
  return array.length > 1;
};

export const validateMobileNumber = (phoneNumber: string): boolean => {
  const phoneRegex = RegExp(/^[+\d](?:.*\d)?$/);
  return phoneRegex.test(phoneNumber) && phoneNumber.length > Validations.MIN_PHONE_NUMBER_LENGTH
};

export const validateYear = (year: string): boolean => {
  const numberYear: number = parseInt(year, 10);
  if (!numberYear) return false;
  const currentYear: number = new Date().getFullYear();
  return numberYear >= Validations.MIN_YEAR && numberYear <= currentYear;
};

