import React from 'react';

import { useField } from 'formik';

export default function Input({type,label,name,className,onDataChange, disabled}) {
    const [field,meta,helpers] = useField(name);
    
    return (
        <div className={'flex flex-col space-y-1'}>
            <span className={'flex flex-col space-y-1'}>
                <span className={'text-xs'}>
                    {label}
                </span>
                <span>
                    <input disabled={disabled} onBlur={(_)=> {
                        helpers?.setTouched(true);
                    }} type={type} className={className} name={field?.name} onChange={(e)=> {
                        helpers?.setValue(e?.target?.value);
                        if(onDataChange) {
                            onDataChange(e?.target?.value);
                        }
                    }} />
                </span>
            </span>
            {meta?.touched && meta?.error ? <span className='text-red-500 text-xs'>{meta?.error}</span>:<span></span>}
        </div>
    )
}