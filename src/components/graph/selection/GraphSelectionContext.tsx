import { createContext } from "react";
import { GraphSelection } from "./utils/common";

const GraphSelectionValue = {
    selection: {
        nodeWithHandles: new Map<string, Set<string>>(),
        edges: new Set<string>(),
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSelection: (newValue: GraphSelection): void => {},
    resetSelection: (): void => {},
};

const GraphSelectionContext = createContext(GraphSelectionValue);

export default GraphSelectionContext;
