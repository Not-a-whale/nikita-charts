import {graphConfig} from "@/shared/constants/graphConfig";

export const drawInteractionLayer = (x : number, y: number, clientX : number, clientY : number)  => {
    const ctx = graphConfig.interactionCtx;
    ctx.beginPath();
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    
    graphConfig.localPointsCache.forEach(graphCache => graphCache.checkInteraction(x, y));
    const filtered = graphConfig.localPointsCache.filter(graphCache => graphCache.interactionPointIndex !== -1 || graphCache.interactionSegmentEndIndex !== -1);
    filtered.forEach(graphCache => {
        if (graphCache.interactionPointIndex !== -1){
            const point = graphCache.points[graphCache.interactionPointIndex];
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle = graphCache.color;
            ctx.arc(point[0], point[1], graphConfig.pointSize.highlighted/2, 0, 2 * Math.PI);
            ctx.fill();  
            ctx.stroke();
        } else {
            const end = graphCache.points[graphCache.interactionSegmentEndIndex];
            const start = graphCache.points[graphCache.interactionSegmentEndIndex-1];
            ctx.beginPath();
            ctx.strokeStyle = graphCache.color;
            ctx.lineWidth = graphConfig.strokeSize.highlighted;
            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]); 
            ctx.stroke();                    
        }                
    });    
    if(filtered.length > 1) console.log(`Nikita do poput now at ${clientX},${clientY} for graph id's ${filtered.map(item => item.id)}! and setHighestOrder after graph selection`);
}