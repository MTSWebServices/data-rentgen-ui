import { ReactElement } from "react";
import { List, TextField, DatagridConfigurable, ArrayField } from "react-admin";
import { ListActions } from "@/components/base";
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
                />
                <LocationRaNameWithLinkField
                    source="data.location.name"
                    label="resources.locations.fields.name"
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

export default JobRaList;
