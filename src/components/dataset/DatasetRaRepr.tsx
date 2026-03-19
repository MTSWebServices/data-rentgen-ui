import { ReactElement } from "react";
import { Stack, Typography } from "@mui/material";
import { LocationIcon } from "@/components/location";
import { useRecordContext } from "react-admin";
import { DatasetDetailedResponseV1 } from "@/dataProvider/types";

const DatasetRaRepr = (): ReactElement | null => {
    const dataset = useRecordContext<DatasetDetailedResponseV1>();
    if (!dataset) return null;

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
            <LocationIcon locationType={dataset.data.location.type} />
            <Typography component="span" variant="body2">
                {dataset.data.name}
            </Typography>
        </Stack>
    );
};
export default DatasetRaRepr;
