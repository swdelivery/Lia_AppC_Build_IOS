import { useCallback, useEffect, useRef, useState } from "react"

export const useToggle = (initState = false) => {


    const [state, setState] = useState(initState);

    // use UseCallBack to avoid Re-render Component, cache data function
    const toggle = useCallback(() => {
        setState(_state => !_state)
    }, [])
    return [state, toggle]

}

export const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);


    const execute = useCallback((dataFetch = null) => {
        console.log({ pending: 'pending' });
        setStatus("pending");
        setValue(null);
        setError(null);
        return asyncFunction(dataFetch)
            .then((response) => {
                setValue(response);
                console.log({ success: 'success' });
                setStatus("success");
            })
            .catch((error) => {
                setError(error);
                console.log({ error: 'error' });
                setStatus("error");
            });
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, value, error };
}

export const useWhyDidYouUpdate = (name, props) => {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef();
    useEffect(() => {
        if (previousProps.current) {
            // Get all keys from previous and current props
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            console.log({allKeys});
            // Use this object to keep track of changed props
            const changesObj = {};
            // Iterate through keys
            allKeys.forEach((key) => {
                // If previous is different from current
                if (previousProps.current[key] !== props[key]) {
                    // Add to changesObj
                    changesObj[key] = {
                        from: previousProps.current[key],
                        to: props[key],
                    };
                }
            });
            // If changesObj not empty then output to console
            if (Object.keys(changesObj).length) {
                console.log("[why-did-you-update]", name, changesObj);
            }
        }
        // Finally update previousProps with current props for next hook call
        previousProps.current = props;
    });
}