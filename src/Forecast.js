import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Graph from './Graph'
import 'react-circular-progressbar/dist/styles.css';
import './Forecast.css'

function isPrecipNull(data) {
    if (data) {
        return `${data}%`;
    }
    else {
        return '?';
    }
};

function convertDate(date) {
    return new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

/*
    Process weather variables and return visual cues for quick reference by the user
*/
function assessWeather(data, index) {
    let maxTemp = data.daily.temperature_2m_max[index];
    let maxPrecip = data.daily.precipitation_probability_max[index];

    if (maxTemp >= 50) {
        if (maxPrecip >= 50) {
            return '❌';
        }
        else if (maxPrecip >= 25) {
            return '✅';
        }
        else {
            return '✅';
        }
    }
    else {
        return '❌';
    }
}

function assessWeatherAttributes(data, index) {
    let attributeString = '';
    let maxTemp = data.daily.temperature_2m_max[index];
    let maxPrecip = data.daily.precipitation_probability_max[index];

    if (maxTemp >= 50) {
        attributeString += '🌞 ';
    }
    if (maxTemp < 50) {
        attributeString += '🥶 ';
    }
    if (maxPrecip >= 50) {
        attributeString += '🌧 ';
    }
    else if (maxPrecip >= 25) {
        attributeString += '☁ ';
    }

    return attributeString;
}

export default class Forecast extends Component {
    render() {
        return (
            <div className="forecast">
                {this.props.data && this.props.data.daily && this.props.data.daily.temperature_2m_max && (
                    <Accordion>
                        {this.props.data.daily.time.map((day, index) => (
                            <AccordionItem key={day}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {assessWeather(this.props.data, index)}
                                        {` - [${assessWeatherAttributes(this.props.data, index)}]`}
                                        {' '}
                                        {convertDate(day)}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    High
                                                </td>
                                                <td>
                                                    Low
                                                </td>
                                                <td>
                                                    Rain
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <CircularProgressbar value={100} text={`${Math.ceil(this.props.data.daily.temperature_2m_max[index])}°F`}
                                                        styles={buildStyles({
                                                            pathColor: '#FF6961',
                                                            textColor: 'black'
                                                        })} />
                                                </td>
                                                <td>
                                                    <CircularProgressbar value={100} text={`${Math.ceil(this.props.data.daily.temperature_2m_min[index])}°F`}
                                                        styles={buildStyles({
                                                            pathColor: '#ADD8E6',
                                                            textColor: 'black'
                                                        })} />
                                                </td>
                                                <td>
                                                    <CircularProgressbar value={this.props.data.daily.precipitation_probability_max[index]} text={isPrecipNull(this.props.data.daily.precipitation_probability_max[index])} />
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                    <Graph data={this.props.data} day={day} />
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        )
    }
}
