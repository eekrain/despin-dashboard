import React from 'react';
import List from '@material-ui/core/List';

import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';
import routesConfig from '../../../../modules/routesConfig';

interface NavigationProps {
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <List>
      {routesConfig.map((item: any) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && <VerticalNavGroup item={item} level={0}/>}

          {item.type === 'collapse' && (
            <VerticalCollapse item={item} level={0}/>
          )}

          {item.type === 'item' && <VerticalItem item={item} level={0}/>}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Navigation;
