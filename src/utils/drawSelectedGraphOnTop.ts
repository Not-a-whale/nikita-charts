import {graphConfig} from "@/shared/constants/graphConfig";
import { setGraphHighlighted } from "./setGraphHighlighted";
import { drawVirtualLayer } from "./drawVirtualLayer";

export const drawSelectedGraphOnTop = (id : number) => {
    graphConfig.localPointsCache[id].setHighestOrder();    
    drawVirtualLayer();
    setGraphHighlighted(-1);    
}
