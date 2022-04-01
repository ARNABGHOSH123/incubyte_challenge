import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ViewAllWords({viewEnabled}) {

    const [allWords,setAllWords] = useState([]);

    useEffect(()=> {
        let isMounted = true;
        if(isMounted && viewEnabled) {
            axios?.get(`${process.env.REACT_APP_BACKEND_URL}/all-words`)?.then((response)=> {
                setAllWords(response?.data);
            })?.catch((_)=> {
                setAllWords([]);
            })
        }
        return () => {
            isMounted = false;
        }
    },[viewEnabled])

    if(!viewEnabled) {
        return null;
    }

    return (
        <ol>
            {allWords?.map((wordObj,idx)=> {
                return <li key={idx}>* {wordObj?.word}</li>
            })}
        </ol>
    )

}