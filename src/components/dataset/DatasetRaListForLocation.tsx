import { ReactElement } from "react";
import { ListActions } from "@/components/base";
import { List, TextField, DatagridConfigurable, ArrayField } from "react-admin";
import DatasetRaListFilters from "./DatasetRaListFilters";
import DatasetRaTag from "./DatasetRaTag";
import DatasetRaExternalIdField from "./DatasetRaExternalIdField";

const DatasetRaListForLocation = ({
    locationId,
}: {
    locationId: number;
}): ReactElement => {
    return (
        <List
            resource="datasets"
            filter={{ location_id: locationId }}
            actions={
                <ListActions>
                    <DatasetRaListFilters withLocationType={false} />
                </ListActions>
            }
            storeKey={false}
            title={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <TextField
                    source="data.name"
                    label="resources.datasets.fields.name"
                    sortable={false}
                />
                <DatasetRaExternalIdField
                    source="data.external_id"
                    label="resources.datasets.fields.external_id"
                />
                <ArrayField
                    source="data.tags"
                    label="resources.datasets.fields.tags"
                >
                    <DatasetRaTag />
                </ArrayField>
            </DatagridConfigurable>
        </List>
    );
};

export default DatasetRaListForLocation;
