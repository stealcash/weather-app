import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
    search: string | number,
    setSearch: Dispatch<SetStateAction<any>>;
    timeout: number,
    placeholder?: string,
    [rest: string]: any;
};
const DebounceInput: React.FC<Props> = (props) => {
    const { search, setSearch, timeout, placeholder = '', ...rest } = props;
    const [value, setValue] = useState<string | number>(search)
    useEffect(() => {
        const dealyFn = setTimeout(() => {
            //update parent state when only certain time pass, this will stop unnecessary call of api 
            setSearch(value)
        }, timeout)
        return () => clearTimeout(dealyFn)
    }, [value, setSearch, timeout])
    return (
        <input
            autoFocus
            placeholder={placeholder}
            autoComplete='off'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...rest}
        />
    )
}

export default DebounceInput

