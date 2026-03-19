import { ReactElement } from "react";
import { Stack, StackProps, Typography } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useTranslate } from "react-admin";

const OperationIcon = (props: StackProps): ReactElement => {
    const translate = useTranslate();
    return (
        <Stack direction={"column"} {...props}>
            {<HandymanIcon />}
            <Typography component="span" variant="body2">
                {translate("resources.operations.name", { smart_count: 1 })}
            </Typography>
        </Stack>
    );
};
export default OperationIcon;
