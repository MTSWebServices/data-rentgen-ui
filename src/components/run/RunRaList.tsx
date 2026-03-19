import { ReactElement } from "react";
import {
    List,
    DatagridConfigurable,
    ReferenceField,
    WrapperField,
    TextField,
} from "react-admin";

import {
    DurationRaField,
    StatusRaField,
    ListActions,
    IOStatisticsField,
} from "@/components/base";
import RunRaListFilters, { weekAgo } from "./RunRaListFilters";
import RunRaExternalIdField from "./RunRaExternalIdField";
import RunRaReprFull from "./RunRaReprFull";
import { JobRaRefField } from "@/components/job";
import RunRaRefDateField from "./RunRaRefDateField";

const RunRaList = (): ReactElement => {
    return (
        <List
            resource="runs"
            filterDefaultValues={{ since: weekAgo().toISOString() }}
            actions={
                <ListActions>
                    <RunRaListFilters />
                </ListActions>
            }
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <RunRaRefDateField
                    source="data"
                    label="resources.runs.fields.created_at"
                    sortable={false}
                />
                <JobRaRefField
                    source="job"
                    label="resources.runs.fields.job"
                    sortable={false}
                />
                <StatusRaField
                    source="data.status"
                    label="resources.runs.fields.status"
                    sortable={false}
                />
                <DurationRaField
                    source="data"
                    label="resources.runs.fields.duration"
                    sortable={false}
                />
                <WrapperField source="started_by_user" sortable={false}>
                    <TextField source="data.started_by_user.name" />
                </WrapperField>
                <RunRaExternalIdField
                    source="data.external_id"
                    label="resources.runs.fields.external_id"
                    sortable={false}
                />
                <ReferenceField
                    source="data.parent_run_id"
                    label="resources.runs.fields.parent_run"
                    reference="runs"
                    sortable={false}
                >
                    <RunRaReprFull />
                </ReferenceField>
                <TextField
                    source="statistics.operations.total_operations"
                    label="resources.runs.fields.statistics.operations"
                />
                <IOStatisticsField source="statistics.inputs" />
                <IOStatisticsField source="statistics.outputs" />
            </DatagridConfigurable>
        </List>
    );
};

export default RunRaList;
