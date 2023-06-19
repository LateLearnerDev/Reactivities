import React, { SyntheticEvent, useState } from 'react';
import { IActivity } from '../../../app/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface IProps {
    activities: IActivity[];
    submitting: boolean;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    setEditMode: (enabled: boolean) => void;
}

const ActivityList = ({ activities, selectActivity, deleteActivity, setEditMode, submitting }: IProps) => {
    const [target, setTarget] = useState('');

    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    };
    
    return (
        <Segment color='blue'>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => {
                                    setEditMode(false);
                                    selectActivity(activity.id)
                                }}
                                    floated='right' content='View' color='blue' />
                                <Button
                                    name={activity.id}
                                    loading={submitting && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
};

export default ActivityList;