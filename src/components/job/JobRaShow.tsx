import { ReactElement } from "react";
import {
    ArrayField,
    Labeled,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
    WithRecord,
} from "react-admin";

import JobRaLineage from "./JobRaLineage";
import { RunRaListForJob } from "@/components/run";
import { LocationRaRefUrlField } from "@/components/location";
import JobRaTag from "./JobRaTag";
import JobRaHierarchy from "./JobRaHierarchy";
import JobRaRepr from "./JobRaRepr";

const JobRaShow = (): ReactElement => {
    return (
        <Show resource="jobs">
            <SimpleShowLayout>
                <TextField source="id" label="resources.jobs.fields.id" />
                <Labeled label="resources.jobs.sections.info">
                    <JobRaRepr />
                </Labeled>

                <ReferenceField
                    reference="jobs"
                    source="data.parent_job_id"
                    label="resources.jobs.sections.parent_job"
                />

                <Labeled label="resources.jobs.sections.location">
                    <LocationRaRefUrlField source="data.location" />
                </Labeled>

                <ArrayField
                    source="data.tags"
                    label="resources.jobs.fields.tags"
                >
                    <JobRaTag />
                </ArrayField>

                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="resources.jobs.tabs.runs">
                        <WithRecord
                            render={(record) => (
                                <RunRaListForJob jobId={record.id} />
                            )}
                        />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab
                        label="resources.jobs.tabs.hierarchy"
                        path="hierarchy"
                    >
                        <JobRaHierarchy />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab
                        label="resources.jobs.tabs.lineage"
                        path="lineage"
                    >
                        <JobRaLineage />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default JobRaShow;
