import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const ActivityForm = () => {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState);

    const handleSubmit = () =>
        !!activity.id ? updateActivity(activity) : createActivity(activity);

    const handlueInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });    // The square brackets are used like an accessor,
                                                        //  like the props for the type can be indexed and selected. 
                                                        //  So if 'name' comes back from the event as 'title' value, 
                                                        //  we can access this prop and set it. This allows it to be dynamic
    }

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
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);