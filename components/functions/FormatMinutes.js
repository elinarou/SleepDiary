export default function FormatMinutes(props) {
    const hours = Math.floor(props.value / 60);
    const minutes = props.value % 60;

    return `${hours} h and ${minutes} min`;
};
