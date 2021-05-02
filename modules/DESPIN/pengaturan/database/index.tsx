import {Box} from '@material-ui/core';
import React, {useState} from 'react';
import AppAnimate from '../../../../@crema/core/AppAnimate';
import {
  IPengaturanDatabaseContext,
  PengaturanDatabaseContextProvider,
} from '../contexts/pengaturan-database.context';
import ImportTabs from './ImportTabs';
import * as yup from 'yup';

export interface IImportOptions {
  name: string;
  importerFields: {
    name: string;
    label: string;
  }[];
}
export enum IImportPendudukFieldsEnum {
  NIK = 'NIK',
  NO_KK = 'NO_KK',
  NAMA_LGKP = 'NAMA_LGKP',
  ALAMAT = 'ALAMAT',
  NO_RT = 'NO_RT',
  NO_RW = 'NO_RW',
  TMPT_LHR = 'TMPT_LHR',
  TGL_LHR = 'TGL_LHR',
  JENIS_KLMIN = 'JENIS_KLMIN',
  STATUS_KAWIN = 'STATUS_KAWIN',
  PENDIDIKAN = 'PENDIDIKAN',
  AGAMA = 'AGAMA',
  NO_AKTA = 'NO_AKTA',
}
export const importOptions: IImportOptions[] = [
  {
    name: 'kependudukan',
    importerFields: [
      {
        name: IImportPendudukFieldsEnum.NIK,
        label: 'NIK',
      },
      {
        name: IImportPendudukFieldsEnum.NO_KK,
        label: 'NOMOR KK',
      },
      {
        name: IImportPendudukFieldsEnum.NAMA_LGKP,
        label: 'NAMA LENGKAP',
      },
      {
        name: IImportPendudukFieldsEnum.ALAMAT,
        label: 'ALAMAT',
      },
      {
        name: IImportPendudukFieldsEnum.NO_RT,
        label: 'NO RT',
      },
      {
        name: IImportPendudukFieldsEnum.NO_RW,
        label: 'NO RW',
      },
      {
        name: IImportPendudukFieldsEnum.TMPT_LHR,
        label: 'TEMPAT LAHIR',
      },
      {
        name: IImportPendudukFieldsEnum.TGL_LHR,
        label: 'TANGGAL LAHIR',
      },
      {
        name: IImportPendudukFieldsEnum.JENIS_KLMIN,
        label: 'JENIS KELAMIN',
      },
      {
        name: IImportPendudukFieldsEnum.STATUS_KAWIN,
        label: 'STATUS KAWIN',
      },
      {
        name: IImportPendudukFieldsEnum.PENDIDIKAN,
        label: 'PENDIDIKAN',
      },
      {
        name: IImportPendudukFieldsEnum.AGAMA,
        label: 'AGAMA',
      },
      {
        name: IImportPendudukFieldsEnum.NO_AKTA,
        label: 'NOMOR_AKTA_LAHIR',
      },
    ],
  },
];
function Database() {
  const [dataPenduduk, setDataPenduduk] = useState<any[]>([]);
  const [tes, setTes] = useState<any[]>([]);
  const updateDataPenduduk = (rows: any[]) => {
    return new Promise((res, rej) => {
      const parsedPenduduk: {
        [key in IImportPendudukFieldsEnum]: string;
      }[] = [];
      rows.forEach((row) => {
        const testRow = `${row.NIK} ${row.NO_KK} ${row.NAMA_LGKP} ${row.ALAMAT} ${row.NO_RT} ${row.NO_RW} ${row.TMPT_LHR} ${row.TGL_LHR} ${row.JENIS_KLMIN} ${row.STATUS_KAWIN} ${row.PENDIDIKAN} ${row.AGAMA} ${row.NO_AKTA}`;
        const isHeader = new RegExp(
          `NIK|NO KK|NAMA LENGKAP|ALAMAT|RT|RW|TEMPAT LAHIR|TGL. LAHIR|LK/PR|STATUS KAWIN|PENDIDIKAN|AGAMA|NO AKTA LAHIR|SMARD|Tgl. Cetak`,
        ).test(testRow);
        const isEmpty =
          row.NIK === '' ||
          row.NO_KK === '' ||
          row.NAMA_LGKP === '' ||
          row.ALAMAT === '' ||
          row.NO_RT === '' ||
          row.NO_RW === '' ||
          row.TMPT_LHR === '' ||
          row.TGL_LHR === '' ||
          row.JENIS_KLMIN === '' ||
          row.STATUS_KAWIN === '' ||
          row.PENDIDIKAN === '' ||
          row.AGAMA === '';
        if (!isHeader && !isEmpty) {
          const obj = {
            [IImportPendudukFieldsEnum.NIK]: row.NIK,
            [IImportPendudukFieldsEnum.NO_KK]: row.NO_KK,
            [IImportPendudukFieldsEnum.NAMA_LGKP]: row.NAMA_LGKP,
            [IImportPendudukFieldsEnum.ALAMAT]: row.ALAMAT,
            [IImportPendudukFieldsEnum.NO_RT]: row.NO_RT,
            [IImportPendudukFieldsEnum.NO_RW]: row.NO_RW,
            [IImportPendudukFieldsEnum.TMPT_LHR]: row.TMPT_LHR,
            [IImportPendudukFieldsEnum.TGL_LHR]: row.TGL_LHR,
            [IImportPendudukFieldsEnum.JENIS_KLMIN]: row.JENIS_KLMIN,
            [IImportPendudukFieldsEnum.STATUS_KAWIN]: row.STATUS_KAWIN,
            [IImportPendudukFieldsEnum.PENDIDIKAN]: row.PENDIDIKAN,
            [IImportPendudukFieldsEnum.AGAMA]: row.AGAMA,
            [IImportPendudukFieldsEnum.NO_AKTA]: row.NO_AKTA,
          };
          parsedPenduduk.push(obj);
        }
      });
      setDataPenduduk([...dataPenduduk, parsedPenduduk]);
      res(null);
    });
  };
  return (
    <PengaturanDatabaseContextProvider
      value={{dataPenduduk, updateDataPenduduk, tes, setTes}}>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <ImportTabs />
      </AppAnimate>
    </PengaturanDatabaseContextProvider>
  );
}

export default Database;
