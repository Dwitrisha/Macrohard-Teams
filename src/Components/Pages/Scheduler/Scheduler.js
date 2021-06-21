import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import './Scheduler.css'
 
const scheduler = window.scheduler;
 
export default class Scheduler extends Component {
    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        scheduler.config.hour_date = '%g:%i %A';
        scheduler.xy.scale_width = 70;
 
        const { events } = this.props;
        scheduler.init(this.schedulerContainer, new Date(2020, 5, 10));
        scheduler.clearAll();
        scheduler.parse(events);
    }
    shouldComponentUpdate(nextProps) {
        return this.props.timeFormatState !== nextProps.timeFormatState;
    }
 
    componentDidUpdate() {
        scheduler.render();
    }
 
    setTimeFormat(state) {
        scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }
 
    render() {

        const { timeFormatState } = this.props;
        this.setTimeFormat(timeFormatState);
        return (
            <div
                ref={ (input) => { this.schedulerContainer = input } }
                style={ {  width: '100%', height: '100%' } }
            ></div>
       );
    }
}