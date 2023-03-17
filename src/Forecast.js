import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString("en-US", options);
};

export default class Forecast extends Component {
    render() {
        return (
            <div>
                {this.props.data && this.props.data.daily && this.props.data.daily.temperature_2m_max && (
                    <Accordion>
                        {this.props.data.daily.time.map((day, index) => (
                            <AccordionItem key={day}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {convertDate(day)}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <table>
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
                                    </table>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        )
    }
}
