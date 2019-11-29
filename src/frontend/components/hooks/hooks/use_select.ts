import { useState } from 'react';

export function useSelect(defaultValue: string, storeValue: (value: string) => void) {
    const [value, setValue] = useState(defaultValue);
    const onChange = (e: string) => {
        setValue(e);
        storeValue(e);
    };
    return { onChange, value, defaultValue };
}
