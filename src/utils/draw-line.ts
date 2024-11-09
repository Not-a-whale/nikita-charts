import {Context} from "@/shared/types/types";
import {LineSegment, Point} from "@/shared/classes/class";
import {config} from "@/shared/constants/config";

export const drawLine = (ctx: Context,
                  line: LineSegment,
                  hovered: boolean) => {
    let [color, width] = ['', 0]
    if (hovered) {
        color = config.COLOR_LINE_HOVERED
        width = config.STROKE_SIZE_HOVERED
    } else {
        color = config.COLOR_LINE_NORMAL
        width = config.STROKE_SIZE_NORMAL
    }
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(line.start.x, line.start.y)
    ctx.lineTo(line.end.x, line.end.y)
    ctx.stroke()
}

export const drawLineCustom = (
    ctx: Context,
    start: Point,
    end: Point,
    color: string,
    width: number
) => {
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
}
