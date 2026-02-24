import { ReactElement } from "react";
import { FieldProps, useFieldValue } from "react-admin";

import DurationField from "./DurationField";
import { Typography } from "@mui/material";

const DurationRaField = ({
    source,
    ...props
}: FieldProps): ReactElement | null => {
    const value = useFieldValue({ source });
    if (!value) return null;
    return (
        <Typography component="span" variant="body2">
            <DurationField fieldSet={value} {...props} />
        </Typography>
    );
};

export default DurationRaField;
