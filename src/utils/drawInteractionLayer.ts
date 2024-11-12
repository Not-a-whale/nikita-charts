import {graphConfig} from "@/shared/constants/graphConfig";

export const drawInteractionLayer = ()  => {
    const ctx = graphConfig.interactionCtx;
    ctx.beginPath();
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    const points = graphConfig.localPointsCache.filter(graphCache => graphCache.interactionPointIndex !== -1);
    points.forEach(graphCache => {
        if (graphCache.interactionPointIndex !== -1){
            const point = graphCache.points[graphCache.interactionPointIndex];
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle = graphCache.color;
            ctx.arc(point[0], point[1], graphConfig.pointSize.highlighted/2, 0, 2 * Math.PI);
            ctx.fill();  
            ctx.stroke();
        }
    });
    const lines = graphConfig.localPointsCache.filter(graphCache => graphCache.interactionSegmentEndIndex !== -1);
    lines.forEach(graphCache => {        
        const end = graphCache.points[graphCache.interactionSegmentEndIndex];
        const start = graphCache.points[graphCache.interactionSegmentEndIndex-1];
        ctx.beginPath();
        ctx.strokeStyle = graphCache.color;
        ctx.lineWidth = graphConfig.strokeSize.highlighted;
        ctx.moveTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]); 
        ctx.stroke();
    });

    const fullGraph = graphConfig.localPointsCache.find(graphCache => graphCache.isHighlighted);
    if (fullGraph){
        const graph = fullGraph.points;
        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = fullGraph.color;
        ctx.lineWidth = graphConfig.strokeSize.highlighted;
        ctx.moveTo(graph[0][0], graph[0][1]);
        for(let i=1;i<graph.length;i++){                        
            ctx.lineTo(graph[i][0], graph[i][1]);
        }
        ctx.stroke();
        
        for(let i=1;i<graph.length-1;i++){                        
            ctx.beginPath();
            ctx.arc(graph[i][0], graph[i][1], graphConfig.pointSize.highlighted/2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke(); 
        }
               
    }
}