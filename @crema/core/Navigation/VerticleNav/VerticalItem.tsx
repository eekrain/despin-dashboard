import React, {useContext, useMemo} from 'react';
import {Icon, ListItem, ListItemText} from '@material-ui/core';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import {Badge} from '../../../index';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../utility/IntlMessages';
import useStyles from './VerticalItem.style';
import AppContext from '../../../utility/AppContext';
import {checkPermission} from '../../../utility/Utils';
import {useSelector} from 'react-redux';
import Link from 'next/link';
import {NavItemProps} from '../../../../modules/routesConfig';
import {AppState} from '../../../../redux/store';
import {AuthUser} from '../../../../types/models/AuthUser';


interface VerticalItemProps {
  item: NavItemProps;
  level: number
}


const VerticalItem: React.FC<VerticalItemProps> = ({item, level}) => {
  const {themeMode} = useContext(AppContext);
  const classes = useStyles({level, themeMode});
  const {user}: {user: AuthUser | null} = useSelector<AppState, AppState['auth']>(({auth}) => auth);
  const router = useRouter();
  const {pathname} = router;
  const hasPermission = useMemo(() => checkPermission(item.auth, user!.role), [
    item.auth,
    user!.role,
  ]);
  if (!hasPermission) {
    return null;
  }

  return (
    <Link href={item.url!} as={item.as}>
      <ListItem
        button
        className={clsx(classes.navItem, 'nav-item', {
          active: item.url === pathname,
        })}>
        {item.icon && (
          <Box component='span' mr={6}>
            <Icon
              className={clsx(classes.listIcon, 'nav-item-icon')}
              color='action'>
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          primary={<IntlMessages id={item.messageId}/>}
          classes={{primary: 'nav-item-text'}}
        />
        {item.count && (
          <Box mr={1} clone>
            <Badge count={item.count} color={item.color}/>
          </Box>
        )}
      </ListItem>
    </Link>
  );
};
export default React.memo(VerticalItem);
