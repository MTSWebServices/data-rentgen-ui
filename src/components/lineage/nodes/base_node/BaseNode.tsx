import {
    Position,
    Handle,
    useReactFlow,
    useUpdateNodeInternals,
} from "@xyflow/react";
import { ReactElement, ReactNode, useLayoutEffect, useState } from "react";

import "./BaseNode.css";
import {
    Card,
    CardActions,
    CardContent,
    CardProps,
    Collapse,
    Divider,
    Stack,
} from "@mui/material";
import ShowMoreButton from "./ShowMoreButton";

const BaseNode = ({
    nodeId,
    header,
    icon = null,
    expandableContent = null,
    defaultExpanded = false,
    ...props
}: {
    nodeId: string;
    header: ReactNode;
    icon?: ReactNode | null;
    expandableContent?: ReactNode | null;
    defaultExpanded?: boolean;
} & CardProps): ReactElement => {
    const { getEdges } = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();

    const hasParents = getEdges().some(
        (edge) => edge.target === nodeId && edge.sourceHandle == "bottom",
    );
    const hasChildren = getEdges().some(
        (edge) => edge.source === nodeId && edge.targetHandle == "top",
    );
    const hasOutputs = getEdges().some(
        (edge) => edge.source === nodeId && edge.sourceHandle == "right",
    );
    const hasInputs = getEdges().some(
        (edge) => edge.target === nodeId && edge.targetHandle == "left",
    );

    const [expanded, setExpanded] = useState(defaultExpanded);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useLayoutEffect(() => {
        // Re-render all edges connected to this node
        updateNodeInternals(nodeId);
    }, [expanded]);

    return (
        <Card {...props}>
            {hasParents && (
                <Handle
                    type="target"
                    id="top"
                    position={Position.Top}
                    isConnectable={false}
                />
            )}
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
                {hasInputs && (
                    <Handle
                        type="target"
                        id="left"
                        position={Position.Left}
                        isConnectable={false}
                    />
                )}
                {icon}
                {icon && <Divider orientation="vertical" flexItem />}
                {header}
                {expandableContent && (
                    <CardActions disableSpacing>
                        <ShowMoreButton
                            isExpanded={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        />
                    </CardActions>
                )}
                {hasOutputs && (
                    <Handle
                        type="source"
                        id="right"
                        position={Position.Right}
                        isConnectable={false}
                    />
                )}
            </Stack>
            {expandableContent && (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>{expandableContent}</CardContent>
                </Collapse>
            )}
            {hasChildren && (
                <Handle
                    type="source"
                    id="bottom"
                    position={Position.Bottom}
                    isConnectable={false}
                />
            )}
        </Card>
    );
};

export default BaseNode;
