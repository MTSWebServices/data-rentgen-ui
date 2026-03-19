import { useDataProvider, useNotify } from "react-admin";

import { buildGraphLayout } from "@/components/graph/layout";
import { Edge, Node, useNodesState, useEdgesState } from "@xyflow/react";
import HierarchyFilters from "./HierarchyFilters";
import Graph from "@/components/graph/Graph";

import "@xyflow/react/dist/style.css";
import getHierarchyGraphNodes from "./getHierarchyGraphNodes";
import getHierarchyGraphEdges from "./getHierarchyGraphEdges";
import { HierarchyResponseV1 } from "@/dataProvider/types";

type HierarchyViewProps = {
    resource: string;
    recordId: string | number;
    defaultSince?: Date;
    defaultDirection?: string;
};

const HierarchyView = (props: HierarchyViewProps) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();

    // job + 123 -> JOB-123
    const currentNodeId = `${props.resource.slice(0, -1).toUpperCase()}-${props.recordId}`;

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const onSubmit = (values: {
        since?: string;
        until?: string;
        depth?: number;
        direction?: string;
    }) => {
        setNodes([]);
        setNodes([]);

        if (Object.keys(values).length > 0) {
            dataProvider
                .getHierarchy(props.resource, {
                    id: props.recordId,
                    filter: values,
                })
                .then((data: HierarchyResponseV1) => {
                    const initialNodes = getHierarchyGraphNodes(data);
                    const initialEdges = getHierarchyGraphEdges(data);

                    initialNodes
                        .filter((node) => node.id == currentNodeId)
                        .forEach((node) => {
                            node.selected = true;
                        });

                    const { nodes: layoutedNodes, edges: layoutedEdges } =
                        buildGraphLayout({
                            nodes: initialNodes,
                            edges: initialEdges,
                        });
                    setNodes(layoutedNodes);
                    setEdges(layoutedEdges);
                })
                .catch((error: Error) =>
                    notify(error.message, { type: "error" }),
                );
        }
    };

    return (
        <>
            <HierarchyFilters onSubmit={onSubmit} {...props} />
            {nodes && edges && (
                <div style={{ height: "80vh" }}>
                    <Graph
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                    />
                </div>
            )}
        </>
    );
};

export default HierarchyView;
