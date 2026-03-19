import { useTranslate } from "react-admin";

export const getDefaultLocationType = (jobType: string): string => {
    return jobType
        .split("_")
        .map(
            (s) =>
                s.charAt(0).toLocaleUpperCase() +
                s.substring(1).toLocaleLowerCase(),
        )
        .join(" ");
};

const LocationType = ({ locationType }: { locationType: string }): string => {
    const translate = useTranslate();

    return translate(`resources.locations.types.${locationType}`, {
        _: getDefaultLocationType(locationType),
    });
};

export default LocationType;
