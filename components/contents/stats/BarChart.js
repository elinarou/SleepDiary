import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { BarChart } from 'react-native-gifted-charts';
import CalculateAvg from '../../functions/CalculateAvg';
import CalculateAvgHour from '../../functions/CalculateAvgHour';
import FormatDate from '../../functions/FormatDate';
import { Feather } from 'react-native-vector-icons'; 


let initialValues = [0, 0, 0, 0, 0, 0, 0];

export default function BarCharts(props) {
  const [showStats, setShowStats] = useState(false);
  const [sleepTime, setSleepTime] = useState(initialValues);
  const [sleepDelay, setSleepDelay] = useState(initialValues);
  const [awakeTime, setAwakeTime] = useState(initialValues);
  const [quality, setQuality] = useState(initialValues);
  const [weekday, setWeekday] = useState(initialValues);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fillChart = () => {
    let sleepTimeArr = [];
    let sleepDelayArr = [];
    let awakeTimeArr = [];
    let qualityArr = [];
    let period = [];
    
    props.entries.map((item) => {
      sleepTimeArr.push(item.sleepTime);
      sleepDelayArr.push(item.sleepDelay);
      awakeTimeArr.push(item.awakeTime);
      qualityArr.push(item.quality);
      period.push(item.sleepEnd);

    });

    if (sleepTimeArr.length < 7) {
      alert('Make entries for 7 days to see stats.');
      setShowStats(false);
    }
    else {
      setSleepTime(sleepTimeArr);
      setSleepDelay(sleepDelayArr);
      setAwakeTime(awakeTimeArr);
      setQuality(qualityArr);
      setWeekday(period);
      setStartDate(period[0]);
      setEndDate(period[6]);
    };
  };

  const translateDay = (day) => {
    switch (day) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    };
  };

  const stackData = [
      {
        stacks: [
          {value: sleepTime[0] / 60, color: 'orange'},
          {value: sleepDelay[0] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[0] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        label: translateDay(new Date(weekday[0]).getDay()),
      },
        {
        stacks: [
          {value: sleepTime[1] / 60, color: 'orange'},
          {value: sleepDelay[1] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[1] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        label: translateDay(new Date(weekday[1]).getDay()),
      },
      {
        stacks: [
          {value: sleepTime[2] / 60, color: 'orange'},
          {value: sleepDelay[2] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[2] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        label: translateDay(new Date(weekday[2]).getDay()),
      },
      {
        stacks: [
          {value: sleepTime[3] / 60, color: 'orange'},
          {value: sleepDelay[3] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[3] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        label: translateDay(new Date(weekday[3]).getDay()),
      },
      {
        stacks: [
          {value: sleepTime[4] / 60, color: 'orange'},
          {value: sleepDelay[4] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[4] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        label: translateDay(new Date(weekday[4]).getDay()),
      },
      {
        stacks: [
          {value: sleepTime[5] / 60, color: 'orange'},
          {value: sleepDelay[5] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[5] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        label: translateDay(new Date(weekday[5]).getDay()),
      },
       {
        stacks: [
          {value: sleepTime[6] / 60, color: 'orange'},
          {value: sleepDelay[6] / 60, color: '#4ABFF4', marginBottom: 2},
          {value: awakeTime[6] / 60, color: '#4ABFF4', marginBottom: 2},
        ],
        label: translateDay(new Date(weekday[6]).getDay()),
      },
    ];

    return(
        <View style={styles.container}>
          {showStats ? // Conditional rendering, 1. & 2.
          // 1. Stats
          <View>
            <Text style={styles.heading}>
              <FormatDate value={new Date(startDate)} /> - <FormatDate value={new Date(endDate)} />
            </Text>
            <BarChart
              width={340}
              height={340}
              noOfSections={15}
              maxValue={13}
              stackData={stackData}
            />
            <View style={styles.stats}>
              <Text style={styles.text}>Sleep time (avg): <CalculateAvgHour arr={sleepTime} /></Text>
              <Text style={styles.text}>Sleep latency (avg): <CalculateAvg arr={sleepDelay} /> min</Text>
              <Text style={styles.text}>Awake time (avg): <CalculateAvg arr={awakeTime} /> min</Text>
              <Text style={styles.text}>Sleep quality (avg): <CalculateAvg arr={quality} />/5</Text>
            </View>
          </View>
          : // 2. Initial rendering: Refresh button
          <TouchableOpacity style={styles.button} 
            onPress={() => {
              fillChart();
              setShowStats(true);
            }}>
            <Feather name={'refresh-cw'} size={80} />
          </TouchableOpacity>
          }
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

  stats: {
    padding: 5,
  },

  button: {
    padding: 5,
    backgroundColor: 'gray',
    borderRadius: 20
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },

  text: {
    fontSize: 20
  },
});
  