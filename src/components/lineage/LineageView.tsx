import { useDataProvider, useNotify } from "react-admin";

import { buildGraphLayout } from "@/components/graph/layout";
import { Edge, Node, useNodesState, useEdgesState } from "@xyflow/react";
import LineageFilters from "./LineageFilters";
import Graph from "@/components/graph/Graph";

import "@xyflow/react/dist/style.css";
import getLineageGraphNodes from "./getLineageGraphNodes";
import getLineageGraphEdges from "./getLineageGraphEdges";
import { LineageResponseV1 } from "@/dataProvider/types";

type LineageViewProps = {
    resource: string;
    recordId: string | number;
    defaultSince?: Date;
    defaultDirection?: string;
    granularities?: string[];
};

const LineageView = (props: LineageViewProps) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();

    // datasets + 123 -> DATASET-123
    const currentNodeId = `${props.resource.slice(0, -1).toUpperCase()}-${props.recordId}`;

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const onSubmit = (values: {
        since?: string;
        until?: string;
        depth?: number;
        direction?: string;
        granularity?: string;
        include_column_lineage?: boolean;
    }) => {
        setNodes([]);
        setNodes([]);

        if (Object.keys(values).length > 0) {
            dataProvider
                .getLineage(props.resource, {
                    id: props.recordId,
                    filter: values,
                })
                .then((data: LineageResponseV1) => {
                    const initialNodes = getLineageGraphNodes(data);
                    const initialEdges = getLineageGraphEdges(data);

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
            <LineageFilters onSubmit={onSubmit} {...props} />
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

export default LineageView;
