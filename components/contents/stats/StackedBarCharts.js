import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";


export default function StackedBarCharts(props) {
  let sleepTimeList1 = [11, 12, 13, 14, 15, 16, 17];
  let sleepDelayList1 = [1, 2, 3, 4, 5, 6, 7];
  let awakeTimeList1 = [1, 2, 3, 4, 5, 6, 7];

  let valuelist = [];

  const entries = [
    {
      sleepTime: 5,
      sleepDelay: 30,
      awakeTime: 10,
      test: 'test1'
    },
    {
      sleepTime: 7,
      sleepDelay: 30,
      awakeTime: 0,
      test: 'test2'
    },
    {
      sleepTime: 10,
      sleepDelay: 15,
      awakeTime: 10,
      test: 'test3'
    }
  ];




  useEffect(() => {
    valuelist = listValues();
    console.log(valuelist);
/*     sleepDelayList = listSleepDelay();
    awakeTimeList = listAwakeTime(); */
  }, []);

  const listValues = () => {
    const values = [];

    entries.forEach((item) => {
      const value = parseInt(item.sleepTime);
      console.log(value);
      values.push(value);
    });
    return values;
  };

/*   const listSleepDelay = () => {
    const list = [];

    props.entries.forEach((item, index) => {
      list.push(
        <div key={index}>
          <div>{item.sleepDelay}</div>
        </div>
      );
    });
    return list;
  };

  const listAwakeTime = () => {
    const list = [];

    props.entries.forEach((item, index) => {
      list.push(
        <div key={index}>
          <div>{item.awakeTime}</div>
        </div>
      );
    });
    return list;
  }; */

  const stackData = [
      {
        stacks: [
          {value: 1, color: 'orange'},
          {value: sleepDelayList1[0], color: '#4ABFF4', marginBottom: 2},
          {value: awakeTimeList1[0], color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Mon',
      },
      {
        stacks: [
          {value: 1, color: 'orange'},
          {value: sleepDelayList1[1], color: '#4ABFF4', marginBottom: 2},
          {value: awakeTimeList1[1], color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Tue',
      },
      {
        stacks: [
          {value: sleepTimeList1[2], color: 'orange'},
          {value: sleepDelayList1[2], color: '#4ABFF4', marginBottom: 2},
          {value: awakeTimeList1[2], color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Wed',
      },
      {
        stacks: [
          {value: sleepTimeList1[3], color: 'orange'},
          {value: sleepDelayList1[3], color: '#4ABFF4', marginBottom: 2},
          {value: awakeTimeList1[3], color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Thu',
      },
      {
        stacks: [
          {value: sleepTimeList1[4], color: 'orange'},
          {value: sleepDelayList1[4], color: '#4ABFF4', marginBottom: 2},
          {value: awakeTimeList1[4], color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Fri',
      },
      {
        stacks: [
          {value: sleepTimeList1[5], color: 'orange'},
          {value: sleepDelayList1[5], color: '#4ABFF4', marginBottom: 2},
          {value: awakeTimeList1[5], color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Sat',
      },
      {
        stacks: [
          {value: sleepTimeList1[6], color: 'orange'},
          {value: sleepDelayList1[6], color: '#4ABFF4', marginBottom: 2},
          {value: awakeTimeList1[6], color: '#4ABFF4', marginBottom: 2},
        ],
        //label: 'Sun',
      },
    ];

    return(
        <View>
          <Text>Test: {parseInt(valuelist[0])}</Text>
{/*             <BarChart
              width={340}
              height={340}
              rotateLabel
              noOfSections={10}
              stackData={stackData}
            /> */}
        </View>
    );
};