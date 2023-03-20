import React, { Component } from 'react'
import LineGraph from 'smooth-line-graph';
import './Graph.css'

const testData = {
    name: 'simple',
    width: 350,
    height: 250,
    lines: [
        {
            key: 'mykey',
            data: [],
            color: '#3E98C7',
            smooth: true
        }
    ]
};

function formatPrecipData(data, day) {
    let hourlyPrecip = data.hourly.rain;
    let hourlyTime = data.hourly.time;
    let dateRegex = /\d{4}-\d{2}-\d{2}/;
    let timeRegex = /\d{2}:\d{2}/;
    let formattedData = [];

    for (var i=0; i<hourlyTime.length; i++)
    {
        if (hourlyTime[i].match(dateRegex)[0] === day) {
            formattedData.push([parseInt(hourlyTime[i].match(timeRegex)[0]), hourlyPrecip[i]*1000]);
        }
    }

   return formattedData;
}

export default class Graph extends Component {
 render() {
    testData.lines[0].key = `key ${this.props.day}`;
    testData.lines[0].data = formatPrecipData(this.props.data, this.props.day)
    return (
      <div className='graph'>
        <LineGraph {...testData} minX={0} maxX={24} minY={-10} maxY={100}/>
      </div>
    )
  }
}
