import { NbMenuItem } from '@nebular/theme';

export const DOCS_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'DOCS',
    group: true,
  },
  {
    title: 'Getting Started',
    icon: 'ion-flag',
    link: 'start',
  },
  {
    title: 'ACL Rule',
    icon: 'ion-locked',
    link: 'acl',
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
