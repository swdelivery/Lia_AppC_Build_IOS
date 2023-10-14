import ScreenKey from './src/Navigation/ScreenKey'


const config = {
    screens: {
        HOME: {
            path: "home",
        },
        AFFILIATE: {
            path: "news",
        },
    },
};

const linking = {
    prefixes: ["liavietnam://app"],
    config,
};

export default linking;