import React from 'react';
import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import tz from 'dayjs/plugin/timezone';

// dayjs.extend(utc);
// dayjs.extend(tz);
require('dayjs/plugin/timezone');

interface IDateTimeProps {
  time: string;
}

const DateTime = ({time}: IDateTimeProps) => {
  return <>{dayjs(time).format('D/M/YYYY HH:mm:ss')}</>;
};

export default DateTime;
