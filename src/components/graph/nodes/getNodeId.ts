import { RelationEndpointResponseV1 } from "@/dataProvider/types";

const getNodeId = (node: RelationEndpointResponseV1): string => {
    return node.kind + "-" + node.id;
};

export default getNodeId;
