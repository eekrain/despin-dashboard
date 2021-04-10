import React from 'react';
import {Box} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {
  BrandData,
  IdealFor,
} from '../../../../types/models/ecommerce/EcommerceApp';

interface CheckedCellProps {
  selected: number[];
  data: IdealFor | BrandData;
  onChange: (val: any) => void;
}

const CheckedCell: React.FC<CheckedCellProps> = ({
  selected,
  data,
  onChange,
}) => {
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      onClick={() => onChange(data.id)}
      className='pointer'>
      <Checkbox
        checked={selected.some(item => item === data.id)}
        color='primary'
        inputProps={{'aria-label': 'secondary checkbox'}}
      />
      <Box>{data.name}</Box>
    </Box>
  );
};

export default CheckedCell;
