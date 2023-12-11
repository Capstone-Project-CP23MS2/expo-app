export const checkImageURL = (url: string): boolean => {
    if (!url) return false;
    else {
        // const pattern: RegExp = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        const pattern: RegExp = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)(\\?.+)?$', 'i');

        return pattern.test(url);
    }
};