import { ReactElement } from "react";
import { List, TextField, DatagridConfigurable, ArrayField } from "react-admin";
import { ListActions } from "@/components/base";
import {
    LocationRaNameWithLinkField,
    LocationRaTypeWithIconField,
} from "@/components/location";
import DatasetRaListFilters from "./DatasetRaListFilters";
import DatasetRaTag from "./DatasetRaTag";

const DatasetRaList = (): ReactElement => {
    return (
        <List
            actions={
                <ListActions>
                    <DatasetRaListFilters />
                </ListActions>
            }
            resource="datasets"
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
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
                <TextField
                    source="data.name"
                    label="resources.datasets.fields.name"
                    sortable={false}
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

export default DatasetRaList;
