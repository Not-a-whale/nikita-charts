import {graphConfig} from "@/shared/constants/graphConfig";
import {exampleData} from "@/shared/constants/exampleData";
import {realToLocalX, realToLocalY} from "@/utils/realToLocalDataConverter";
import { GraphCache } from "@/shared/classes/class";

export const updateGraphConfig = (input: number[][][], staticCtx : CanvasRenderingContext2D, interactionCtx : CanvasRenderingContext2D)  => {
    graphConfig.baseCtx = staticCtx;
    graphConfig.interactionCtx = interactionCtx;
    input.flat().forEach(point => {
        updateLimits(graphConfig.dataLimit.x, point[0]);
        updateLimits(graphConfig.dataLimit.y, point[1])
    });
    addViewGraphPadding(graphConfig.dataLimit.x);
    addViewGraphPadding(graphConfig.dataLimit.y);
    
    staticCtx.font = `${graphConfig.textSize}px ${graphConfig.font}`;

    const textMetricsX = staticCtx.measureText(getLongerTextToMeasure(graphConfig.dataLimit.x).toString());
    graphConfig.drawRectPx.bottom = graphConfig.size.height - Math.ceil((textMetricsX.actualBoundingBoxAscent + textMetricsX.actualBoundingBoxDescent) * 2);
    graphConfig.drawRectPx.height = graphConfig.drawRectPx.bottom - graphConfig.drawAreaRightTopPadding;

    const texMetricsY = staticCtx.measureText(getLongerTextToMeasure(graphConfig.dataLimit.y).toString());
    graphConfig.drawRectPx.left = Math.ceil(texMetricsY.width);
    graphConfig.drawRectPx.width = graphConfig.size.width - graphConfig.drawRectPx.left - graphConfig.drawAreaRightTopPadding;

    const labelMaxCountX = Math.ceil(graphConfig.drawRectPx.width/textMetricsX.width - 1);
    const labelMaxCountY = Math.ceil(graphConfig.drawRectPx.height/(texMetricsY.actualBoundingBoxAscent + texMetricsY.actualBoundingBoxDescent) - 1);

    fillLabels(graphConfig.dataLimit.x, labelMaxCountX, graphConfig.labels.x);
    fillLabels(graphConfig.dataLimit.y, labelMaxCountY, graphConfig.labels.y);

    graphConfig.factorPxToVal.x = calculatePxToValFactor(graphConfig.dataLimit.x, graphConfig.drawRectPx.width);
    graphConfig.factorPxToVal.y = calculatePxToValFactor(graphConfig.dataLimit.y, graphConfig.drawRectPx.height);

    // shifting zero point of the axis from the left bottom corner
    graphConfig.drawAreaZeroPoint.x = graphConfig.dataLimit.x.min >= 0 ? graphConfig.drawRectPx.left : graphConfig.drawRectPx.left - graphConfig.dataLimit.x.min/graphConfig.factorPxToVal.x;
    graphConfig.drawAreaZeroPoint.y = graphConfig.dataLimit.y.min >= 0 ? graphConfig.drawRectPx.bottom : graphConfig.drawRectPx.bottom + graphConfig.dataLimit.y.min/graphConfig.factorPxToVal.y;

    exampleData.forEach((graph, index) => {
        const cGraph : number[][] = [];
        graph.forEach(point => {
            cGraph.push([realToLocalX(point[0]), realToLocalY(point[1])])
        })
        graphConfig.localPointsCache.push(new GraphCache(index, cGraph));
    });    

    function updateLimits(axis : {min : number, max:number}, val:number){
        axis.min = Math.min(axis.min,  val);
        axis.max = Math.max(axis.max,  val);
    }

    function addViewGraphPadding(axis : {min : number, max:number}){
        const dist = axis.max - axis.min;
        const delta =  dist*graphConfig.drawAreaPaddingFactor;
        const minBackup = axis.min;
        axis.min -= delta;
        if (axis.min < 0 && minBackup >= 0) axis.min = 0;
        axis.max += delta;
    }

    function getLongerTextToMeasure(axis : {min : number, max:number}) {
        return Math.ceil(Math.abs(axis.min) > Math.abs(axis.max) ? axis.min : axis.max)*10;
    }

    function  getNiceLookingPeriod(axis : {min : number, max:number, labelPaddingFactor:number}, maxLabelCount : number) {
        const optimalLabelCount = Math.ceil(maxLabelCount/axis.labelPaddingFactor);
        let period = Math.ceil((axis.max - axis.min)/optimalLabelCount + 5);
        if (period > 10){
            const exponent = period.toString().length - 1;
            period = Math.trunc(period/Math.pow(10,exponent))*Math.pow(10,exponent);
        } else {
            period -= 5;
        }
        return period;
    }
    function fillLabels(axis : {min : number, max:number, labelPaddingFactor:number}, maxCount:number, labels : number[]){
        const labelPeriod = getNiceLookingPeriod(axis, maxCount);
        const add = axis.min >= 0 ? 1 : 0;
        let currPos = Math.trunc(axis.min/labelPeriod + add)*labelPeriod;
        while (currPos <= axis.max){
            labels.push(currPos);
            currPos += labelPeriod;
        }
    }

    function calculatePxToValFactor(axis : {min : number, max:number}, pxDist : number){
        return (axis.max-axis.min)/pxDist;
    }
}
