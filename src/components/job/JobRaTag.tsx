import { useRecordContext } from "react-admin";
import { JobDetailedResponseV1 } from "@/dataProvider/types";
import { Stack, Box } from "@mui/material";
import { TagValuesField } from "@/components/base";

const JobRaTag = () => {
    const record: JobDetailedResponseV1 | undefined = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <Stack spacing={1}>
            {record.tags?.map((tag, tag_index) => (
                <Box key={tag_index} sx={{ width: "fit-content" }}>
                    <TagValuesField tag={tag} />
                </Box>
            ))}
        </Stack>
    );
};

export default JobRaTag;
