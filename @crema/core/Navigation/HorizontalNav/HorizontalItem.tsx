import React from 'react';
import {Icon, ListItem, ListItemText} from '@material-ui/core';
import {Badge} from '../../../../@crema';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import IntlMessages from '../../../utility/IntlMessages';
import useStyles from './HorizontalItem.style';
import Box from '@material-ui/core/Box';
import {NavItemProps} from '../../../../modules/routesConfig';

interface HorizontalItemProps {
  item: NavItemProps;
  dense?: string;
}

const HorizontalItem: React.FC<HorizontalItemProps> = ({item, dense}) => {
  const classes = useStyles();
  const router = useRouter();
  const {pathname} = router;
  const active = isUrlInChildren(item, pathname);

  function isUrlInChildren(parent: any, url: string) {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (
        parent.children[i].url === url ||
        url.includes(parent.children[i].url)
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    <ListItem
      onClick={() => router.push(item.url ? item.url : '/')}
      className={clsx('navItemSubmenu', classes.root, dense && 'dense', {
        active: pathname === item.url,
      })}>
      {item.icon && (
        <Box fontSize={{xs: 16, xl: 18}} mr={3} clone>
          <Icon style={{color: active ? 'white' : 'action'}}>{item.icon}</Icon>
        </Box>
      )}
      <ListItemText
        className='navLinkTextSubmenu'
        primary={<IntlMessages id={item.messageId} />}
      />
      {item.count && (
        <Box ml={4} clone>
          <Badge count={item.count} color={item.color} />
        </Box>
      )}
    </ListItem>
  );
};

export default React.memo(HorizontalItem);
