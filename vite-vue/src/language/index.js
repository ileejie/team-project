import { createI18n } from 'vue-i18n';
import zh from './zh';
import en from './en';

const messages = {
    en,
    zh,
}
console.log(navigator.language);
const language = (navigator.language || 'en').toLocaleLowerCase(); // 这是获取浏览器的语言
const i18n = createI18n({
    locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'en', // 设置备用语言
    messages,
    legacy: false, //不然会报错Uncaught SyntaxError: Not available in legacy mode
})

export default i18n;
