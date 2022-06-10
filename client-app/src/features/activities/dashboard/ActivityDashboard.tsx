import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityForm from "../../form/ActivityForm";
import ActivityDetails from "../details/ActivityDetails";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    selectedActivity: Activity | undefined;
    cancelSelectedActivity: () => void;
    editMode: boolean;
    openForm: (id?: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ 
    activities, 
    selectActivity, 
    selectedActivity, 
    cancelSelectedActivity,
    openForm,
    closeForm,
    editMode,
    createOrEdit,
    deleteActivity
 }: Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                     activities={activities} 
                     selectActivity={selectActivity} 
                     deleteActivity={deleteActivity}
                    />
            </Grid.Column>
            <Grid.Column width={6}>
               {selectedActivity && !editMode &&
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelSelectedActivity={cancelSelectedActivity}
                        openForm={openForm}
                    /> 
                }
                {editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />
                }
            </Grid.Column>
        </Grid>
    )
}