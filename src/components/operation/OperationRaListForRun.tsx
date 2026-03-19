import { ReactElement } from "react";
import {
    List,
    DatagridConfigurable,
    TextField,
    FunctionField,
    ReferenceField,
} from "react-admin";

import {
    DurationRaField,
    StatusRaField,
    ListActions,
    IOStatisticsField,
} from "@/components/base";
import { RunResponseV1 } from "@/dataProvider/types";
import OperationRaListFilters from "./OperationRaListFilters";

const OperationRaListForRun = ({
    run,
}: {
    run: RunResponseV1;
}): ReactElement => {
    return (
        <List
            resource="operations"
            filter={{ run_id: run.id }}
            filterDefaultValues={{ since: run.created_at }}
            actions={
                <ListActions>
                    <OperationRaListFilters />
                </ListActions>
            }
            title={false}
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <ReferenceField
                    source="data.id"
                    label="resources.operations.fields.created_at"
                    reference="operations"
                    sortable={false}
                />
                {/* Do not show run, as we already in RunRaShow page*/}
                <TextField
                    source="data.position"
                    label="resources.operations.fields.position"
                    sortable={false}
                />
                <TextField
                    source="data.group"
                    label="resources.operations.fields.group"
                    sortable={false}
                />
                <FunctionField
                    source="description"
                    render={(record) =>
                        record.data.description || record.data.name
                    }
                    sortable={false}
                />
                <StatusRaField
                    source="data.status"
                    label="resources.operations.fields.status"
                    sortable={false}
                />
                <DurationRaField
                    source="data"
                    label="resources.operations.fields.duration"
                    sortable={false}
                />
                <IOStatisticsField source="statistics.inputs" />
                <IOStatisticsField source="statistics.outputs" />
            </DatagridConfigurable>
        </List>
    );
};

export default OperationRaListForRun;
