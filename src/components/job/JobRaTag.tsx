import { useRecordContext } from "react-admin";
import { JobDetailedResponseV1 } from "@/dataProvider/types";
import { Stack } from "@mui/material";
import { TagValuesField } from "@/components/tag";

const JobRaTag = () => {
    const record: JobDetailedResponseV1 | undefined = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <Stack spacing={1}>
            {record.tags?.map((tag, tag_index) => (
                <TagValuesField tag={tag} key={tag_index} />
            ))}
        </Stack>
    );
};

export default JobRaTag;
