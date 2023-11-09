const removeWarning = () =>
{
    console.ignoredYellowBox = ['Warning: ReactNative.createElement'];
    console.disableYellowBox = true;
};

const removeLog = () =>
{
    console.log = () =>
    {
    };
    console.warn = () =>
    {
    };
    console.error = () =>
    {
    };
    removeWarning();
};

const showFetchLogger = () =>
{
    if (GLOBAL.originalXMLHttpRequest)
    {
        XMLHttpRequest = GLOBAL.originalXMLHttpRequest;
        global._fetch = fetch;
        global.fetch = function (uri, options, ...args)
        {
            return global._fetch(uri, options, ...args).then((response) =>
            {
                return response;
            });
        };
    }
    // fetch logger
};

export const isDebug = () => (__DEV__);

if (isDebug())
{
    console.log('DEBUG MODE');
    removeWarning();
    // showFetchLogger();
} else
{
    removeLog();
}

export const setLogStyle = color => `background: ${color}; padding: 2px 5px; color: #fff;`;
export const useLogStyle = "%c";
