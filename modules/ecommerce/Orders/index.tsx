import React, {useEffect, useState} from 'react';
import OrderTable from './OrderTable';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getRecentOrders} from '../../../redux/actions/Ecommerce';
import {Button, Hidden} from '@material-ui/core';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AppAnimate from '../../../@crema/core/AppAnimate';
import InfoView from '../../../@crema/core/InfoView';
import {AppState} from '../../../redux/store';

const Orders = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {recentOrders, orderCount} = useSelector<
    AppState,
    AppState['ecommerce']
  >(({ecommerce}) => ecommerce);
  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState<string>('');
  const onPageChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number,
  ) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getRecentOrders(search, page));
  }, [dispatch, search, page]);

  const onSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AppsContainer
          title={messages['eCommerce.recentOrders'] as string}
          fullView>
          <AppsHeader>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              width={1}
              justifyContent='space-between'>
              <TextField
                style={{maxWidth: 150}}
                margin='dense'
                id='user-name'
                placeholder='Search'
                type='search'
                variant='outlined'
                onChange={onSearchOrder}
              />
              <Box display='flex' flexDirection='row' alignItems='center'>
                <Button variant='contained' color='primary'>
                  Add Order
                </Button>

                <Hidden xsDown>
                  <AppsPagination
                    rowsPerPage={10}
                    count={orderCount}
                    page={page}
                    onPageChange={onPageChange}
                  />
                </Hidden>
              </Box>
            </Box>
          </AppsHeader>

          <AppsContent
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <OrderTable orderData={recentOrders} />
          </AppsContent>

          <Hidden smUp>
            <AppsPagination
              rowsPerPage={10}
              count={orderCount}
              page={page}
              onPageChange={onPageChange}
            />
          </Hidden>
        </AppsContainer>
      </AppAnimate>
      <InfoView />
    </>
  );
};

export default Orders;
