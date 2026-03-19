import { ReactElement } from "react";
import { Stack, Typography } from "@mui/material";
import LocationIcon from "./LocationIcon";
import { LocationResponseV1 } from "@/dataProvider/types";

const LocationRepr = ({
    location,
}: {
    location: LocationResponseV1;
}): ReactElement => {
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
            <LocationIcon locationType={location.type} />
            <Typography component="span" variant="body2">
                {location.type}://{location.name}
            </Typography>
        </Stack>
    );
};
export default LocationRepr;
