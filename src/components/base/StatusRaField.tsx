import { ReactElement } from "react";
import { ChipFieldProps, useFieldValue } from "react-admin";
import StatusField from "./StatusField";

const StatusRaField = ({
    /* eslint-disable @typescript-eslint/no-unused-vars */
    source,
    sortable,
    children,
    ...chipProps
}: ChipFieldProps): ReactElement | null => {
    const value = useFieldValue({ source });
    if (!value) return null;

    return <StatusField status={value} {...chipProps} />;
};

export default StatusRaField;
