import {LayoutType, NavStyle} from '../../../shared/constants/AppEnums';

export const navStyles = [
  {
    id: 1,
    alias: NavStyle.STANDARD,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav4.png`,
  },
  {
    id: 2,
    alias: NavStyle.DEFAULT,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav2.png`,
  },
  {
    id: 3,
    alias: NavStyle.MINI_SIDEBAR_TOGGLE,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav3.png`,
  },
  {
    id: 4,
    alias: NavStyle.HEADER_USER,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav9.png`,
  },
  {
    id: 5,
    alias: NavStyle.HEADER_USER_MINI,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav10.png`,
  },
  {
    id: 6,
    alias: NavStyle.MINI,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav3.png`,
  },
  {
    id: 7,
    alias: NavStyle.DRAWER,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav5.png`,
  },
  {
    id: 8,
    alias: NavStyle.BIT_BUCKET,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav1.png`,
  },
  {
    id: 9,
    alias: NavStyle.H_DEFAULT,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav8.png`,
  },
  {
    id: 10,
    alias: NavStyle.HOR_LIGHT_NAV,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav6.png`,
  },
  {
    id: 11,
    alias: NavStyle.HOR_DARK_LAYOUT,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/navigationStyle/nav7.png`,
  },
];

export const layoutTypes = [
  {
    id: 1,
    alias: LayoutType.FULL_WIDTH,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/layouts/full width.png`,
  },
  {
    id: 2,
    alias: LayoutType.BOXED,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/layouts/boxed.png`,
  },
];
