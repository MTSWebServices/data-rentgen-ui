import { ReactElement } from "react";
import { useRecordContext } from "react-admin";
import { LocationDetailedResponseV1 } from "@/dataProvider/types";
import LocationRepr from "./LocationRepr";

const LocationRaRepr = (): ReactElement | null => {
    const location = useRecordContext<LocationDetailedResponseV1>();
    if (!location) return null;

    return <LocationRepr location={location.data} />;
};
export default LocationRaRepr;
