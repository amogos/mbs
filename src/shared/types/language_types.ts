export const NullLanguage = (): LanguageRecordType => {
    return { id: 0, title: '' };
};

export interface LanguageRecordType {
    id: number;
    title: string;
}
