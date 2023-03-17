import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
import './Forecast.css'

export default class Forecast extends Component {
  render() {
    return (
        <div>
        <h1>Lawn Forecast</h1>
        {this.props.data && this.props.data.daily && this.props.data.daily.temperature_2m_max && (
          <Accordion>
            {this.props.data.daily.time.map((day, index) => (
              <AccordionItem key={day}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    {day}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  High Temperature: {this.props.data.daily.temperature_2m_max[index]}°F
                  <br></br>
                  Low Temperature: {this.props.data.daily.temperature_2m_min[index]}°F
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    )
  }
}
