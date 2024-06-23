/**
 * Преобразует строку запроса в объект
 * @param  qs - Строка запроса (Search Query)
 * @returns Объект
 */
export function queryToQueryObject<T extends Record<string, string>>(qs: string): T {
    const obj: Record<string, string> = {};
    if (qs) {
        const params = qs.replace('?', '').split('&');
        params.forEach(param => {
            const name = param.split('=')[0];
            const value = param.split('=')[1];
            if (name && value) {
                obj[name] = value;
            }
        });
    }
    return obj as T;
}


/**
 * Преобразует объект в строку запроса
 * @param  obj - Объект
 * @returns Строка запроса(Search Query)
 */
export function objectToQuery<T>(obj: T): string {
    let qs = '';

    for (const name in obj) {
        if (obj[name] || obj[name] === 0 || obj[name] === false) {
            qs += `${name}=${obj[name]}&`;
        }
    }
    return qs.slice(0, -1);
}
