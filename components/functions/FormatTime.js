import format from 'date-fns/format';

export default function FormatTime(props) {
      return format(props.value, 'HH:mm');
};