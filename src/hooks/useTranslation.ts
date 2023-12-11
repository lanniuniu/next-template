import { useRouter } from "next/router";
import en from "@/../public/locales/en.json"; // 英文语言包
import zh from "@/../public/locales/zh.json"; // 中文语言包
import { useCallback } from "react";

const LanguageMap: {
  [key: string]: any;
} = {
  en,
  zh,
};

/**
 * Generates a translation function based on the current router locale.
 *
 * @param {string} key - The key to look up in the language pack.
 * @return {string} The translated text for the given key. If the key is not found or is empty, the key itself is returned.
 */
const useTranslation = () => {
  const router = useRouter();
  const jsonFun = useCallback(
    (key: string) => {
      // 获取当前的语言包里面key所对应的value值
      const keys = key.split(".");
      console.log(keys);
      let translatedText = router.locale && LanguageMap[router.locale];
      console.log(translatedText);

      keys.forEach((k: string) => {
        console.log(k);
        translatedText = translatedText && translatedText[k];
      });
      /*
      如果传key进来，或者没有找到value，就直接返回key就好了，
      页面上就显示key，方便找到漏翻译的字段	
      */
      if (!key || !translatedText) return key;
      return translatedText;
    },
    [router.locale]
  );
  return {
    t: jsonFun,
  };
};

export default useTranslation;
