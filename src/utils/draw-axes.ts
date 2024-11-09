import {drawLineCustom} from "@/utils/draw-line";
import {config} from "@/shared/constants/config";
import {getIntervalLabels} from "@/utils/get-interval-labels";
import {RawData} from "@/shared/types/types";

export const drawAxes = (
    ctx: CanvasRenderingContext2D,
    startx: number,
    endx: number,
    lineWidth: number,
    intervalsx: number,
    labelx: string,
    starty: number,
    endy: number,
    intervalsy: number,
    labely: string,
    data: RawData
) => {
    // draw y axis
    drawLineCustom(
        ctx,
        { x: startx, y: starty },
        { x: startx, y: endy },
        'black',
        lineWidth
    )
    // draw y axis label
   ctx.font = `${config.TEXT_SIZE}px ${config.FONT}`
    ctx.save()
    ctx.translate(startx - 100, (endy - starty) / 2 + starty)
    ctx.rotate(Math.PI * 1.5)
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText(labely, 0, 0)
    ctx.restore()
    // draw x axis
    drawLineCustom(
        ctx,
        { x: startx, y: endy },
        { x: endx, y: endy },
        'black',
        lineWidth
    )
    // draw x axis label
        ctx.fillStyle = 'black'
       ctx.textAlign = 'center'
       ctx.textBaseline = 'top'
       ctx.fillText(labelx, (endx - startx) / 2 + startx, endy + 50)
       for (let x = 0; x <= intervalsx; x++) {
           const xpos = (x * (endx - startx)) / intervalsx + startx
           const data_point_x = getIntervalLabels(data, intervalsx).xLabels[x]
           ctx.fillStyle = 'black'
           ctx.textAlign = 'center'
           ctx.textBaseline = 'top'
           ctx.fillText(data_point_x.toString(), xpos, endy + 10)
       }
    for (let y = 0; y <= intervalsy; y++) {
        const ypos = (y * (endy - starty)) / intervalsy + starty
        const data_point_y = getIntervalLabels(data, intervalsy).yLabels.slice().reverse()[y]
        ctx.fillStyle = 'black'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'right'
        ctx.fillText(data_point_y.toString(), startx - 10, ypos)
        drawLineCustom(
            ctx,
            { x: startx, y: ypos },
            { x: endx, y: ypos },
            y == 0 ? 'gray' : 'gray',
            lineWidth
        )
    }
}
