import { ReactElement } from "react";
import {
    List,
    TextField,
    DatagridConfigurable,
    ArrayField,
    ReferenceField,
} from "react-admin";
import { DurationRaField, ListActions, StatusRaField } from "@/components/base";
import {
    LocationRaNameWithLinkField,
    LocationRaTypeWithIconField,
} from "@/components/location";
import JobRaTypeField from "./JobRaTypeField";
import JobRaListFilters from "./JobRaListFilters";
import JobRaTag from "./JobRaTag";

const JobRaList = (): ReactElement => {
    return (
        <List
            actions={
                <ListActions>
                    <JobRaListFilters />
                </ListActions>
            }
            resource="jobs"
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

                <LocationRaTypeWithIconField
                    source="data.location.type"
                    label="resources.locations.fields.type"
                    sortable={false}
                />
                <LocationRaNameWithLinkField
                    source="data.location.name"
                    label="resources.locations.fields.name"
                    sortable={false}
                />
                <ReferenceField
                    reference="runs"
                    source="last_run.id"
                    label="resources.jobs.fields.last_run"
                    sortable={false}
                />
                <DurationRaField
                    source="last_run"
                    label="resources.jobs.fields.last_duration"
                    sortable={false}
                />
                <StatusRaField
                    source="last_run.status"
                    label="resources.jobs.fields.last_status"
                    sortable={false}
                />
                <ArrayField
                    source="data.tags"
                    label="resources.jobs.fields.tags"
                    sortable={false}
                >
                    <JobRaTag />
                </ArrayField>
            </DatagridConfigurable>
        </List>
    );
};

export default JobRaList;
