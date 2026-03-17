import {
    required,
    DateTimeInput,
    useTranslate,
    SelectInput,
    useListParams,
    useResourceContext,
} from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";

const weekAgo = (): Date => {
    const result = new Date();
    result.setDate(result.getDate() - 7);
    result.setHours(0, 0, 0, 0);
    return result;
};

type DependencyFilterValues = {
    since?: string;
    until?: string;
    depth?: number;
    direction?: string;
};
type DependencyFilterKeys = keyof DependencyFilterValues;
const dependencyFilterKeys: DependencyFilterKeys[] = [
    "since",
    "until",
    "depth",
    "direction",
];

type DependencyFiltersProps = {
    onSubmit: (values: DependencyFilterValues) => void;
    defaultSince?: Date;
    defaultDirection?: string;
};

const DependencyFilters = ({
    onSubmit,
    defaultSince,
    defaultDirection,
}: DependencyFiltersProps) => {
    const resource = useResourceContext() as string;

    const [listParams, listParamsActions] = useListParams({
        resource,
        filterDefaultValues: {},
        storeKey: false,
    });

    const translate = useTranslate();
    const form = useForm({ defaultValues: listParams.filterValues });

    const submit = form.handleSubmit(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (formValues: DependencyFilterValues & { [key: string]: any }) => {
            const keys = Object.keys(formValues);
            const validKeys = dependencyFilterKeys.filter((key) =>
                keys.includes(key),
            );
            const validValues = validKeys.reduce(
                (acc, key) => ({ ...acc, [key]: formValues[key] }),
                {},
            );
            listParamsActions.setFilters(validValues);
            onSubmit(validValues);
        },
    );

    // draw dependency just after opening the page
    useEffect(() => {
        submit();
    }, []);

    return (
        <FormProvider {...form}>
            <form onSubmit={submit}>
                <Box display="flex" alignItems="flex-end">
                    {/* Ignored by backend for now */}
                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="since"
                            validate={required()}
                            defaultValue={defaultSince ?? weekAgo()}
                            label="dependency.filters.since.label"
                            helperText="dependency.filters.since.helperText"
                        />
                    </Box>

                    {/* Ignored by backend for now */}
                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="until"
                            label="dependency.filters.until.label"
                            helperText="dependency.filters.until.helperText"
                        />
                    </Box>

                    {/* Ignored by backend for now */}
                    {/*
                    <Box component="span" mr={2}>
                        <SelectInput
                            source="depth"
                            choices={[
                                {
                                    id: 1,
                                    name: "1",
                                },
                                {
                                    id: 2,
                                    name: "2",
                                },
                                {
                                    id: 3,
                                    name: "3",
                                },
                                {
                                    id: 4,
                                    name: "4",
                                },
                                {
                                    id: 5,
                                    name: "5",
                                },
                                {
                                    id: 6,
                                    name: "6",
                                },
                                {
                                    id: 7,
                                    name: "7",
                                },
                                {
                                    id: 8,
                                    name: "8",
                                },
                                {
                                    id: 9,
                                    name: "9",
                                },
                                {
                                    id: 10,
                                    name: "10",
                                },
                            ]}
                            defaultValue={1}
                            validate={required()}
                            label="dependency.filters.depth.label"
                            helperText="dependency.filters.depth.helperText"
                        />
                    </Box>
                    */}

                    <Box component="span" mr={2}>
                        <SelectInput
                            source="direction"
                            choices={[
                                {
                                    id: "BOTH",
                                    name: "dependency.filters.direction.both",
                                },
                                {
                                    id: "DOWNSTREAM",
                                    name: "dependency.filters.direction.downstream",
                                },
                                {
                                    id: "UPSTREAM",
                                    name: "dependency.filters.direction.upstream",
                                },
                            ]}
                            defaultValue={defaultDirection ?? "BOTH"}
                            validate={required()}
                            label="dependency.filters.direction.label"
                            helperText="dependency.filters.direction.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2} mb={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            {translate("dependency.buildButton")}
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};

export default DependencyFilters;
