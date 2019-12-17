export interface CategoryRecordType {
    id: number;
    title: string;
    count: number;
}
export const NullCategoryRecordType = (): CategoryRecordType => {
    return { id: 0, title: '', count: 0 };
};

export interface CategoryRecordValueType {
    title: string;
    count: number;
}

export const NullCategoryRecordValueType = (): CategoryRecordValueType => {
    return { title: '', count: 0 };
};
