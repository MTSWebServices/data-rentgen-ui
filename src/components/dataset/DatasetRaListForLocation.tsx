import { ReactElement } from "react";
import { ListActions } from "@/components/base";
import { List, TextField, DatagridConfigurable } from "react-admin";
import DatasetRaListFilters from "./DatasetRaListFilters";

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
            </DatagridConfigurable>
        </List>
    );
};

export default DatasetRaListForLocation;
