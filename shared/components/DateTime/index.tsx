import React from 'react';

interface IDateTimeProps {
  time: string;
}

const DateTime = ({time}: IDateTimeProps) => {
  return (
    <>
      {Intl.DateTimeFormat(['ban', 'id'], {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(time))}
    </>
  );
};

export default DateTime;
