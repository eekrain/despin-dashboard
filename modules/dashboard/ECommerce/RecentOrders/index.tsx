import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppSelect from '../../../../@crema/core/AppSelect';
import OrderTable from './OrderTable';
import {RecentOrderData} from '../../../../types/models/dashboards/Ecommerce';

interface RecentOrdersProps {
  recentOrders: RecentOrderData[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({recentOrders}) => {
  const {messages} = useIntl();
  const handleSelectionType = (data: unknown) => {
    console.log('data: ', data);
  };
  return (
    <AppCard
      contentStyle={{paddingRight: 0, paddingLeft: 0}}
      title={messages['eCommerce.recentOrders']}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleSelectionType}
        />
      }>
      <OrderTable orderData={recentOrders} />
    </AppCard>
  );
};

export default RecentOrders;
