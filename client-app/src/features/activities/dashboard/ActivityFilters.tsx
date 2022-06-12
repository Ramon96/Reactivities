import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size="large" style={{width: '100%', marginTop: 25}}>
                <Header icon="filter" attached color="blue" content="Filters" />
                <Menu.Item content="All activities" />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm posting" />
            </Menu>
            <Header icon="calendar" attached color="blue" content="Calendar" />
            <Calendar /> 
        </>
    )
};