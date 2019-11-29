export interface CategoryRecordType {
    id: number;
    title: string;
}
export const NullCategoryRecordType = (): CategoryRecordType => {
    return { id: 0, title: '' };
};
