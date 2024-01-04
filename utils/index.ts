export const checkImageURL = (url: string): boolean => {
    if (!url) return false;
    else {
        // const pattern: RegExp = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        const pattern: RegExp = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)(\\?.+)?$', 'i');

        return pattern.test(url);
    }
};

// function to convert object to form data
export const objToFormData = (obj: any): FormData => {
    const formData = new FormData();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
        }
    }

    return formData;
};