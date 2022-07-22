import React, {ReactNode, useCallback, useEffect} from 'react';
import RNRestart from 'react-native-restart';
import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import {TranslationDict, TranslationKeys} from './translations/keys';
import {he} from './translations/he';
import {en} from './translations/en';
import {cn} from './translations/cn';

import {AsyncStorageFacade, AsyncStorageKey} from 'app/data/async-storege';

export enum AppLanguage {
  English = 'en',
  China = 'cn',
  Hebrew = 'he',
}

export type TranslateFunction = (key: TranslationKeys) => string;

export type ChangeLanguageFunction = (languageTag: string) => void;

export let currentLanguageTag: string = AppLanguage.English;

export interface Props {
  children?: React.ReactNode;
}

export interface LocalizationContext {
  currentLanguageTag: string;
  translate: TranslateFunction;
  changeLanguage: ChangeLanguageFunction;
}

interface ILanguageConfig {
  languageTag: string;
  isRTL: boolean;
}

const translations: {[locale: string]: TranslationDict} = {
  en,
  cn,
  he,
};

const getSavedLanguageTag = async (): Promise<string | undefined> => {
  const availableLanguageTags: string[] = Object.keys(translations);

  const savedLanguageTag: string | null = await AsyncStorageFacade.getString(
    AsyncStorageKey.LanguageTag,
  );

  if (
    savedLanguageTag !== null &&
    availableLanguageTags.includes(savedLanguageTag)
  ) {
    return savedLanguageTag;
  }
};

const getLanguageConfig = (languageTag: string): ILanguageConfig => {
  switch (languageTag) {
    case AppLanguage.English: {
      return {languageTag, isRTL: false};
    }
    case AppLanguage.China: {
      return {languageTag, isRTL: false};
    }
    case AppLanguage.Hebrew: {
      return {languageTag, isRTL: true};
    }
    default: {
      throw Error('Unknown language!');
    }
  }
};

const setI18nConfig = async () => {
  let languageTag: string | undefined = await getSavedLanguageTag();

  if (languageTag === undefined) {
    const availableLanguageTags: string[] = Object.keys(translations);
    languageTag = RNLocalize.findBestAvailableLanguage(
      availableLanguageTags,
    )?.languageTag;
  }

  if (languageTag === undefined) {
    languageTag = AppLanguage.English;
  }

  const languageConfig = getLanguageConfig(languageTag);
  currentLanguageTag = languageConfig.languageTag;

  if (I18nManager.isRTL !== languageConfig.isRTL) {
    I18nManager.allowRTL(languageConfig.isRTL);
    I18nManager.forceRTL(languageConfig.isRTL);
    RNRestart.Restart();
  }
};

export const localizationContext = React.createContext<LocalizationContext>({
  currentLanguageTag: '',
  translate: () => '',
  changeLanguage: () => '',
});

const LocalizationContextWrapper: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  useEffect(() => {
    setI18nConfig();
  }, []);

  const translate: TranslateFunction = useCallback((key: TranslationKeys) => {
    return translations[currentLanguageTag][key];
  }, []);

  const changeLanguage: ChangeLanguageFunction = useCallback(
    async (languageTag: string) => {
      if (currentLanguageTag !== languageTag) {
        await AsyncStorageFacade.saveString(
          AsyncStorageKey.LanguageTag,
          languageTag,
        );
        await setI18nConfig();
      }
    },
    [],
  );

  return (
    <localizationContext.Provider
      value={{
        currentLanguageTag: currentLanguageTag,
        translate,
        changeLanguage,
      }}>
      {children}
    </localizationContext.Provider>
  );
};

export default LocalizationContextWrapper;
