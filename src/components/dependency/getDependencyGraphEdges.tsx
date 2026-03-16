import {
    DependencyResponseV1,
    DependencyRelationResponseV1,
    ParentRelationResponseV1,
} from "@/dataProvider/types";
import { Edge } from "@xyflow/react";
import { getMinimalEdge } from "../graph/edges";

const getParentEdges = (relation: ParentRelationResponseV1): Edge[] => {
    if (relation.from.kind != "JOB" || relation.to.kind != "JOB") {
        return [];
    }

    return [
        {
            ...getMinimalEdge(relation),
            sourceHandle: "bottom",
            targetHandle: "top",
            type: "parentEdge",
            label: "PARENT",
        },
    ];
};

const getDependencyEdges = (relation: DependencyRelationResponseV1): Edge => {
    return {
        ...getMinimalEdge(relation),
        type: "dependencyEdge",
        label: relation.type,
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
