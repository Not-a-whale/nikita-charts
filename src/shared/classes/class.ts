import {graphConfig} from "@/shared/constants/graphConfig";

export class GraphCache{
    static counter : number = 0;
    static pointCheckRange: number = graphConfig.pointSize.default/2+1;
    static lineCheckRange: number = graphConfig.strokeSize.default/2+1;
    id: number;
    order: number;
    points : number[][];
    color : string;
    interactionPointIndex: number = -1;
    interactionSegmentEndIndex: number = -1;
    
    constructor(id: number, points: number[][]) {
        GraphCache.counter++;
        this.id = this.order = id;
        this.points = points;
        this.color = graphConfig.fillColor[id%graphConfig.fillColor.length];
    }

    checkInteraction(x:number, y :number){
        this.interactionPointIndex = this.points.findIndex(checkPoint);
        if (this.interactionPointIndex !== -1){
            this.interactionSegmentEndIndex = -1;            
        } else{
            this.interactionSegmentEndIndex = this.points.findIndex(checkSegment);           
        }

        function checkPoint(point: number[]){
            const x1 = point[0];
            const y1 = point[1];
            return (Math.abs(x1-x) <= GraphCache.pointCheckRange) && (Math.abs(y1-y) <= GraphCache.pointCheckRange);
        }

        function checkSegment(point: number[], index : number, allPoints : number[][]){
            if (index === 0) return false;
            const x1 = allPoints[index-1][0];
            const x2 = point[0];

            const y1 = allPoints[index-1][1];
            const y2 = point[1];
            return (Math.abs((x-x1)*(y2-y1)-(y-y1)*(x2-x1)) <= 500);  
        }
    }

    setHighestOrder(){
        this.order = GraphCache.counter++;
    }
}