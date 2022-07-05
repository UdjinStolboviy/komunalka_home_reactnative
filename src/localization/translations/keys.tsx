export type TranslationKeys_Auth = 'Auth_Personal_Info' | 'Auth_Save';

export type TranslationKeysSetting =
  | 'Setting_Language'
  | 'Setting_Chose_language';

export type TranslationKeysMain =
  | 'Main_Save'
  | 'Main_Interests'
  | 'Main_What_Are_You_Interested_In';

export type TranslationKeys =
  | TranslationKeys_Auth
  | TranslationKeysSetting
  | TranslationKeysMain;

export type TranslationDict = Record<TranslationKeys, string>;
