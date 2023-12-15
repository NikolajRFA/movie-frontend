export default class Utils {
    static truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

    static capitalize = (s) => s.substring(0, 1).toUpperCase() + s.substring(1);
}