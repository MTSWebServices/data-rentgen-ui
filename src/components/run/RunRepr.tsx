import { ReactElement } from "react";
import { Stack, Typography } from "@mui/material";
import { JobTypeIcon } from "@/components/job";
import { RunDetailedResponseV1 } from "@/dataProvider/types";

// Run response already include job information.
// Instead of using ReactAdmin's ReferenceField (which makes additional request to fetch jobs by list[id]),
// make own representation component
const RunRepr = ({
    run,
}: {
    run: RunDetailedResponseV1;
}): ReactElement | null => {
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
            <JobTypeIcon jobType={run.job.type} />
            <Stack direction={"column"}>
                <Typography component="span" variant="body2">
                    {run.job.name}
                </Typography>
                <Typography component="span" variant="body2">
                    {new Date(run.data.created_at).toLocaleString()}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default RunRepr;
