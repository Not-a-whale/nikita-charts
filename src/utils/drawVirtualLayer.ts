import {graphConfig} from "@/shared/constants/graphConfig";
import {realToLocalX, realToLocalY} from "@/utils/realToLocalDataConverter";
import { GraphCache } from "@/shared/classes/class";

export const drawVirtualLayer = (ctx : CanvasRenderingContext2D)  => {
    ctx.clearRect(graphConfig.drawRectPx.left+1, graphConfig.drawAreaRightTopPadding+1, graphConfig.drawRectPx.width-2, graphConfig.drawRectPx.height-2);
    graphConfig.labels.y.forEach(label => {
        ctx.beginPath();
        ctx.strokeStyle =  graphConfig.interfaceColor;
        let x = graphConfig.drawRectPx.left;
        let y = realToLocalY(label);
        ctx.moveTo(x, y);
        ctx.lineTo(x + graphConfig.drawRectPx.width, y)
        ctx.stroke();        
    })

    ctx.lineWidth = 3;
    if (graphConfig.dataLimit.x.min < 0 && graphConfig.dataLimit.x.max > 0){
        ctx.beginPath();
        ctx.strokeStyle =  graphConfig.interfaceColor;
        let x = realToLocalX(0);
        ctx.moveTo(x, graphConfig.drawAreaRightTopPadding+1);
        ctx.lineTo(x, graphConfig.drawRectPx.bottom-1);
        ctx.stroke();                        
    }
    if (graphConfig.dataLimit.y.min < 0 && graphConfig.dataLimit.y.max > 0){
        ctx.beginPath();
        ctx.strokeStyle =  graphConfig.interfaceColor;
        let x = graphConfig.drawRectPx.left;
        let y = realToLocalY(0);
        ctx.moveTo(x+1, y);
        ctx.lineTo(x+graphConfig.drawRectPx.width-2,y);
        ctx.stroke();                        
    }
    ctx.lineWidth = 1;      
    
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
