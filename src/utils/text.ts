/**
 * @param val - ISO формат даты
 * @returns string - DD.MM.YYYY
 */
export const getFormatedDate = (val: string): string => {
    const date = new Date(val);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
