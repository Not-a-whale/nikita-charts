import React from "react";

type toolitpStyle = {
    top: string;
    left: string;
}

type TooltipProps = {
    style: toolitpStyle;
    children?: React.ReactNode;
}

export const Tooltip = ({style, children}: TooltipProps) => {
    return <div
        style={style}
        className="tooltip-block absolute bg-white p-[20px] transition z-[100] translate-x-1/2 translate-y-full">
        {children}
    </div>
}
