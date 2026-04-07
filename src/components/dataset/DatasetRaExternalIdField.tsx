import { DatasetDetailedResponseV1 } from "@/dataProvider/types";
import { Link } from "@mui/material";
import { FieldProps, TextField, useRecordContext } from "react-admin";

const DatasetRaExternalIdField = (props: FieldProps) => {
    const record = useRecordContext<DatasetDetailedResponseV1>();
    if (!record || !record.data.external_id) {
        return null;
    }

    if (!record.data.external_url) {
        return <TextField {...props} />;
    }

    return (
        <Link href={record.data.external_url} target="_blank">
            {record.data.external_id}
        </Link>
    );
};
export default DatasetRaExternalIdField;
