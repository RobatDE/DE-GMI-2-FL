import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import { mdiInformation } from '@mdi/js';
import BaseIcon from '../components/BaseIcon';
import { getPageTitle } from '../config';
import Link from 'next/link';

const Dashboard = () => {
  const [users, setUsers] = React.useState('Loading...');
  const [assets, setAssets] = React.useState('Loading...');
  const [categories, setCategories] = React.useState('Loading...');
  const [channels, setChannels] = React.useState('Loading...');
  const [companies, setCompanies] = React.useState('Loading...');
  const [programs, setPrograms] = React.useState('Loading...');
  const [campaigns, setCampaigns] = React.useState('Loading...');
  const [projects, setProjects] = React.useState('Loading...');
  const [events, setEvents] = React.useState('Loading...');
  const [tasks, setTasks] = React.useState('Loading...');
  const [teams, setTeams] = React.useState('Loading...');
  const [markets, setMarkets] = React.useState('Loading...');
  const [opportunities, setOpportunities] = React.useState('Loading...');
  const [organizations, setOrganizations] = React.useState('Loading...');
  const [prompts, setPrompts] = React.useState('Loading...');
  const [team_members, setTeam_members] = React.useState('Loading...');
  const [promptresponses, setPromptresponses] = React.useState('Loading...');

  async function loadData() {
    const fns = [
      setUsers,
      setAssets,
      setCategories,
      setChannels,
      setCompanies,
      setPrograms,
      setCampaigns,
      setProjects,
      setEvents,
      setTasks,
      setTeams,
      setMarkets,
      setOpportunities,
      setOrganizations,
      setPrompts,
      setTeam_members,
      setPromptresponses,
    ];

    const responseUsers = await axios.get(`/users/count`);
    const responseAssets = await axios.get(`/assets/count`);
    const responseCategories = await axios.get(`/categories/count`);
    const responseChannels = await axios.get(`/channels/count`);
    const responseCompanies = await axios.get(`/companies/count`);
    const responsePrograms = await axios.get(`/programs/count`);
    const responseCampaigns = await axios.get(`/campaigns/count`);
    const responseProjects = await axios.get(`/projects/count`);
    const responseEvents = await axios.get(`/events/count`);
    const responseTasks = await axios.get(`/tasks/count`);
    const responseTeams = await axios.get(`/teams/count`);
    const responseMarkets = await axios.get(`/markets/count`);
    const responseOpportunities = await axios.get(`/opportunities/count`);
    const responseOrganizations = await axios.get(`/organizations/count`);
    const responsePrompts = await axios.get(`/prompts/count`);
    const responseTeam_members = await axios.get(`/team_members/count`);
    const responsePromptresponses = await axios.get(`/promptresponses/count`);
    Promise.all([
      responseUsers,
      responseAssets,
      responseCategories,
      responseChannels,
      responseCompanies,
      responsePrograms,
      responseCampaigns,
      responseProjects,
      responseEvents,
      responseTasks,
      responseTeams,
      responseMarkets,
      responseOpportunities,
      responseOrganizations,
      responsePrompts,
      responseTeam_members,
      responsePromptresponses,
    ])
      .then((res) => res.map((el) => el.data))
      .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  React.useEffect(() => {
    loadData().then();
  }, []);
  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Overview'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>
          <Link href={'/users/users-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Users
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {users}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/assets/assets-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Assets
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {assets}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/categories/categories-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Categories
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {categories}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/channels/channels-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Channels
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {channels}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/companies/companies-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Companies
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {companies}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/programs/programs-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Programs
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {programs}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/campaigns/campaigns-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Campaigns
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {campaigns}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/projects/projects-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Projects
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {projects}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/events/events-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Events
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {events}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/tasks/tasks-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Tasks
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {tasks}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/teams/teams-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Teams
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {teams}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/markets/markets-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Markets
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {markets}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/opportunities/opportunities-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Opportunities
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {opportunities}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/organizations/organizations-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Organizations
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {organizations}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/prompts/prompts-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Prompts
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {prompts}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/team_members/team_members-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Team_members
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {team_members}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/promptresponses/promptresponses-list'} className='mr-3'>
            <div className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400 p-6'>
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                    Promptresponses
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {promptresponses}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className='text-blue-500'
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
