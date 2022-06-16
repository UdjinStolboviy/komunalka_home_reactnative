import moment from "moment";

export const transformDate = (input: string): string => {
  if (!input) {
    return '';
  }
  const date = new Date(input);
  const momentDate = moment(date);
  const month = momentDate.format("MMMM").substring(0, 3);
  const day = momentDate.format("DD");
  const year = momentDate.format("YYYY");
  return month + ' ' + day + ', ' + year;
};
