import React, {useContext, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Importer, ImporterField} from 'react-csv-importer';
import {CremaTheme} from '../../../../../types/AppContextPropsType';
import {makeStyles} from '@material-ui/core';
import 'react-csv-importer/dist/index.css';
import {IImportOptions} from '..';
import {nanoid} from 'nanoid';
import {saveAs} from 'file-saver';
import PengaturanDatabaseService from '../../../../../@crema/services/despin-api/pengaturan/database/pengaturan-database.service';
import PengaturanDatabaseContext from '../../contexts/pengaturan-database.context';

const useStyles = makeStyles((theme: CremaTheme) => ({
  tabPanelRoot: {
    width: '100%',
    height: '100vh',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();
  const {children, value, index, ...other} = props;

  return (
    <div
      className={classes.tabPanelRoot}
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface ITabPanelImportDatabase {
  activeTab: number;
  index: number;
  importOption: IImportOptions;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
const TabPanelImportDatabase = ({
  activeTab,
  index,
  importOption,
}: ITabPanelImportDatabase) => {
  const context = useContext(PengaturanDatabaseContext);
  const setTes = context.setTes!;
  const tes = context.tes!;
  return (
    <TabPanel value={activeTab} index={index}>
      <Box mb={4}>
        <h5>
          <span style={{color: 'red'}}>*</span>Hanya menerima file dengan
          ekstensi .csv, apabila file yg ingin di import masih dalam bentuk
          excel / .xlsx, maka save as atau export menjadi .csv
        </h5>
      </Box>
      <Box width='100%' height='100vh'>
        <Importer
          chunkSize={10000} // optional, internal parsing chunk size in bytes
          assumeNoHeaders={true} // optional, keeps "data has headers" checkbox off by default
          restartable={true} // optional, lets user choose to upload another file when import is complete
          onStart={({file, fields}) => {
            console.log(
              '🚀 ~ file: TabPanelImportDatabase.tsx ~ line 89 ~ fields',
              fields,
            );
          }}
          processChunk={async (rows) => {
            // required, receives a list of parsed objects based on defined fields and user column mapping;
            // may be called several times if file is large
            // (if this callback returns a promise, the widget will wait for it before parsing more data)
            return new Promise(async (resolve) => {
              await PengaturanDatabaseService.importPenduduk(rows);
              resolve();
            });
          }}
          onComplete={async () => {
            console.log(
              '🚀 ~ file: TabPanelImportDatabase.tsx ~ line 118 ~ onComplete ~ tes',
              tes,
            );

            // // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
            // showMyAppToastNotification();
          }}
          skipEmptyLines={true}
          // CSV options passed directly to PapaParse if specified:
          // delimiter={...}
          // newline={...}
          // quoteChar={...}
          // escapeChar={...}
          // comments={...}
          // skipEmptyLines={...}
          // delimitersToGuess={...}
          // NIK,NO_KK,NAMA_LGKP,JENIS_KLMIN,TEMPAT_LAHIR,TANGGAL_LAHIR,NO_KECAMATAN,NO_KELURAHAN,ALAMAT,NO_RT,NO_RW
        >
          {importOption.importerFields.map((field) => (
            <ImporterField
              name={field.name}
              label={field.label}
              key={`rand-${nanoid}`}
            />
          ))}
        </Importer>
      </Box>
    </TabPanel>
  );
};

export default TabPanelImportDatabase;
