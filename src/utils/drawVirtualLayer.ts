import {graphConfig} from "@/shared/constants/graphConfig";
import {realToLocalX, realToLocalY} from "@/utils/realToLocalDataConverter";
import { GraphCache } from "@/shared/classes/class";

export const drawVirtualLayer = ()  => {
    const ctx = graphConfig.baseCtx;
    ctx.clearRect(graphConfig.drawRectPx.left+1, graphConfig.drawAreaRightTopPadding+1, graphConfig.drawRectPx.width-2, graphConfig.drawRectPx.height-2);
    // horizontal lines
    graphConfig.labels.y.forEach(label => {
        ctx.beginPath();
        ctx.strokeStyle =  graphConfig.interfaceColor;
        const x = graphConfig.drawRectPx.left;
        const y = realToLocalY(label);
        ctx.moveTo(x, y);
        ctx.lineTo(x + graphConfig.drawRectPx.width, y)
        ctx.stroke();        
    })


    // axis drawing
    ctx.lineWidth = 3;
    if (graphConfig.dataLimit.x.min < 0 && graphConfig.dataLimit.x.max > 0){
        ctx.beginPath();
        ctx.strokeStyle =  graphConfig.interfaceColor;
        ctx.moveTo(graphConfig.drawAreaZeroPoint.x, graphConfig.drawAreaRightTopPadding+1);
        ctx.lineTo(graphConfig.drawAreaZeroPoint.x, graphConfig.drawRectPx.bottom-1);
        ctx.stroke();                        
    }
    if (graphConfig.dataLimit.y.min < 0 && graphConfig.dataLimit.y.max > 0){
        ctx.beginPath();
        ctx.strokeStyle =  graphConfig.interfaceColor;
        const x = graphConfig.drawRectPx.left;
        ctx.moveTo(x+1, graphConfig.drawAreaZeroPoint.y);
        ctx.lineTo(x+graphConfig.drawRectPx.width-2,graphConfig.drawAreaZeroPoint.y);
        ctx.stroke();                        
    }
    ctx.lineWidth = graphConfig.strokeSize.default;      
    
    graphConfig.localPointsCache.sort((a,b)=>a.order - b.order).forEach((graphCache) =>{
        const graph = graphCache.points;
        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = graphCache.color;
        ctx.moveTo(graph[0][0], graph[0][1]);
        for(let i=1;i<graph.length;i++){                        
            ctx.lineTo(graph[i][0], graph[i][1]);
        }
        ctx.stroke();
        
        for(let i=1;i<graph.length-1;i++){                        
            ctx.beginPath();
            ctx.arc(graph[i][0], graph[i][1], graphConfig.pointSize.default/2, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.stroke();
    })
}
