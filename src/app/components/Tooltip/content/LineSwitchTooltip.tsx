import {GraphCache} from "@/shared/classes/class";
import {setGraphHighlighted} from "@/utils/setGraphHighlighted";

type LineSwitchTooltipProps = {
    lines: GraphCache[];
    onClose: () => void;
}

export const LineSwitchTooltip = ({lines, onClose}: LineSwitchTooltipProps) => {
    return (
        <div className="list-none text-white">
            <h3 className="pb-3">Select the line please: </h3>
            {lines.map((line, index) => (
                <div key={index} className="flex items-center justify-between p-1 cursor-pointer">
                    <label className="cursor-pointer w-full h-max flex justify-start gap-3 items-center"
                           htmlFor={`line-${line.id}`}>Line <div
                        className="w-4 h-4 rounded-full" style={{backgroundColor: line.color}}></div> {line.id}
                    </label>
                    <input className="cursor-pointer ml-3" type="radio" name="lines" id={`line-${line.id}`}
                           onChange={() => setGraphHighlighted(line.id)}/>
                </div>
            ))}
            <div className="flex w-full justify-end">
                <button className="bg-white text-black p-1 rounded-md mt-3 mb-2" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
