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
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    icon: mdiTable,
  },
  {
    href: '/assets/assets-list',
    label: 'Assets',
    icon: mdiTable,
  },
  {
    href: '/categories/categories-list',
    label: 'Categories',
    icon: mdiTable,
  },
  {
    href: '/channels/channels-list',
    label: 'Channels',
    icon: mdiTable,
  },
  {
    href: '/companies/companies-list',
    label: 'Companies',
    icon: mdiTable,
  },
  {
    href: '/programs/programs-list',
    label: 'Programs',
    icon: mdiTable,
  },
  {
    href: '/campaigns/campaigns-list',
    label: 'Campaigns',
    icon: mdiTable,
  },
  {
    href: '/projects/projects-list',
    label: 'Projects',
    icon: mdiTable,
  },
  {
    href: '/events/events-list',
    label: 'Events',
    icon: mdiTable,
  },
  {
    href: '/tasks/tasks-list',
    label: 'Tasks',
    icon: mdiTable,
  },
  {
    href: '/teams/teams-list',
    label: 'Teams',
    icon: mdiTable,
  },
  {
    href: '/markets/markets-list',
    label: 'Markets',
    icon: mdiTable,
  },
  {
    href: '/opportunities/opportunities-list',
    label: 'Opportunities',
    icon: mdiTable,
  },
  {
    href: '/organizations/organizations-list',
    label: 'Organizations',
    icon: mdiTable,
  },
  {
    href: '/prompts/prompts-list',
    label: 'Prompts',
    icon: mdiTable,
  },
  {
    href: '/team_members/team_members-list',
    label: 'Team members',
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
