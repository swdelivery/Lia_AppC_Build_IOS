import { GREY } from "./Color";
import { _moderateScale } from "./Scale";

export const styleTo = (val) => {

    var tmp = val.split(':')
    var obj = {}

    switch (tmp[0]) {
        case 'margin-left':
            return {
                marginLeft: Number(tmp[1].slice(0, tmp[1].length - 2))
            };

        case 'margin-right':
            return {
                marginRight: Number(tmp[1].slice(0, tmp[1].length - 2))
            };

        case 'margin-top':
            return {
                marginTop: Number(tmp[1].slice(0, tmp[1].length - 2))
            };

        case 'margin-bottom':
            return {
                marginBottom: Number(tmp[1].slice(0, tmp[1].length - 2))
            };

        case 'text-align':
            return {
                textAlign: tmp[1]
            };
        case 'color':
            return {
                color: tmp[1]
            };
        case 'background-color':
            return {
                backgroundColor: tmp[1]
            };
        case 'font-size':
            return {
                fontSize: _moderateScale(Number(tmp[1].slice(0, tmp[1].length - 2)))
            };
        default:
            return val;
    }

}

export const styleToComponent = (name, sty) => {

      
        switch (name) {
            case 'strong':
                return {...sty, fontWeight: 'bold'}

            case 'i':
                return {...sty, fontStyle:'italic'}

            case 'u':
                return {...sty, textDecorationLine: 'underline',}

            // case 'blockquote':
            //     return {...sty, boderLeftWidth: 2, paddingLeft: _moderateScale(8), boderColor: GREY}
                

            default:
                return sty
        }

}



