export const handleApi = async (func) => {
    if (typeof func !== 'function') return { error: true };
    return func()
        .then(data => {
            return ({ error: false, ...data });
        })
        .catch(error => {
            return ({ error: true, error });
        });
};
