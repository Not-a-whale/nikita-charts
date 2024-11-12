import {graphConfig} from "@/shared/constants/graphConfig";

export const realToLocalX = (val : number)  => {
    return graphConfig.drawAreaZeroPoint.x + val/graphConfig.factorPxToVal.x;
}

export const realToLocalY = (val : number)  => {
    return graphConfig.drawAreaZeroPoint.y - val/graphConfig.factorPxToVal.y;
}