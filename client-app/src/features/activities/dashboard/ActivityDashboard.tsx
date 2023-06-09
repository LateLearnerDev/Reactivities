import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectedActivity: IActivity | undefined;
    selectActivity: (id: string) => void;
    cancelSeletActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

const ActivityDashboard = ({ activities, selectActivity, selectedActivity, cancelSeletActivity, 
    editMode, openForm, closeForm, createOrEdit, deleteActivity }: IProps) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList
                        activities={activities}
                        selectActivity={selectActivity}
                        deleteActivity={deleteActivity}
                    />
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {!!selectedActivity && !editMode
                    && <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSeletActivity}
                        openForm={openForm}
                    />}
                {!!editMode
                    && <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                    />}

            </Grid.Column>
        </Grid>
    )
};

export default ActivityDashboard;