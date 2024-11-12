import {GraphCache} from "@/shared/classes/class";

export const graphConfig = {
    size: {
        width: 800,
        height: 800
    },
    fillColor : ["#FF0000", "#00FF00","#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#C0C0C0", "#FFFFFF"],
    strokeSize : {
        default: 1,
        highlighted: 6
    },
    pointSize : {
        default: 7,
        highlighted: 9
    },
    textSize: 14,
    font: 'sans-serif',
    stickTolerance : 2,
    drawAreaPaddingFactor : 0.1,
    drawAreaRightTopPadding : 20,
    drawRectPx : {left:0, bottom:0, width: 0, height: 0},
    labels : {
        x: [] as number[],
        y: [] as number[]
    },
    dataLimit : {
        x : {min: 0, max: 0, labelPaddingFactor:2},
        y : {min: 0, max: 0, labelPaddingFactor:6}
    },
    factorPxToVal : {x: 0, y: 0},    
    drawAreaZeroPoint :  {x: 0, y: 0},    
    interfaceColor : "lightBlue",
    localPointsCache : [] as GraphCache[],
    baseCtx: {} as CanvasRenderingContext2D,
    interactionCtx : {} as CanvasRenderingContext2D
}
