import { ReactElement } from "react";
import { IconByName } from "@/components/icons";

const LocationIcon = ({
    locationType,
}: {
    locationType: string;
}): ReactElement => {
    return <IconByName name={locationType} />;
};

export default LocationIcon;
