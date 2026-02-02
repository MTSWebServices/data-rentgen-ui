import { TagDetailedResponseV1 } from "@/dataProvider/types";
import { useMemo, useState } from "react";
import {
    useGetList,
    AutocompleteArrayInput,
    AutocompleteArrayInputProps,
} from "react-admin";

type TagsRaFilterProps = Omit<
    AutocompleteArrayInputProps,
    | "source"
    | "choices"
    | "value"
    | "optionValue"
    | "optionText"
    | "onChange"
    | "isPending"
    | "loading"
    | "onInputChange"
    | "shouldRenderSuggestions"
>;

const TagsRaFilter = (props: TagsRaFilterProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedTagValues, setSelectedTagValues] =
        useState<TagDetailedResponseV1[]>();

    const tagFilter =
        searchQuery.length > 2 ? { search_query: searchQuery } : {};

    const { data, isPending, isLoading } = useGetList<TagDetailedResponseV1>(
        "tags",
        { filter: tagFilter },
    );

    const tagValues = useMemo(
        () =>
            data?.flatMap((tag) => {
                const tagInfo = tag;
                return (
                    tag.data.values.map((tagValue) => ({
                        label: `${tagInfo.data.name}:${tagValue.value}`,
                        name: tagInfo.data.name,
                        ...tagValue,
                    })) ?? []
                );
            }),
        [data],
    );

    return (
        <AutocompleteArrayInput
            source="tag_value_id"
            choices={tagValues}
            value={selectedTagValues}
            optionValue="id"
            optionText="label"
            isPending={isPending}
            loading={isLoading}
            onChange={(value) => setSelectedTagValues(value)}
            onInputChange={(_e, value) => setSearchQuery(value)}
            groupBy={(option) => option.name}
            shouldRenderSuggestions={(val: string) => {
                return val.trim().length === 0 || val.trim().length > 2;
            }}
            {...props}
        />
    );
};

export default TagsRaFilter;
