import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import TableContainer from '@material-ui/core/TableContainer';
import {RecentOrderData} from '../../../../../types/models/dashboards/Ecommerce';

interface OrderTableProps {
  orderData: RecentOrderData[];
}

const OrderTable: React.FC<OrderTableProps> = ({orderData}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {orderData.map(data => (
            <TableItem data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
