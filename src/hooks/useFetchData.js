import { useState, useEffect } from "react";

export default function useFetchData(asyncCallback, state) {

    const [ fetchData, setFetchData ] = useState(null);
    const [ isPending, setIsPending ] = useState(true);

    useEffect(() => {
        setIsPending(true);
        setFetchData(null);
        (async (callback) => {
            const { status, data } = await callback(); 
            setIsPending(false);
            setFetchData(status ? data : null);
        })(asyncCallback);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return [ fetchData, isPending ]
}