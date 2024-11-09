import {RawData} from "@/shared/types/types";
import {findMaxCoordinateValue} from "@/utils/find-max-coordinate-value";

export const getIntervalLabels = (polyLines: RawData, numLines: number) => {
    const {maxX, maxY} = findMaxCoordinateValue(polyLines);

    const numXLabels = numLines + 1;
    const numYLabels = numLines + 1;


    const xLabels = [];
    const incrementX = maxX / (numXLabels - 1);
    for (let i = 0; i < numXLabels; i++) {
        xLabels.push(String(i * incrementX));
    }

    const yLabels = [];
    const incrementY = maxY / (numYLabels - 1);
    for (let i = 0; i < numYLabels; i++) {
        yLabels.push(String(i * incrementY));
    }

    return {xLabels, yLabels};
}
