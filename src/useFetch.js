import { useState, useEffect } from "react";

const useFetch = (uri) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        if(!uri) return;
        fetch(uri)
        .then((data) => data.json())
        .then(setData)
        .then(()=>setLoading(false))
        .catch(setError)
    }, [uri])

    return [loading, data, error]
}

export default useFetch;