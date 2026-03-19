import { ReactElement } from "react";
import { Stack, Typography } from "@mui/material";
import { JobResponseV1 } from "@/dataProvider/types";
import JobTypeIcon from "./JobTypeIcon";
import JobType from "./JobType";

const JobRepr = ({ job }: { job: JobResponseV1 }): ReactElement => {
    return (
        <Stack
            direction={"row"}
            spacing={1}
            sx={{
                // using inline-flex to avoid expanding link to the full width of table column
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "underline",
            }}
        >
            <JobTypeIcon jobType={job.type} />
            <Stack direction={"column"}>
                <Typography component="span" variant="body2">
                    {job.name}
                </Typography>
                <Typography component="span" variant="subtitle2">
                    <JobType jobType={job.type} />
                </Typography>
            </Stack>
        </Stack>
    );
};
export default JobRepr;
