import { ReactElement } from "react";
import { Stack, StackProps, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useTranslate } from "react-admin";

const RunIcon = (props: StackProps): ReactElement => {
    const translate = useTranslate();
    return (
        <Stack direction={"column"} {...props}>
            <PlayArrow />
            <Typography component="span" variant="body2">
                {translate("resources.runs.name", { smart_count: 1 })}
            </Typography>
        </Stack>
    );
};
export default RunIcon;
