import { TagResponseV1 } from "@/dataProvider/types";
import { Chip, Box } from "@mui/material";

const TagValuesField = ({ tag }: { tag: TagResponseV1 }) => {
    return (
        <Box sx={{ width: "fit-content" }}>
            {tag.values.map((tag_value, tag_value_index) => (
                <Chip
                    key={tag_value_index}
                    label={`${tag.name}:${tag_value.value}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.7rem" }}
                />
            ))}
        </Box>
    );
};

export default TagValuesField;
