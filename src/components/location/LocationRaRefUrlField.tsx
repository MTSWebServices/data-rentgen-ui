import { ReactElement } from "react";
import { FieldProps, useCreatePath, useFieldValue } from "react-admin";
import LocationRepr from "./LocationRepr";
import { Link } from "@mui/material";

// Dataset & job responses already include full location response.
// Instead of using ReactAdmin's ReferenceField (which makes additional request to fetch locations by list[id]),
// make own link component
const LocationRaRefUrlField = (props: FieldProps): ReactElement | null => {
    const location = useFieldValue(props);
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
            <LocationRepr location={location} />
        </Link>
    );
};

export default LocationRaRefUrlField;
