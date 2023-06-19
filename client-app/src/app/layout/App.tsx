import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
      })
  }, []);

  const handleSelectActivity = (id: string) => setSelectedActivity(activities.find(x => x.id === id));

  const handleCancelSelectActivity = () => setSelectedActivity(undefined);

  const handleFormOpen = (id?: string) => {
    !!id
      ? handleSelectActivity(id)
      : handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => setEditMode(false);

  const handleCreateOrEditActivity = (activity: IActivity) => {
    !!activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const handleDeleteActivity = (id: string) =>
    setActivities([...activities.filter(x => x.id !== id)]);

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSeletActivity={handleCancelSelectActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
