import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {CremaTheme} from '../../../../../types/AppContextPropsType';
import TabPanelImportDatabase from './TabPanelImportDatabase';
import {nanoid} from 'nanoid';

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export interface IImportOptions {
  name: string;
  importerFields: {
    name: string;
    label: string;
  }[];
}
const importOptions: IImportOptions[] = [
  {
    name: 'kependudukan',
    importerFields: [
      {
        name: 'NIK',
        label: 'NIK',
      },
      {
        name: 'NO_KK',
        label: 'NOMOR KK',
      },
      {
        name: 'NAMA_LGKP',
        label: 'NAMA LENGKAP',
      },
      {
        name: 'JENIS_KLMIN',
        label: 'JENIS KELAMIN',
      },
      {
        name: 'TMPT_LHR',
        label: 'TEMPAT LAHIR',
      },
      {
        name: 'TGL_LHR',
        label: 'TANGGAL LAHIR',
      },
      {
        name: 'NO_KEC',
        label: 'NOMOR KECAMATAN',
      },
      {
        name: 'NO_KEL',
        label: 'NO KELURAHAN',
      },
      {
        name: 'ALAMAT',
        label: 'ALAMAT',
      },
      {
        name: 'NO_RT',
        label: 'NO RT',
      },
      {
        name: 'NO_RW',
        label: 'NO RW',
      },
    ],
  },
];

const ImportTabs = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<Record<string, never>>,
    newValue: number,
  ) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={activeTab}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}>
        {importOptions.map((option, index) => (
          <Tab
            key={`rand-${nanoid()}`}
            label={option.name}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {importOptions.map((option, index) => (
        <TabPanelImportDatabase
          key={`rand-${nanoid()}`}
          activeTab={activeTab}
          index={index}
          importOption={option}
        />
      ))}
    </div>
  );
};
export default ImportTabs;
