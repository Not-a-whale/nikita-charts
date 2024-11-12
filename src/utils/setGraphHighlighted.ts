import {graphConfig} from "@/shared/constants/graphConfig";
import { drawInteractionLayer } from "@/utils/drawInteractionLayer";

export const setGraphHighlighted = (id : number) => {
    graphConfig.localPointsCache.forEach(graph => graph.isHighlighted = graph.id === id);    
    drawInteractionLayer();    
}
