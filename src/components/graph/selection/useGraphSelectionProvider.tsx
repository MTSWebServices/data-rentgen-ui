import { useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";
import { GraphSelection } from "./utils/common";

const useGraphSelectionProvider = () => {
    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

    const [selection, setSelectionState] = useState<GraphSelection>({
        nodeWithHandles: new Map<string, Set<string>>(),
        edges: new Set<string>(),
    });

    const setSelection = useCallback((newValue: GraphSelection) => {
        setSelectionState(newValue);
        const newNodes = getNodes().map((node) => {
            return {
                ...node,
                selected: newValue.nodeWithHandles.has(node.id),
            };
        });
        const newEdges = getEdges().map((edge) => {
            return {
                ...edge,
                selected: newValue.edges.has(edge.id),
            };
        });
        setNodes(newNodes);
        setEdges(newEdges);
    }, []);

    const resetSelection = useCallback(() => {
        setSelectionState({
            nodeWithHandles: new Map<string, Set<string>>(),
            edges: new Set<string>(),
        });
    }, []);

    return {
        selection,
        setSelection,
        resetSelection,
    };
};

export default useGraphSelectionProvider;
