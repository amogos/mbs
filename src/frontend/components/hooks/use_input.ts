import { useState } from 'react';

export function useInput(placeholder: string, storeValue: (value: string) => void) {
    const [value, setValue] = useState('');
    const onChange = (e: any) => {
        setValue(e.target.value);
        storeValue(e.target.value);
    };
    return { onChange, value, placeholder };
}
