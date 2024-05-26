import React, { useState } from 'react';

interface useToggleResponse {
    value: boolean;
    toggle : () => void;
} 

const useToggle = (initialValue: boolean = false):useToggleResponse => {
    const [value, setValue] = useState<boolean>(initialValue);
    const toggle = () => {
        setValue(prevValue => !prevValue)
    }
    return {value, toggle}
};

export default useToggle;