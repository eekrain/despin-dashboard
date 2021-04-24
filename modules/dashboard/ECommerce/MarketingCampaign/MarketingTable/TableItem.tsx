import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import clsx from 'clsx';
import {MarketingCampaignData} from '../../../../../types/models/dashboards/Ecommerce';

const useStyles = makeStyles(() => ({
  tableRowRoot: {
    '& td': {
      borderBottomColor: '#E5E4EA',
      fontSize: 13,
      padding: 8,
      '&:first-child': {
        paddingLeft: 20,
      },
      '&:last-child': {
        paddingRight: 20,
      },
    },
  },
  textBase: {
    fontSize: 14,
    flex: 1,
  },
}));

interface TableItemProps {
  data: MarketingCampaignData;
}

const TableItem: React.FC<TableItemProps> = ({data}) => {
  const classes = useStyles();

  return (
    <TableRow
      key={data.id}
      className={clsx(classes.tableRowRoot, 'item-hover')}>
      <TableCell>
        <Box display='flex' alignItems='center'>
          <Box mr={4} clone>
            <Avatar src={data.icon} />
          </Box>
          <Box className={classes.textBase}>
            <Box mb={0.5} fontWeight={Fonts.MEDIUM}>
              {data.name}
            </Box>
            <Box component='p' color='text.secondary'>
              {data.description}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{data.spent}</TableCell>
      <TableCell>
        {data.growth ? (
          <img
            src={
              '${process.env.NEXT_PUBLIC_BASE_PATH}/images/dashboard/growth_icon.png'
            }
            alt='growth_icon'
          />
        ) : (
          <img
            src={
              '${process.env.NEXT_PUBLIC_BASE_PATH}/images/dashboard/decries_icon.png'
            }
            alt='decries_icon'
          />
        )}
        <Box
          component='span'
          mx={2}
          color={data.growth ? '#0A8FDC' : '#F44D50'}>
          {data.graph}
        </Box>
        <Box component='span' color='text.secondary'>
          {data.growth ? 'Up' : 'Down'}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
