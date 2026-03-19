import { HierarchyView } from "@/components/hierarchy";
import { ReactFlowProvider } from "@xyflow/react";
import { useRecordContext } from "react-admin";

const JobRaHierarchy = () => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }

    return (
        <ReactFlowProvider>
            <HierarchyView resource="jobs" recordId={record.id} />
        </ReactFlowProvider>
    );
};

export default JobRaHierarchy;
