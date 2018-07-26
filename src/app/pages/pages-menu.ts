import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'ion-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'DEVELOPMENT',
    group: true,
  },
  {
    title: 'Beakers',
    icon: 'ion-beaker',
    link: '/pages/beakers',
    children: [
      {
        title: 'beaker1',
        children: [
          {
            title: 'Data',
            link: '/pages/beakers/beaker1',
          },
          {
            title: 'ACL Rule & Index',
            link: '/pages/beakers/beaker1/config',
          },
        ],
      },
      {
        title: 'Create Beaker',
        link: '/pages/createbeaker',
      },
    ],
  },
  {
    title: 'Authentication',
    icon: 'ion-person-stalker',
    link: '/pages/auth',
  },
  {
    title: 'Shell',
    icon: 'ion-ios-monitor',
    link: '/pages/shell',
  },
  {
    title: 'DOCS',
    group: true,
  },
  {
    title: 'Getting Started',
    icon: 'ion-flag',
    link: '/pages/start',
  },
  {
    title: 'ACL Rule',
    icon: 'ion-locked',
    link: '/pages/acl',
  },
  {
    title: 'API docs',
    icon: 'ion-document-text',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
