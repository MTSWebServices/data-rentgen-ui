import { useDataProvider, useNotify } from "react-admin";

import {
    buildGraphLayout,
    GRAPH_DIRECTION_VERTICAL,
} from "@/components/graph/layout";
import { Edge, Node, useNodesState, useEdgesState } from "@xyflow/react";
import DependencyFilters from "./DependencyFilters";
import Graph from "@/components/graph/Graph";

import "@xyflow/react/dist/style.css";
import getDependencyGraphNodes from "./getDependencyGraphNodes";
import getDependencyGraphEdges from "./getDependencyGraphEdges";
import { DependencyResponseV1 } from "@/dataProvider/types";

type DependencyViewProps = {
    resource: string;
    recordId: string | number;
    defaultSince?: Date;
    defaultDirection?: string;
};

const DependencyView = (props: DependencyViewProps) => {
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
                .getDependencies(props.resource, {
                    id: props.recordId,
                    filter: values,
                })
                .then((data: DependencyResponseV1) => {
                    const initialNodes = getDependencyGraphNodes(data);
                    const initialEdges = getDependencyGraphEdges(data);

                    initialNodes
                        .filter((node) => node.id == currentNodeId)
                        .forEach((node) => {
                            node.selected = true;
                        });

                    const { nodes: layoutedNodes, edges: layoutedEdges } =
                        buildGraphLayout({
                            nodes: initialNodes,
                            edges: initialEdges,
                            direction: GRAPH_DIRECTION_VERTICAL,
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
            <DependencyFilters onSubmit={onSubmit} {...props} />
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

export default DependencyView;
