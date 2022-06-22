export interface IValidationError {
    title: string;
    description?: string;
}


export class Validations {

    public static readonly MIN_NAME_LENGTH: number = 0;
    public static readonly MAX_PHONE_LENGTH: number = 20;
    public static readonly MIN_CODE_FROM_EMAIL_VALIDATIONS_LENGTH: number = 6;
    public static readonly MIN_PHONE_NUMBER_LENGTH: number = 6;
    public static readonly MAX_INDUSTRIES_INPUT_LENGTH: number = 32;
    public static readonly MAX_BUSINESS_TYPE_INPUT_LENGTH: number = 20;
    public static readonly MAX_LOCATION_INPUT_LENGTH: number = 20;
    public static readonly MIN_YEAR: number = 1000;
    public static readonly MAX_COMPANY_NAME_INPUT_LENGTH: number = 32;
    public static readonly MAX_PHONE_LENGTH_WITHOUT_CODE: number = 14;
    public static readonly MIN_PHONE_LENGTH_WITHOUT_CODE: number = 9;
    public static readonly MAX_OPPORTUNITY_DESCRIPTION_SYMBOLS_NUMBER: number = 500;
    public static readonly MAX_ABOUT_ME_SYMBOLS_NUMBER: number = 256;
    public static readonly MAX_COMPANY_DESCRIPTION_SYMBOLS_NUMBER: number = 500;
    public static readonly COMPANY_FOUNDED_SYMBOLS_NUMBER: number = 4;
    public static readonly MAX_COMPANY_INDUSTRIES_NUMBER: number = 3;
    public static readonly MAX_COMPANY_BUSINESS_TYPES_NUMBER: number = 3;
    public static readonly MAX_INDUSTRIES_NUMBER: number = 10;

    public static readonly ALL_FIELDS_VALIDATION_ERROR: IValidationError = {
        title: 'All fields required',
    };

    public static readonly PLEASE_ENTER_A_VALID_NAME_VALIDATION_ERROR: IValidationError = {
        title: 'First name:',
        description: 'Please enter a valid name. Please enter all information in English.'

    };

    public static readonly PLEASE_ENTER_A_VALID_DEPARTMENT: IValidationError = {
        title: 'Please enter a valid department.',
    };

    public static readonly PLEASE_ENTER_A_VALID_POSITION: IValidationError = {
        title: 'Please enter a valid position.',
    };

    public static readonly PLEASE_ENTER_A_VALID_LAST_NAME_VALIDATION_ERROR: IValidationError = {
        title: 'Last name:',
        description: 'Please enter a valid name. Please enter all information in English.'
    };

    public static readonly PLEASE_ENTER_A_VALID_COMPANY_NAME_VALIDATION_ERROR: IValidationError = {
        title: 'Company:',
        description: 'Please enter a valid name. Please enter all information in English.'
    };

    public static readonly PLEASE_ENTER_A_VALID_EMAIL_VALIDATION_ERROR: IValidationError = {
        title: 'Email:',
        description: 'Please enter a valid email. Please enter all information in English.'
    };

    public static readonly PLEASE_ENTER_A_VALID_URL_VALIDATION_ERROR: IValidationError = {
        title: 'Website:',
        description: 'Please enter a valid website. Please enter all information in English.'
    };

    public static readonly PLEASE_ENTER_A_VALID_PHONE_NUMBER_VALIDATION_ERROR: IValidationError = {
        title: 'Phone:',
        description: 'Please enter a valid phone.'
    };

    public static readonly PLEASE_ENTER_A_VALID_LOCATION_VALIDATION_ERROR: IValidationError = {
        title: 'Please select a location.',

    }

    public static readonly PLEASE_FILL_ABOUT_SECTION: IValidationError = {
        title: 'Please fill the About me section.',

    }
}
