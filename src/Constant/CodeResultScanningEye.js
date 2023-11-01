// Giá mỗi lượt quay khi mua
export const PRICE_PER_WHEEL_TURN = "PRICE_PER_WHEEL_TURN"


export const _codeResultScanning = (code) => {
    switch (code) {
        case "MI_LOT":
            return `Mí lót`
        case "HAI_MI":
            return `Hai mí`
        case "MOT_MI":
            return `Một mí`
        case "NHIEU_MI":
            return `Nhiều mí`
        case "DA_DU_IT":
            return `Da dư ít`
        case "DA_DU_MO_DU_NHIEU":
            return `Da dư & Mỡ dư nhiều`
    
        default:
            return ``
    }
}