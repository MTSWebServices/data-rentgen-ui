import { ReactElement } from "react";

import { ListActions } from "@/components/base";
import { List, TextField, DatagridConfigurable, ArrayField } from "react-admin";
import JobRaTypeField from "./JobRaTypeField";
import JobRaListFilters from "./JobRaListFilters";
import JobRaTag from "./JobRaTag";

const JobRaListForLocation = ({
    locationId,
}: {
    locationId: number;
}): ReactElement => {
    return (
        <List
            resource="jobs"
            actions={
                <ListActions>
                    <JobRaListFilters withLocationType={false} />
                </ListActions>
            }
            filter={{ location_id: locationId }}
            title={false}
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <JobRaTypeField
                    source="data.type"
                    label="resources.jobs.fields.type"
                />
                <TextField
                    source="data.name"
                    label="resources.jobs.fields.name"
                    sortable={false}
                />
                <ArrayField
                    source="data.tags"
                    label="resources.jobs.fields.tags"
                >
                    <JobRaTag />
                </ArrayField>
            </DatagridConfigurable>
        </List>
    );
};

export default JobRaListForLocation;
