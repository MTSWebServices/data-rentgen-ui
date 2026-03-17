import {
    DependencyResponseV1,
    DependencyRelationResponseV1,
    ParentRelationResponseV1,
} from "@/dataProvider/types";
import { Edge, MarkerType } from "@xyflow/react";
import { getMinimalEdge, STOKE_MEDIUM } from "@/components/graph/edges";

const getParentEdges = (relation: ParentRelationResponseV1): Edge[] => {
    if (relation.from.kind != "JOB" || relation.to.kind != "JOB") {
        return [];
    }

    const strokeColor = "black";
    return [
        {
            ...getMinimalEdge(relation),
            sourceHandle: "bottom",
            targetHandle: "top",
            label: "PARENT",
            style: {
                strokeWidth: STOKE_MEDIUM,
                stroke: strokeColor,
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: strokeColor,
            },
            data: {
                ...relation,
                kind: "PARENT",
                weight: 1,
            },
        },
    ];
};

const getDependencyEdges = (relation: DependencyRelationResponseV1): Edge => {
    const strokeColor = "gray";
    const backgroundColor = "tomato";
    return {
        ...getMinimalEdge(relation),
        label: relation.type,
        labelStyle: {
            backgroundColor: backgroundColor,
        },
        style: {
            strokeWidth: STOKE_MEDIUM,
            stroke: strokeColor,
        },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: strokeColor,
        },
        data: {
            ...relation,
            kind: "DEPENDENCY",
            weight: 2,
        },
    };
};

const getDependencyGraphEdges = (rawResponse: DependencyResponseV1): Edge[] => {
    const parentEdges: Edge[] =
        rawResponse.relations.parents.flatMap(getParentEdges);
    const dependencyEdges: Edge[] =
        rawResponse.relations.dependencies.map(getDependencyEdges);
    return [...parentEdges, ...dependencyEdges];
};
export default getDependencyGraphEdges;
