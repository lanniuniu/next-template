import { useRouter } from 'next/router'
import en from "@/../public/locales/en.json"; // 英文语言包
import zh from "@/../public/locales/zh.json"; // 中文语言包
import { useCallback } from "react";

const LanguageMap = {
  en,
  zh,
};

/**
 * Generates a translation function that retrieves the value corresponding to a given key in the current language pack.
 * If the key is not found or not provided, the key itself is returned, allowing easy identification of untranslated fields.
 * Supports parameterized translations, where placeholders in the value string are replaced with actual values provided in the params object.
 *
 * @param {any} key - The key to look up in the language pack.
 * @param {any} params - An object containing key-value pairs of parameters to be replaced in the translated value.
 * @return {any} The translated value, with placeholders replaced by actual values.
 */
const useTranslation = () => {
  const router = useRouter();
  const jsonFun = useCallback(
    (key: any, params: any = {}) => {
      // 获取当前的语言包里面key所对应的value值
      // @ts-ignore
      let value = LanguageMap[router.locale][key];
      /*
		如果传key进来，或者没有找到value，就直接返回key就好了，
		页面上就显示key，方便找到漏翻译的字段	
	  */
      if (!key || !value) return key;

      /*
		这里是为了能够让我们写的hook能支持传参，比如找到的value为'{name}
		今年{age}岁啦～'，这里的nameg和age都是为参数，也就是后面可以这种
		形式传进来:
		const { t } = useTranslation()
		<div>{ t('app.message',{name:"张三", age:18}) }</div>
		// 翻译后的结果就是
		<div>张三今年18岁啦～</div>
	  */
      Object.keys(params).forEach((item) => {
        value = value.replace(new RegExp(`{${item}}`, "g"), params[item]);
      });
      return value;
    },
    [router.locale]
  );
  return {
    t: jsonFun,
  };
};

export default useTranslation;
