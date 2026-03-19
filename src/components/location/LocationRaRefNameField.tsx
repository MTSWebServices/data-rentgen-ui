import { ReactElement } from "react";
import { FieldProps, useCreatePath, useFieldValue } from "react-admin";
import { Link, Typography } from "@mui/material";
import { LocationResponseV1 } from "@/dataProvider/types";

// Dataset & job responses already include full location response.
// Instead of using ReactAdmin's ReferenceField (which makes additional request to fetch locations by list[id]),
// make own link component
const LocationRaRefNameField = (props: FieldProps): ReactElement | null => {
    const location: LocationResponseV1 | undefined = useFieldValue(props);
    if (!location) {
        return null;
    }

    const createPath = useCreatePath();
    const path = createPath({
        resource: "locations",
        type: "show",
        id: location.id,
    });

    return (
        <Link href={path}>
            <Typography variant="body2" component="span">
                {location.name}
            </Typography>
        </Link>
    );
};

export default LocationRaRefNameField;
