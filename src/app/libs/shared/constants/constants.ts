import { Exam } from '../models/exams.model';

export const APP_NAME = 'Acadexa';
export const APP_THEME = [
  {
    icon: 'dark_mode',
  },
  {
    icon: 'light_mode',
  },
];

export type HEADER_OPTION = {
  icon: string;
  title: string;
  route: string;
};

export type HEADER_SETTINGS_OPTION = {
  icon: string;
  title: string;
  route: string;
};
export const HEADER_SETTINGS_OPTIONS: HEADER_SETTINGS_OPTION[] = [
  {
    icon: 'settings',
    title: 'Settings',
    route: '/settings',
  },
  {
    icon: 'account_circle',
    title: 'Profile',
    route: '/profile',
  },
];

export const HEADER_OPTIONS: HEADER_OPTION[] = [
  {
    icon: 'home',
    title: 'Home',
    route: '/home',
  },
  {
    icon: 'assignment',
    title: 'Assignments',
    route: '/assignments',
  },
  {
    icon: 'smart_toy',
    title: 'Ask AI',
    route: '/ask-ai',
  },
];

export const EXAMS: Exam[] = [
  {
    id: 1,
    name: 'JEE',
  },
  {
    id: 2,
    name: 'NEET',
  },
];
