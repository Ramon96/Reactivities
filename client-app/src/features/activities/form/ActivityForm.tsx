import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { CategoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";


export default observer(function ActivityForm() {   
    const activityStore = useStore().activityStore;
    const { loading, loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;
    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const [activity, setActivity] = useState<Activity>({
        id: "",
        title: "",
        category: "",
        description: "",
        date: null,
        city: "",
        venue: ""
    });

    const validationSchema = Yup.object({
        title: Yup.string().required("The activity title is required"),	
        description: Yup.string().required("The activity description is required"),	
        category: Yup.string().required("The activity category is required"),	
        date: Yup.string().required("The activity date is required").nullable(),	
        venue: Yup.string().required("The activity venue is required"),	
        city: Yup.string().required("The activity city is required"),	
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    }, [loadActivity, id]);

    function handleFormSubmit(activity: Activity)  {
        if(activity.id.length === 0) {
            let newActivity = {...activity, id: uuid()};
            createActivity(newActivity)
                .then(() => {
                    history.push(`/activities/${newActivity.id}`);
                });
        } else {
            updateActivity(activity)
                .then(() => {
                    history.push(`/activities/${activity.id}`);
                });
        }
    }

    if(loadingInitial) return <LoadingComponent content="Loading activity..." />


    return (
        <Segment clearing>
            <Header sub color="teal" content="Activity details" />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea rows={3} placeholder="Description" name='description' />
                        <MySelectInput options={CategoryOptions} placeholder="Category" name='category' />
                        <MyDateInput 
                            placeholderText="Date"
                            name='date'
                            dateFormat="MMMM d, y h:mm a"
                            showTimeSelect
                            timeCaption="time"
                        />
                        <Header sub color="teal" content="Location details" />
                        <MyTextInput placeholder="City" name='city' />
                        <MyTextInput placeholder="Venue" name='venue' />
                        <Button 
                            loading={loading} 
                            floated="right" 
                            positive type="submit" 
                            content="Submit" 
                            disabled={!dirty || !isValid || isSubmitting}
                            />
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})