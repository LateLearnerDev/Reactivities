import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {v4 as uuid} from 'uuid';

const ActivityForm = () => {
    const { activityStore } = useStore();
    const { selectedActivity, createActivity, updateActivity, loading,
        loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (!!id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    const handleSubmit = () => {
        if(!activity.id) {
            activity.id == uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    };

    const handlueInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });    // The square brackets are used like an accessor,
        //  like the props for the type can be indexed and selected. 
        //  So if 'name' comes back from the event as 'title' value, 
        //  we can access this prop and set it. This allows it to be dynamic
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handlueInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handlueInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handlueInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handlueInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handlueInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handlueInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);