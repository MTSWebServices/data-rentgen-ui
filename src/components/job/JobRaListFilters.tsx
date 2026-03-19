import { minLength, useListContext, useTranslate } from "react-admin";

import { Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextInput } from "react-admin";
import { useForm, FormProvider } from "react-hook-form";
import JobTypeRaFilter from "./JobRaTypeFilter";
import { LocationRaTypeFilter } from "../location";
import TagsRaFilter from "@/components/tag/TagsRaFilter";
import { useCallback, useEffect } from "react";

type JobRaListFilterValues = {
    location_type?: string[];
    location_id?: number;
    job_type?: string[];
    search_query?: string;
};
type JobRaListFilterKeys = keyof JobRaListFilterValues;
const filterKeys: JobRaListFilterKeys[] = [
    "location_type",
    "location_id",
    "job_type",
    "search_query",
];

const JobRaListFilters = ({
    withLocationType = true,
}: {
    withLocationType?: boolean;
}) => {
    const translate = useTranslate();
    const { filterValues, setFilters } = useListContext();
    const form = useForm({ defaultValues: filterValues });

    const onSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (formValues: JobRaListFilterValues & { [key: string]: any }) => {
            const keys = Object.keys(formValues);
            const validKeys = filterKeys.filter((key) => keys.includes(key));
            const validValues = validKeys.reduce(
                (acc, key) => ({ ...acc, [key]: formValues[key] }),
                {},
            );
            setFilters(validValues);
        },
        [setFilters],
    );

    const submit = form.handleSubmit(onSubmit);

    useEffect(() => {
        submit();
    }, [form]);

    return (
        <FormProvider {...form}>
            <form onSubmit={submit}>
                <Box display="flex" alignItems="flex-end">
                    {withLocationType && (
                        <Box component="span" mr={2} sx={{ flex: "0.2" }}>
                            <LocationRaTypeFilter />
                        </Box>
                    )}

                    <Box component="span" mr={2} sx={{ flex: "0.2" }}>
                        <JobTypeRaFilter />
                    </Box>

                    <Box
                        component="span"
                        mr={2}
                        sx={{ flex: "0.3", minWidth: "50px" }}
                    >
                        <TagsRaFilter
                            label="resources.jobs.filters.tags.label"
                            helperText="resources.jobs.filters.tags.helperText"
                        />
                    </Box>

                    <Box
                        component="span"
                        mr={2}
                        sx={{ flex: "0.3", minWidth: "50px" }}
                    >
                        {/* Not using SearchInput here because it doesn't match styles with other filters */}
                        <TextInput
                            source="search_query"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon color="disabled" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            validate={minLength(3)}
                            label="resources.jobs.filters.search_query.label"
                            helperText="resources.jobs.filters.search_query.helperText"
                        />
                    </Box>

                    <Box component="span" mb={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            {translate("resources.jobs.filters.apply_button")}
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};

export default JobRaListFilters;
