export default function CalculateAvgMin(props) {
  const average = props.arr.reduce((a, b) => a + b, 0) / props.arr.length;

  return average.toFixed();
};

