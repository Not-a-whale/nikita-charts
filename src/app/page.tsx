"use client";

import React, {useEffect, useRef, useState} from "react";

import {graphConfig} from "@/shared/constants/graphConfig";
import {exampleData} from "@/shared/constants/exampleData";
import {updateGraphConfig} from "@/utils/updateGraphConfig";
import {drawStaticLayer} from "@/utils/drawStaticLayer";
import {drawVirtualLayer} from "@/utils/drawVirtualLayer";
import {updateInteractions} from "@/utils/updateInteractions";
import {GraphCache} from "@/shared/classes/class";
import {Tooltip} from "@/app/components/Tooltip/Tooltip";
import {LineSwitchTooltip} from "@/app/components/Tooltip/content/LineSwitchTooltip";
import {setGraphHighlighted} from "@/utils/setGraphHighlighted";
import {drawInteractionLayer} from "@/utils/drawInteractionLayer";

const handleInteraction = (e: React.MouseEvent<Element, MouseEvent>): GraphCache[] | null => {
    const rect = (e.target as Element).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return updateInteractions(x, y, e.clientX, e.clientY);
}


export default function Home() {
    const [interactionPointCoordinates, setInteractionPointCoordinates] = useState({x: -9999999, y: -9999999});
    const [interactionLines, setInteractionLines] = useState<GraphCache[]>([]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasOverlayRef = useRef<HTMLCanvasElement>(null);

    const render = () => {
        drawStaticLayer();
        drawVirtualLayer();
    }

    const onMouseMove = (e: React.MouseEvent<Element, MouseEvent>): void => {
        handleInteraction(e);
    }

    const removeTooltip = () => {
        setInteractionPointCoordinates({x: -9999999, y: -9999999});
        setGraphHighlighted(-1);
        drawInteractionLayer();
    }

    const onClick = (e: React.MouseEvent<Element, MouseEvent>): void => {
        const interactionPoints = handleInteraction(e);
        if (interactionPoints) {
            setInteractionPointCoordinates({x: e.clientX, y: e.clientY});
            setInteractionLines(interactionPoints);
        } else {
            removeTooltip();
        }
    }

    useEffect(() => {
        const context = canvasRef?.current?.getContext("2d") as CanvasRenderingContext2D;
        const contextOverlay = canvasOverlayRef?.current?.getContext("2d") as CanvasRenderingContext2D;

        updateGraphConfig(exampleData, context, contextOverlay);
        render();

    }, [canvasRef, canvasOverlayRef]);

    return (
        <div className="relative"
             style={{
                 width: `${graphConfig.size.width}px`,
                 height: `${graphConfig.size.height}px`,
             }}>
            <canvas ref={canvasRef} width={graphConfig.size.width} height={graphConfig.size.height}
                    className={'canvas-item'}></canvas>
            <canvas ref={canvasOverlayRef} width={graphConfig.size.width} height={graphConfig.size.height}
                    className={'canvas-item'} onMouseMove={onMouseMove} onClick={onClick}></canvas>
            <Tooltip style={{left: `${interactionPointCoordinates.x}px`, top: `${interactionPointCoordinates.y}px`}}>
                <LineSwitchTooltip lines={interactionLines} onClose={removeTooltip}/>
            </Tooltip>
        </div>
    );
}
