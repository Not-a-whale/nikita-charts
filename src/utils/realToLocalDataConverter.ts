import {graphConfig} from "@/shared/constants/graphConfig";

export const realToLocalX = (val : number)  => {
    return graphConfig.drawRectPx.left + val/graphConfig.factorPxToVal.x;
}

export const realToLocalY = (val : number)  => {
    return graphConfig.drawRectPx.bottom - val/graphConfig.factorPxToVal.y;
}