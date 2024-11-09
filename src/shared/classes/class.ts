export class GraphPoint {
    x: number
    y: number
    data: Point
    hovered: boolean

    constructor(x: number, y: number, data: Point) {
        this.x = x
        this.y = y
        this.data = data
        this.hovered = false
    }
}

export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class LineSegment {
    start: Point
    end: Point

    constructor(start: Point, end: Point) {
        this.start = start
        this.end = end
    }
}

export class PolyLine {
    public points: GraphPoint[] = []
    public hovered: boolean = false

    constructor(points?: GraphPoint[]) {
        this.points = points || []
        this.hovered = false
    }
}
