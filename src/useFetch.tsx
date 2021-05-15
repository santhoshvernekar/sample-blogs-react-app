import { useEffect, useState } from "react";

const useFetch = (url: any) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data')
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data)
                    setError(null);
                    setData(data);
                    setIsPending(false);
                })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log("Fetch aborted");
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 1000);

        return () => abortCont.abort();
    }, [url]);

    return {
        data, isPending, error
    };
}

export default useFetch;