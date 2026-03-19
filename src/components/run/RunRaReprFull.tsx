import { ReactElement } from "react";
import { useRecordContext } from "react-admin";
import { Stack, Typography } from "@mui/material";
import { JobTypeIcon } from "@/components/job";

// Run response already include job information.
// Instead of using ReactAdmin's ReferenceField (which makes additional request to fetch jobs by list[id]),
// make own representation component
const RunRaRepr = (): ReactElement | null => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }

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
            <JobTypeIcon jobType={record.job.type} />
            <Stack direction={"column"}>
                <Typography component="span" variant="body2">
                    {record.job.name}
                </Typography>
                <Typography component="span" variant="body2">
                    {new Date(record.data.created_at).toLocaleString()}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default RunRaRepr;
