import { ReactElement } from "react";
import { FieldProps, useFieldValue } from "react-admin";

import DurationField from "./DurationField";

const DurationRaField = ({
    source,
    ...props
}: FieldProps): ReactElement | null => {
    const value = useFieldValue({ source });
    if (!value) return null;
    return <DurationField fieldSet={value} {...props} />;
};

export default DurationRaField;
