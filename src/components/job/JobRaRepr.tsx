import { ReactElement } from "react";
import { useRecordContext } from "react-admin";
import { JobDetailedResponseV1 } from "@/dataProvider/types";
import JobRepr from "./JobRepr";

const JobRaRepr = (): ReactElement | null => {
    const job = useRecordContext<JobDetailedResponseV1>();
    if (!job) return null;

    return <JobRepr job={job.data} />;
};
export default JobRaRepr;
