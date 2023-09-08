import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/teams/teamsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const TeamsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector((state) => state.teams);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View teams')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View teams'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Project</p>

            <p>{teams?.project?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            {teams.name ? (
              <p dangerouslySetInnerHTML={{ __html: teams.name }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Organization</p>

            <p>{teams?.organization?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Projects Team</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Date Added</th>

                      <th>Date Modified</th>

                      <th>Modified By</th>

                      <th>Public On</th>

                      <th>Start On</th>

                      <th>End On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.projects_team &&
                      Array.isArray(teams.projects_team) &&
                      teams.projects_team.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/projects/projects-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='date_added'>
                            {dataFormatter.dateTimeFormatter(item.date_added)}
                          </td>

                          <td data-label='date_modified'>
                            {dataFormatter.dateTimeFormatter(
                              item.date_modified,
                            )}
                          </td>

                          <td data-label='modified_by'>{item.modified_by}</td>

                          <td data-label='public_on'>
                            {dataFormatter.dateTimeFormatter(item.public_on)}
                          </td>

                          <td data-label='start_on'>
                            {dataFormatter.dateTimeFormatter(item.start_on)}
                          </td>

                          <td data-label='end_on'>
                            {dataFormatter.dateTimeFormatter(item.end_on)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!teams?.projects_team?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Team_members Team</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {teams.team_members_team &&
                      Array.isArray(teams.team_members_team) &&
                      teams.team_members_team.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/team_members/team_members-view/?id=${item.id}`,
                            )
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!teams?.team_members_team?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/teams/teams-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TeamsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TeamsView;
