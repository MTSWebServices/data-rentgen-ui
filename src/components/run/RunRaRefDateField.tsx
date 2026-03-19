import { ReactElement } from "react";
import { FieldProps, useCreatePath, useFieldValue } from "react-admin";
import { RunResponseV1 } from "@/dataProvider/types";
import { Link, Typography } from "@mui/material";

// Instead of using ReactAdmin's ReferenceField (which makes additional request to fetch locations by list[id]),
// make own link component
const RunRaRefDateField = (props: FieldProps): ReactElement | null => {
    const record: RunResponseV1 | undefined = useFieldValue(props);
    if (!record) {
        return null;
    }

    const createPath = useCreatePath();
    const path = createPath({
        resource: "runs",
        type: "show",
        id: record.id,
    });

    return (
        <Link href={path}>
            <Typography component="span" variant="body2">
                {new Date(record.created_at).toLocaleString()}
            </Typography>
        </Link>
    );
};

export default RunRaRefDateField;
