import { ReactElement } from "react";
import { List, TextField, DatagridConfigurable, ArrayField } from "react-admin";
import { DurationRaField, ListActions, StatusRaField } from "@/components/base";
import { LocationRaRefUrlField } from "@/components/location";
import JobRaTypeField from "./JobRaTypeField";
import JobRaListFilters from "./JobRaListFilters";
import JobRaTag from "./JobRaTag";
import RunRaRefDateField from "../run/RunRaRefDateField";

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
                    sortable={false}
                />
                <TextField
                    source="data.name"
                    label="resources.jobs.fields.name"
                    sortable={false}
                />
                <LocationRaRefUrlField
                    source="data.location"
                    label="resources.jobs.fields.location"
                />
                <RunRaRefDateField
                    source="last_run"
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
