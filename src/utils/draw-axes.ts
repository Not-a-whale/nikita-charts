/*import {graphConfig} from "@/shared/constants/graphConfig";

export const drawStaticLayer = (
    ctx: CanvasRenderingContext2D,
    data: [][][]
) => {
    let limits = getRealLimits(data);
    viewConfig.xLimit.lower =


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
    ctx.fillStyle = 'lightBlue'
    ctx.textAlign = 'center'
    ctx.fillText(labely, 0, 0)
    ctx.restore()
    // draw x axis
    drawLineCustom(
        ctx,
        { x: startx, y: endy },
        { x: endx, y: endy },
        'lightBlue',
        lineWidth
    )
    // draw x axis label
        ctx.fillStyle = 'lightBlue'
       ctx.textAlign = 'center'
       ctx.textBaseline = 'top'
       ctx.fillText(labelx, (endx - startx) / 2 + startx, endy + 50)
       for (let x = 0; x <= intervalsx; x++) {
           const xpos = (x * (endx - startx)) / intervalsx + startx
           const data_point_x = getIntervalLabels(data, intervalsx).xLabels[x]
           ctx.fillStyle = 'lightBlue'
           ctx.textAlign = 'center'
           ctx.textBaseline = 'top'
           ctx.fillText(data_point_x.toString(), xpos, endy + 10)
       }
    for (let y = 0; y <= intervalsy; y++) {
        const ypos = (y * (endy - starty)) / intervalsy + starty
        const data_point_y = getIntervalLabels(data, intervalsy).yLabels.slice().reverse()[y]
        ctx.fillStyle = 'lightBlue'
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
*/