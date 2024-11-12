import {graphConfig} from "@/shared/constants/graphConfig";
import {realToLocalX, realToLocalY} from "@/utils/realToLocalDataConverter";


export const drawStaticLayer = ()  => {
    const ctx = graphConfig.baseCtx;
    ctx.beginPath();
    ctx.strokeStyle =  graphConfig.interfaceColor;
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(graphConfig.drawRectPx.left, graphConfig.drawAreaRightTopPadding, graphConfig.drawRectPx.width, graphConfig.drawRectPx.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle =  graphConfig.interfaceColor;
    ctx.textAlign = "center";
    graphConfig.labels.x.forEach(label => {
        ctx.fillText(label.toString(), realToLocalX(label), ctx.canvas.height - (ctx.canvas.height - graphConfig.drawRectPx.bottom)/2 + 2)
    })
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    graphConfig.labels.y.forEach(label => {
        ctx.fillText(label.toString(), graphConfig.drawRectPx.left - 2, realToLocalY(label))
    })
}