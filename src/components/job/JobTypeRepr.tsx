import { ReactElement } from "react";
import { Stack, StackProps, Typography } from "@mui/material";
import JobTypeIcon from "./JobTypeIcon";
import JobType from "./JobType";

const JobTypeRepr = ({
    jobType,
    ...props
}: { jobType: string } & StackProps): ReactElement | null => {
    return (
        <Stack direction={"column"} {...props}>
            <JobTypeIcon jobType={jobType} />
            <Typography component="span" variant="body2">
                <JobType jobType={jobType} />
            </Typography>
        </Stack>
    );
};

export default JobTypeRepr;
