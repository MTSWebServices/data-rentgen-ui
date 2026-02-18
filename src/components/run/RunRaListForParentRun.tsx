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
import RunRaExternalId from "./RunRaExternalId";
import RunRaListFilters from "./RunRaListFilters";
import { RunResponseV1 } from "@/dataProvider/types";

const RunRaListForParentRun = ({
    parentRun,
}: {
    parentRun: RunResponseV1;
}): ReactElement => {
    return (
        <List
            resource="runs"
            filter={{ parent_run_id: parentRun.id }}
            filterDefaultValues={{ since: parentRun.created_at }}
            actions={
                <ListActions>
                    <RunRaListFilters />
                </ListActions>
            }
            title={false}
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <ReferenceField
                    reference="runs"
                    source="data.id"
                    label="resources.runs.fields.created_at"
                    sortable={false}
                />
                <ReferenceField
                    reference="jobs"
                    source="data.job_id"
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
                <RunRaExternalId
                    source="data.external_id"
                    label="resources.runs.fields.external_id"
                    sortable={false}
                />
                {/* Do not show parent_run, as we already in parent RunShow page*/}
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

export default RunRaListForParentRun;
