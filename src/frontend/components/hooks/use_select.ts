import { useState } from 'react';

export function useSelect(placeholder: string, storeValue: (value: number) => void) {
    const [value, setValue] = useState(1);
    const onChange = (e: number) => {
        setValue(e);
        storeValue(e);
    };
    return { onChange, value, placeholder };
}
