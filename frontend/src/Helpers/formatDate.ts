import { format, isValid } from 'date-fns';

function formatDate(date: string | Date): string {
  const parsed = new Date(date);

  if (!parsed || !isValid(parsed)) {
    return '';
  }
  return format(new Date(date), 'HH:mm b');
}

export default formatDate;
