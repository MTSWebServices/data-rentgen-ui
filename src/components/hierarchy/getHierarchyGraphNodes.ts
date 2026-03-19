import { HierarchyResponseV1, JobResponseV1 } from "@/dataProvider/types";
import { Node } from "@xyflow/react";

const BASE_NODE_HEIGHT = 120;
const BASE_NODE_WIDTH = 800;
const BASE_NODE_WIDTH_PER_CHAR = 25;

const getDefaultNode = () => {
    return {
        position: { x: 0, y: 0 },
        initialWidth: BASE_NODE_WIDTH,
        initialHeight: BASE_NODE_HEIGHT,
    };
};

const getJobNodeForHierarchyGraph = (node: JobResponseV1): Node => {
    let title = node.name;
    let subheader = `${node.location.type}://${node.location.name}`;
    if (node.name.includes("/")) {
        // For long job names like "/group/subgroup/job_name"
        // move "/group/subgroup/" to subheader
        title = node.name.substring(node.name.lastIndexOf("/") + 1);
        subheader += "/" + node.name.substring(0, node.name.lastIndexOf("/"));
    }

    const maxNameWidth = Math.max(title.length, subheader.length);

    const maxWidth = Math.max(
        maxNameWidth * BASE_NODE_WIDTH_PER_CHAR,
        BASE_NODE_WIDTH,
    );
    return {
        ...getDefaultNode(),
        id: "JOB-" + node.id,
        type: "jobNode",
        initialWidth: maxWidth,
        data: {
            ...node,
            kind: "JOB",
            title: title,
            subheader: subheader,
            runs: [],
        },
    };
};

const getHierarchyGraphNodes = (rawResponse: HierarchyResponseV1): Node[] => {
    return Object.values(rawResponse.nodes.jobs).map(
        getJobNodeForHierarchyGraph,
    );
};
export default getHierarchyGraphNodes;
