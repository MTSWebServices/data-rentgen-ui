import { ReactElement } from "react";
import { FieldProps, useCreatePath, useFieldValue } from "react-admin";
import JobRepr from "./JobRepr";
import { JobResponseV1 } from "@/dataProvider/types";
import { Link } from "@mui/material";

// Instead of using ReactAdmin's ReferenceField (which makes additional request to fetch locations by list[id]),
// make own link component
const JobRaRefField = (props: FieldProps): ReactElement | null => {
    const job: JobResponseV1 = useFieldValue(props);
    if (!job) {
        return null;
    }

    const createPath = useCreatePath();
    const path = createPath({
        resource: "jobs",
        type: "show",
        id: job.id,
    });

    return (
        <Link href={path}>
            <JobRepr job={job} />
        </Link>
    );
};

export default JobRaRefField;
