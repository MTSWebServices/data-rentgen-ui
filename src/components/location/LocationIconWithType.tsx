import { ReactElement } from "react";
import { LocationResponseV1 } from "@/dataProvider/types";
import { Stack, StackProps, Typography } from "@mui/material";
import LocationIcon from "./LocationIcon";
import LocationType from "./LocationType";

const LocationIconWithType = ({
    location,
    ...props
}: {
    location: LocationResponseV1;
} & StackProps): ReactElement | null => {
    return (
        <Stack direction={"column"} {...props}>
            <LocationIcon locationType={location.type} />
            <Typography component="span" variant="body2">
                <LocationType locationType={location.type} />
            </Typography>
        </Stack>
    );
};
export default LocationIconWithType;
