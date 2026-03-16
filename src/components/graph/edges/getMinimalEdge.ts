import { BaseRelationResponseV1 } from "@/dataProvider/types";
import { Edge, MarkerType } from "@xyflow/react";
import getNodeId from "../nodes/getNodeId";

export const STOKE_THIN = 0.5;

const getEdgeId = (relation: BaseRelationResponseV1): string => {
    // @ts-expect-error Type field may be present in some relation types
    const type = relation.type ?? "";
    return `${getNodeId(relation.from)}-${type}->${getNodeId(relation.to)}`;
};

const getMinimalEdge = (relation: BaseRelationResponseV1): Edge => {
    return {
        id: getEdgeId(relation),
        source: getNodeId(relation.from),
        sourceHandle: "right",
        target: getNodeId(relation.to),
        targetHandle: "left",
        type: "baseEdge",
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {
            strokeWidth: STOKE_THIN,
            stroke: "black",
        },
    };
};
export default getMinimalEdge;
