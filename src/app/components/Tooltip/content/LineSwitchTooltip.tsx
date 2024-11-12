import {GraphCache} from "@/shared/classes/class";
import {setGraphHighlighted} from "@/utils/setGraphHighlighted";

type LineSwitchTooltipProps = {
    lines: GraphCache[];
}

export const LineSwitchTooltip = ({ lines }: LineSwitchTooltipProps) => {
    return (
        <div className="list-none text-white">
            <h3 className="pb-3">Select line</h3>
            {lines.map((line, index) => (
                <div key={index} className="flex items-center justify-between p-1 cursor-pointer">
                    <label className="cursor-pointer w-full h-max flex justify-start gap-3 items-center" htmlFor={`line-${line.id}`}>Line <div
                        className="w-4 h-4 rounded-full" style={{backgroundColor: line.color}}></div> {line.id}
                    </label>
                    <input className="cursor-pointer" type="radio" name="lines" id={`line-${line.id}`} onChange={() => setGraphHighlighted(line.id)} />
                </div>
            ))}
        </div>
    )
}
