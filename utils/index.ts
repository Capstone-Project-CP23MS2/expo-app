import { FieldValues } from "react-hook-form";

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

// from: https://github.com/orgs/react-hook-form/discussions/1991#discussioncomment-6135227
export const filterChangedFormFields = <T extends FieldValues>(
    allFields: T,
    dirtyFields: Partial<Record<keyof T, boolean | boolean[]>>,
): Partial<T> => {
    const changedFieldValues = Object.keys(dirtyFields).reduce((acc, currentField) => {
        const isDirty = Array.isArray(dirtyFields[currentField])
            ? (dirtyFields[currentField] as boolean[]).some(value => value === true)
            : dirtyFields[currentField] === true;
        if (isDirty) {
            return {
                ...acc,
                [currentField]: allFields[currentField],
            };
        }
        return acc;
    }, {} as Partial<T>);

    return changedFieldValues;
};

export const removeObjectFromArrayById = (arr: any[], id: number, key: string) => {
    const index = arr.findIndex((item) => item[key] === id);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};
