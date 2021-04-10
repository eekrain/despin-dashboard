import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import {CartItems} from '../../../../types/models/ecommerce/EcommerceApp';

interface CartTableProps {
  cartItems: CartItems[];
}

const CartTable: React.FC<CartTableProps> = ({cartItems}) => {
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {cartItems.map(data => (
            <TableItem data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CartTable;
