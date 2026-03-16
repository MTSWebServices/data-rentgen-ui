import { DependencyView } from "@/components/dependency";
import { ReactFlowProvider } from "@xyflow/react";
import { useRecordContext } from "react-admin";

const JobRaDependencies = () => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }

    return (
        <ReactFlowProvider>
            <DependencyView resource="jobs" recordId={record.id} />
        </ReactFlowProvider>
    );
};

export default JobRaDependencies;
