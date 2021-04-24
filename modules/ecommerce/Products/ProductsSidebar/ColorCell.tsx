import React from 'react';
import {Box} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';

interface ColorCellProps {
  selected: number[];
  data: any;
  onChange: (val: any) => void;
}

const ColorCell: React.FC<ColorCellProps> = ({selected, data, onChange}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection='row'
      justifyContent='center'
      style={{
        backgroundColor: data,
        borderRadius: 100,
        height: 40,
        width: 40,
      }}
      onClick={() => onChange(data)}
      className='pointer'>
      {selected.some(item => item === data) ? (
        <IconButton
          style={{
            height: 40,
            width: 40,
          }}>
          <CheckIcon style={{color: 'white'}} />
        </IconButton>
      ) : null}
    </Box>
  );
};

export default ColorCell;
