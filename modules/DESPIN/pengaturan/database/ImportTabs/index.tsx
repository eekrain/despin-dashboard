import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {CremaTheme} from '../../../../../types/AppContextPropsType';
import TabPanelImportDatabase from './TabPanelImportDatabase';
import {nanoid} from 'nanoid';
import {importOptions} from '..';

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
