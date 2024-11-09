"use client";

import {height, width} from "@/shared/constants/dimensions";
import {useEffect, useMemo, useRef} from "react";
import {config} from "@/shared/constants/config";
import {Context, RawData} from "@/shared/types/types";

import {drawAxes} from "@/utils/draw-axes";
import {findMaxCoordinateValue} from "@/utils/find-max-coordinate-value";


const rawData: RawData = [
    [
        {x: 0, y: 100},
        {x: 50, y: 400},
        {x: 100, y: 100},
        {x: 150, y: 540},
        {x: 200, y: 300},
    ],
    [
        {x: 0, y: 100},
        {x: 50, y: 400},
        {x: 100, y: 100},
        {x: 150, y: 540},
        {x: 300, y: 300},
    ],
]

function calculateLineProperties(x1: number, y1: number, x2: number, y2: number, width: number, height: number, sizeOfTheDot: number) {
    x1 = x1 * width / 100;
    y1 = y1 * height / 100;
    x2 = x2 * width / 100;
    y2 = y2 * height / 100;

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const angleRadians = Math.atan2(y2 - y1, x2 - x1);

    const angleDegrees = angleRadians * (180 / Math.PI);

    return {
        width: distance - sizeOfTheDot + 'px',
        transform: `rotate(${angleDegrees}deg)`,
    };
}

const render = (ctx: Context, data: RawData) => {
    ctx.clearRect(0, 0, width, height);

    drawAxes(
        ctx,
        150,
        width - 150,
        1,
        4,
        'time',
        150,
        height - 150,
        10,
        "your mom's weight(lbs)",
        data
    )
}

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {maxX, maxY} = useMemo(() => findMaxCoordinateValue(rawData), [rawData]);

    useEffect(() => {
        const context = canvasRef?.current?.getContext("2d");

        const dpi = window.devicePixelRatio;

        config.POINT_SIZE_HOVERED *= dpi
        config.POINT_SIZE_NORMAL *= dpi
        config.STROKE_SIZE_HOVERED *= dpi
        config.STROKE_SIZE_NORMAL *= dpi
        config.TEXT_SIZE *= dpi

        //const data = transformData(rawData, 150, 150, width - 300, height - 300);

        render(context as CanvasRenderingContext2D, rawData);
    }, [canvasRef]);


    return (
        <div className="flex items-center justify-center relative">
            <div className={`w-[${width}px] h-[${height}px] mx-auto relative`}>
                <canvas ref={canvasRef} width={width} height={height}></canvas>
                {rawData.map((line, j) => (
                    <div
                        key={j}
                        className={`absolute top-[150px] left-[150px] mx-auto`}
                        style={{width: width - 300, height: height - 300}}
                    >
                        {line.map((point, i: number) => (<>
                                    <div
                                        className="absolute w-[20px] h-[20px] bg-black rounded-full"
                                        id={`point-${j}-${i}`}
                                        style={{
                                            bottom: `calc(${point.y / maxY * 100}% - 10px)`,
                                            left: `calc(${point.x / maxX * 100}% - 10px)`,
                                        }}
                                        key={point.x}>{point.x}, {point.y}</div>
                                    {line[i + 1] && (<div
                                        className="absolute"
                                        style={{
                                            bottom: `calc(${point.y / maxY * 100}% - 10px)`,
                                            left: `calc(${point.x / maxX * 100}% - 10px)`,
                                            ...calculateLineProperties(
                                                point.x / maxX * 100,
                                                point.y / maxY * 100,
                                                line[i + 1].x / maxX * 100,
                                                line[i + 1].y / maxY * 100,
                                                width - 300,
                                                height - 300,
                                                20
                                            )
                                        }}
                                    >line</div>)}
                                </>
                            )
                        )}
                    </div>)
                )}
            </div>
        </div>
    );
}
