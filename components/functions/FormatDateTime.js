import format from 'date-fns/format';

export default function FormatDateTime(props) {
      return format(props.value, 'dd.LL.yyyy HH:mm');
};