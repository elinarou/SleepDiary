import format from "date-fns/format";

export default function FormatDate(props) {
      return format(props.value, "dd.LL.");
};