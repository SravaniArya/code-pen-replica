import { useEffect, useState } from "react";

const PREFIX_CP = "cp-"

export default function useStorageState(key,initialValue){
    const prefixedKey = PREFIX_CP + key;
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue!=null) return JSON.parse(jsonValue)

        if(typeof initialValue == 'function'){
            return initialValue()
        }else{
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    },[prefixedKey,value])

    return [value,setValue]
}