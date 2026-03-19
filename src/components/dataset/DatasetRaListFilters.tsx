import { FilterLiveForm, minLength } from "react-admin";

import { Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextInput } from "react-admin";
import { LocationRaTypeFilter } from "@/components/location";
import TagsRaFilter from "@/components/tag/TagsRaFilter";

const DatasetRaListFilters = ({
    withLocationType = true,
}: {
    withLocationType?: boolean;
}) => {
    return (
        <FilterLiveForm>
            <Box display="flex" alignItems="flex-end">
                {withLocationType && (
                    <Box
                        component="span"
                        mr={2}
                        sx={{ flex: "0.2", minWidth: "50px" }}
                    >
                        <LocationRaTypeFilter />
                    </Box>
                )}

                <Box
                    component="span"
                    mr={2}
                    sx={{ flex: "0.3", minWidth: "50px" }}
                >
                    <TagsRaFilter
                        label="resources.datasets.filters.tags.label"
                        helperText="resources.datasets.filters.tags.helperText"
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
                        label="resources.datasets.filters.search_query.label"
                        helperText="resources.datasets.filters.search_query.helperText"
                    />
                </Box>
            </Box>
        </FilterLiveForm>
    );
};

export default DatasetRaListFilters;
