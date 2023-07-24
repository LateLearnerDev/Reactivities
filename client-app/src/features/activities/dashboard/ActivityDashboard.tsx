import React, { useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const {loadActivities, activityRegistry}= activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size]);


    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList />
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);