import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import ChartControls from './ChartControls';


let initialValues = [0, 0, 0, 0, 0, 0, 0];

export default function StackedBarCharts(props) {
  const [sleepTime, setSleepTime] = useState(initialValues);
  const [sleepDelay, setSleepDelay] = useState(initialValues);
  const [awakeTime, setAwakeTime] = useState(initialValues);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const fillChart = () => {
    let sleepTimeArr = [];
    let sleepDelayArr = [];
    let awakeTimeArr = [];
    let period = [];
    
    props.entries.map((item) => {
      sleepTimeArr.push(item.sleepTime);
      sleepDelayArr.push(item.sleepDelay);
      awakeTimeArr.push(item.awakeTime);
      period.push(item.sleepEnd);

    });
    console.log(sleepTimeArr);
    console.log(sleepDelayArr);
    console.log(awakeTimeArr);
    
    setSleepTime(sleepTimeArr);
    setSleepDelay(sleepDelayArr);
    setAwakeTime(awakeTimeArr);
    setStart(period[0]);
    setEnd(period[6]);
  };

  const stackData = [
      {
        stacks: [
          {value: sleepTime[0] / 60, color: 'orange'},
          {value: sleepDelay[0] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[0] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Mon',
      },
        {
        stacks: [
          {value: sleepTime[1] / 60, color: 'orange'},
          {value: sleepDelay[1] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[1] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Tue',
      },
      {
        stacks: [
          {value: sleepTime[2] / 60, color: 'orange'},
          {value: sleepDelay[2] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[2] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Wed',
      },
      {
        stacks: [
          {value: sleepTime[3] / 60, color: 'orange'},
          {value: sleepDelay[3] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[3] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Thu',
      },
      {
        stacks: [
          {value: sleepTime[4] / 60, color: 'orange'},
          {value: sleepDelay[4] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[4] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Fri',
      },
      {
        stacks: [
          {value: sleepTime[5] / 60, color: 'orange'},
          {value: sleepDelay[5] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[5] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Sat',
      },
       {
        stacks: [
          {value: sleepTime[6] / 60, color: 'orange'},
          {value: sleepDelay[6] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[6] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Sun',
      },
    ];

    return(
        <View style={styles.container}>
          <Text>SleepTime: {sleepTime[0]}</Text>
          <Text>SleepDelay: {sleepDelay[0]}</Text>
          <Text>AwakeTime: {awakeTime[0]}</Text>
          <Text>Start: {start}</Text>
          <Text>End: {end}</Text>
          <BarChart
            width={340}
            height={340}
            rotateLabel
            noOfSections={15}
            maxValue={14}
            stackData={stackData}
          />
          <ChartControls 
            fillChart={fillChart}
            start={start}
            end={end}
          />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    padding: 5,
    backgroundColor: 'gray'
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});
  