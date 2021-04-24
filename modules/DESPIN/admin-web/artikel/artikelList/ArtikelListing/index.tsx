import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {IArtikelListParentState} from '..';
import userList from '../../../../../../@crema/services/db/userList';
import ArtikelService from '../../../../../../@crema/services/despin-api/artikel/artikel.service';
import {IArtikelListByCategory} from '../../../../../../pages/admin-web/artikel';
import DateTime from '../../../../../../shared/components/DateTime';
import {CremaTheme} from '../../../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  table: {
    minWidth: 650,
  },
  edit: {
    color: theme.palette.orange.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.orange.hover,
    },
  },
  show: {
    color: theme.palette.darkGreen.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.darkGreen.hover,
    },
  },
  lock: {
    color: theme.palette.darkBlue.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.darkBlue.hover,
    },
  },
  remove: {
    color: theme.palette.red.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.red.hover,
    },
  },
}));

interface IArtikelListingProps {
  listArtikel: IArtikelListByCategory[];
  parentState: IArtikelListParentState;
  refetchListArtikel: () => void;
}

const ArtikelListing = ({
  listArtikel,
  parentState,
  refetchListArtikel,
}: IArtikelListingProps) => {
  const classes = useStyles();

  return (
    <Box p={5}>
      <Box display='flex' flexDirection='row-reverse'>
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/admin-web/artikel/create/${parentState.expanded}/${parentState.selected}`}>
          <Button variant='contained' color='primary'>
            Buat Artikel
          </Button>
        </Link>
      </Box>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Judul</TableCell>
            <TableCell>Tgl Posting</TableCell>
            <TableCell align='center'>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listArtikel && (
            <ArtikelRows
              parentState={parentState}
              refetchListArtikel={refetchListArtikel}
              listArtikel={listArtikel}
            />
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

interface IArtikelRowsProps {
  listArtikel: IArtikelListByCategory[];
  parentState: IArtikelListParentState;
  refetchListArtikel: () => void;
}

enum ActionTypeEnum {
  ROUTE = 'ROUTE',
  TOGGLEABLE = 'TOGGLEABLE',
  FUNCTION = 'FUNCTION',
}

const ArtikelRows = ({
  listArtikel,
  parentState,
  refetchListArtikel,
}: IArtikelRowsProps) => {
  if (listArtikel.length < 1) {
    return (
      <TableRow key={nanoid()}>
        <TableCell colSpan={4} align='center'>
          Tidak ada artikel pada kategori ini.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {listArtikel.map((artikel, i) => (
        <TableRow key={nanoid()}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{artikel.title}</TableCell>
          <TableCell>
            <DateTime time={artikel.createdAt} />
          </TableCell>
          <TableCell>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={3}>
              <PostActions
                parentState={parentState}
                refetchListArtikel={refetchListArtikel}
                artikelId={artikel.ArtikelPublished.id}
                isEnabled={artikel.ArtikelPublished.is_enabled}
              />
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

interface IActionLink {
  id: string;
  title?: string;
  activeTitle?: string;
  disabledTitle?: string;
  className: string;
  icon?: string;
  type: ActionTypeEnum;
  activeIcon?: string;
  disabledIcon?: string;
  defaultValue?: boolean;
  function: any;
}

interface IPostActionsProps {
  artikelId: string;
  isEnabled: boolean;
  parentState: IArtikelListParentState;
  refetchListArtikel: () => void;
}
const PostActions = ({
  artikelId,
  isEnabled,
  parentState,
  refetchListArtikel,
}: IPostActionsProps) => {
  const classes = useStyles();
  const router = useRouter();

  const routeTo = (url: string) => {
    router.push(url);
  };

  const actionList: IActionLink[] = [
    {
      id: 'edit',
      title: 'Edit Post',
      className: classes.edit,
      icon: 'edit',
      type: ActionTypeEnum.ROUTE,
      function: () =>
        routeTo(
          `/admin-web/artikel/update/${parentState.expanded}/${parentState.selected}/${artikelId}`,
        ),
    },
    {
      id: 'show',
      title: 'Preview',
      className: classes.show,
      icon: 'visibility',
      type: ActionTypeEnum.ROUTE,
      function: () => routeTo('http://localhost:1000/'),
    },
    {
      id: 'toggleLock',
      activeTitle: 'Post terkunci',
      disabledTitle: 'Post dapat dilihat publik.',
      className: classes.lock,
      type: ActionTypeEnum.TOGGLEABLE,
      activeIcon: 'lock',
      disabledIcon: 'lock_open',
      defaultValue: false,
      function: () => {
        return true;
      },
    },
    {
      id: 'delete',
      title: 'Hapus Post',
      className: classes.remove,
      icon: 'delete',
      type: ActionTypeEnum.FUNCTION,
      function: async () => {
        await ArtikelService.deleteArtikel(artikelId);
        console.log('refetch list artikel running');
        await refetchListArtikel();
      },
    },
  ];
  return (
    <>
      {actionList.map((action) => (
        <React.Fragment key={`rand-${nanoid()}`}>
          <ActionButton action={action} isEnabled={isEnabled} />
        </React.Fragment>
      ))}
    </>
  );
};

interface IActionButtonProps {
  action: IActionLink;
  isEnabled: boolean;
}

const ActionButton = ({action, isEnabled}: IActionButtonProps) => {
  const [toggle, setToggle] = useState(!isEnabled || false);
  if (action.type === ActionTypeEnum.TOGGLEABLE) {
    return (
      <Grid item key={`rand-${nanoid()}`}>
        <Tooltip title={toggle ? action!.activeTitle! : action!.disabledTitle!}>
          <IconButton
            aria-label={action.title}
            className={action.className}
            onClick={() => {
              if (action.function()) setToggle(!toggle);
            }}>
            <Icon>{toggle ? action.activeIcon : action.disabledIcon}</Icon>
          </IconButton>
        </Tooltip>
      </Grid>
    );
  }

  return (
    <Grid item key={`rand-${nanoid()}`}>
      <Tooltip title={action!.title!}>
        <IconButton
          aria-label={action.title}
          className={action.className}
          onClick={() => action.function()}>
          <Icon>{action.icon}</Icon>
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default ArtikelListing;
