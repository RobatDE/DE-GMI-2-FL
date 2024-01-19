import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/personasdashboard',
    icon: mdiMonitor,
    label: 'PersonasDashboard',
  },
  {
    href: '/personas/personas-list',
    label: 'Personas',
    icon: mdiTable,
  },
  {
    href: '/users/users-list',
    label: 'Users',
    icon: mdiTable,
  },
  {
    href: '/prompts/prompts-list',
    label: 'Prompts',
    icon: mdiTable,
  },
  {
    href: '/promptresponses/promptresponses-list',
    label: 'Promptresponses',
    icon: mdiTable,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: 'http://localhost:8080/api-docs',
    label: 'Swagger API',
    icon: mdiAccountCircle,
  },
];

export default menuAside;
