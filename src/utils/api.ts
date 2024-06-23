/**
 * @desc Функция обработки пагинации
 * @param array Массив объектов
 * @param offset Пропуск элементов
 * @param limit Кол-во элементов
 * @returns Отфильтрованный массив объектов
 */
export const getPaginatedData = <T>(
    array:T[],
    offset: number,
    limit: number
):T[] => {
    if(!array.length) return array;
    if(limit < 0) return array.slice(offset);
    return array.slice(offset, offset + limit);
};

/**
 * @desc Функция поиска значений в массиве вложенных объектов
 * @param array Массив объектов
 * @param searchValue Значение для поиска
 * @param searchKeys Ключи объекта, по которым выполняется поиск
 * @returns Отфильтрованный массив объектов
 */
export const searchNestedObjArray = <T>(
    array: T[],
    searchValue: string,
    searchKeys: Array<keyof T|string>
): T[] => {
    if(!array.length) return array;
    return array.filter((obj) => {
        return searchKeys.some((key) => {
            const path:string[] = typeof key === "string" ? key?.split('.'): []; // Разделит ключ на части по "."
            let currentObj = obj;

            for (const part of path) {
                if (typeof currentObj !== 'object' || currentObj === null) {
                    return false; // Прервать поиск, если объект не найден
                }

                currentObj = currentObj[part as keyof typeof currentObj] as T; // Перейти к следующему уровню вложенности
            }

            if (typeof currentObj === 'string') {
                return currentObj.toLowerCase().includes(searchValue.toLowerCase());
            } else {
                return false; // Не обрабатывает не строковые значения
            }
        });
    });
};


/**
 * @desc Функция сортировки массива объектов по нескольким ключам
 * @param array - Массив объектов
 * @param sortKeys - Ключи объекта, по которым выполняется сортировка
 * @param [ascending=true] - Указывает, сортировать ли по возрастанию (true) или по убыванию (false)
 * @returns Отсортированный массив объектов
 */
export const sortByKeys = <T>(
    array: T[],
    sortKeys: Array<keyof T | string>,
    ascending = true
): T[] => {
    if (!array.length) return array;

    const compareFn = (a: T, b: T): number => {
        for (const sortKey of sortKeys) {
            const keys = sortKey.toString().split('.');
            let aValue: unknown = a;
            let bValue: unknown = b;

            for (const key of keys) {
                aValue = (aValue as Record<string, unknown>)[key];
                bValue = (bValue as Record<string, unknown>)[key];
            }

            if (typeof aValue === 'string' && typeof bValue === 'string' && aValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/) && bValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)) {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue);
                if (comparison !== 0) return ascending ? comparison : -comparison;
            }

            if (aValue === undefined || bValue === undefined) {
                return ascending ? (aValue === undefined ? 1 : -1) : (bValue === undefined ? 1 : -1);
            }

            if (aValue === null || bValue === null) {
                return ascending ? (aValue === null ? 1 : -1) : (bValue === null ? 1 : -1);
            }

            const comparison = aValue < bValue ? -1 : (aValue > bValue ? 1 : 0);
            if (comparison !== 0) return ascending ? comparison : -comparison;
        }

        return 0;
    };

    return array.slice().sort(compareFn);
};
