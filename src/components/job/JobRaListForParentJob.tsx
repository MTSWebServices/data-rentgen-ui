import { ReactElement } from "react";
import { List, TextField, DatagridConfigurable, ArrayField } from "react-admin";
import { DurationRaField, ListActions, StatusRaField } from "@/components/base";
import { LocationRaRefUrlField } from "@/components/location";
import { RunRaRefDateField } from "@/components/run";
import JobRaTypeField from "./JobRaTypeField";
import JobRaListFilters from "./JobRaListFilters";
import JobRaTag from "./JobRaTag";

const JobRaListForParentJob = ({
    parentJobId,
}: {
    parentJobId: number;
}): ReactElement => {
    return (
        <List
            resource="jobs"
            actions={
                <ListActions>
                    <JobRaListFilters />
                </ListActions>
            }
            filter={{ parent_job_id: parentJobId }}
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

export default JobRaListForParentJob;
