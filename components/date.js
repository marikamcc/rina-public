// import { parseISO, format } from 'date-fns';
import { parseISO } from 'date-fns';
import { format } from 'timeago.js';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
