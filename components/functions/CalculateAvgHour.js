export default function CalculateAvgHour(props) {
  const average = props.arr.reduce((a, b) => a + b, 0) / props.arr.length;

  const hours = Math.floor(average / 60);
  const minutes = average % 60;

  return `${hours.toFixed()} h ${minutes.toFixed()} min`;
};
  