import {graphConfig} from "@/shared/constants/graphConfig";
import { drawInteractionLayer } from "@/utils/drawInteractionLayer";
import {GraphCache} from "@/shared/classes/class";

export const updateInteractions = (x : number, y: number): GraphCache[]  => {
    graphConfig.localPointsCache.forEach(graphCache => graphCache.checkInteraction(x, y));
    const filtered = graphConfig.localPointsCache.filter(graphCache => graphCache.interactionPointIndex !== -1 || graphCache.interactionSegmentEndIndex !== -1);
    drawInteractionLayer();
    return filtered as GraphCache[] || [];
}
