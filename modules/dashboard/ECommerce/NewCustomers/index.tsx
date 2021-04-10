import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import CustomerItem from './CustomerItem';
import AppList from '../../../../@crema/core/AppList';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import {NewCustomersData} from '../../../../types/models/dashboards/Ecommerce';

interface NewCustomersProps {
  newCustomers: NewCustomersData[];
}

const NewCustomers: React.FC<NewCustomersProps> = ({newCustomers}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['eCommerce.newCustomers']}
      contentStyle={{paddingRight: 0, paddingLeft: 0}}>
      <Scrollbar style={{maxHeight: 280}}>
        <AppList
          data={newCustomers}
          renderRow={item => <CustomerItem key={item.id} item={item} />}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default NewCustomers;
