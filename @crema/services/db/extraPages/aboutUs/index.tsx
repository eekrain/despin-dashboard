import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SearchIcon from '@material-ui/icons/Search';
import IntlMessages from '../../../../utility/IntlMessages';
import {blue, red, teal} from '@material-ui/core/colors';

export interface TeamData {
  id: number;
  name: string;
  position: string;
  image: string;
}

export interface AboutUsData {
  alias: string;
  title: any;
  avatarColor: any;
  icon: any;
  content: any;
}

export const aboutUsData: AboutUsData[] = [
  {
    alias: 'branding',
    title: <IntlMessages id='extra.branding' />,
    avatarColor: teal[600],
    icon: <EditIcon />,
    content: <IntlMessages id='extra.brandingContent' />,
  },
  {
    alias: 'photography',
    title: <IntlMessages id='extra.photography' />,
    avatarColor: red[500],
    icon: <PhotoCameraIcon />,
    content: <IntlMessages id='extra.brandingContent' />,
  },
  {
    alias: 'seo',
    title: <IntlMessages id='extra.seo' />,
    avatarColor: blue[500],
    icon: <SearchIcon />,
    content: <IntlMessages id='extra.brandingContent' />,
  },
];

export const teamData: TeamData[] = [
  {
    id: 444,
    name: 'Asantha Powel',
    position: 'CEO',
    image: '${process.env.NEXT_PUBLIC_BASE_PATH}/images/teamImages/User1.png',
  },
  {
    id: 111,
    name: 'Johna Taylor',
    position: 'CTO',
    image: '${process.env.NEXT_PUBLIC_BASE_PATH}/images/teamImages/User4.png',
  },
  {
    id: 222,
    name: 'Nick Campbell',
    position: 'General Manager',
    image: '${process.env.NEXT_PUBLIC_BASE_PATH}/images/teamImages/User3.png',
  },
  {
    id: 333,
    name: 'Johna Taylor',
    position: 'CFO',
    image: '${process.env.NEXT_PUBLIC_BASE_PATH}/images/teamImages/User5.png',
  },
  {
    id: 555,
    name: 'Ricardo Johnson',
    position: 'Director',
    image: '${process.env.NEXT_PUBLIC_BASE_PATH}/images/teamImages/User2.png',
  },
  {
    id: 666,
    name: 'Johnson Lopez',
    position: 'Technical Advisor',
    image: '${process.env.NEXT_PUBLIC_BASE_PATH}/images/teamImages/User6.png',
  },
];
