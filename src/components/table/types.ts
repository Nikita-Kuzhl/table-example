export interface TableWrapperProps {
    head: ITableHead;
    list: ITableRow[];
    sortValue?: string;
}

export interface TableHeadProps {
    head: ITableHead;
    sortValue?: string;
}

export type ITableHead = ITableHeadItem[];

export interface ITableHeadItem {
    label: string;
    value: string;
}

export interface ITableRow {
    id: string;
    columns: ITableColumn[];
}

export interface ITableColumn {
    value: string;
    type: 'img'|'string';
}
