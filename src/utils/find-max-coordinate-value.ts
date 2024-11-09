import {RawData} from "@/shared/types/types";

export const findMaxCoordinateValue = (rawData: RawData): {maxX: number, maxY: number} => {
    return rawData.flatMap(line => line).reduce((acc, point) => {
        return {
            maxX: Math.max(acc.maxX, point.x),
            maxY: Math.max(acc.maxY, point.y)
        }
    }, {maxX: 0, maxY: 0});
}
