import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/projects/projectsSlice';
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

const ProjectsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View projects')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View projects'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Campaing</p>

            <p>{projects?.campaing?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Team</p>

            <p>{projects?.team?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            {projects.name ? (
              <p dangerouslySetInnerHTML={{ __html: projects.name }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {projects.description ? (
              <p dangerouslySetInnerHTML={{ __html: projects.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <FormField label='Date Added'>
            {projects.date_added ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  projects.date_added
                    ? new Date(
                        dayjs(projects.date_added).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Date Added</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Created By User</p>

            <p>{projects?.created_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Date Modified'>
            {projects.date_modified ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  projects.date_modified
                    ? new Date(
                        dayjs(projects.date_modified).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Date Modified</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Modified By</p>
            <p>{projects?.modified_by || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Modified By User</p>

            <p>{projects?.modified_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Public On'>
            {projects.public_on ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  projects.public_on
                    ? new Date(
                        dayjs(projects.public_on).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Public On</p>
            )}
          </FormField>

          <FormField label='Start On'>
            {projects.start_on ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  projects.start_on
                    ? new Date(
                        dayjs(projects.start_on).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Start On</p>
            )}
          </FormField>

          <FormField label='End On'>
            {projects.end_on ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  projects.end_on
                    ? new Date(
                        dayjs(projects.end_on).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No End On</p>
            )}
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Assets Project</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Is Published</th>

                      <th>Date Added</th>

                      <th>Date Modified</th>

                      <th>Checked Out</th>

                      <th>Title</th>

                      <th>Alias</th>

                      <th>Storage Location</th>

                      <th>Path</th>

                      <th>Url</th>

                      <th>Lang</th>

                      <th>Publish Up</th>

                      <th>Publish Down</th>

                      <th>Download Count</th>

                      <th>Unique Download Count</th>

                      <th>Revision</th>

                      <th>Extension</th>

                      <th>Mime</th>

                      <th>Size</th>

                      <th>Disallow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.assets_project &&
                      Array.isArray(projects.assets_project) &&
                      projects.assets_project.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/assets/assets-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='is_published'>
                            {dataFormatter.booleanFormatter(item.is_published)}
                          </td>

                          <td data-label='date_added'>
                            {dataFormatter.dateTimeFormatter(item.date_added)}
                          </td>

                          <td data-label='date_modified'>
                            {dataFormatter.dateTimeFormatter(
                              item.date_modified,
                            )}
                          </td>

                          <td data-label='checked_out'>
                            {dataFormatter.dateTimeFormatter(item.checked_out)}
                          </td>

                          <td data-label='title'>{item.title}</td>

                          <td data-label='alias'>{item.alias}</td>

                          <td data-label='storage_location'>
                            {item.storage_location}
                          </td>

                          <td data-label='path'>{item.path}</td>

                          <td data-label='url'>{item.url}</td>

                          <td data-label='lang'>{item.lang}</td>

                          <td data-label='publish_up'>
                            {dataFormatter.dateTimeFormatter(item.publish_up)}
                          </td>

                          <td data-label='publish_down'>
                            {dataFormatter.dateTimeFormatter(item.publish_down)}
                          </td>

                          <td data-label='download_count'>
                            {item.download_count}
                          </td>

                          <td data-label='unique_download_count'>
                            {item.unique_download_count}
                          </td>

                          <td data-label='revision'>{item.revision}</td>

                          <td data-label='extension'>{item.extension}</td>

                          <td data-label='mime'>{item.mime}</td>

                          <td data-label='size'>{item.size}</td>

                          <td data-label='disallow'>
                            {dataFormatter.booleanFormatter(item.disallow)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects?.assets_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Categories Project</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Is Published</th>

                      <th>Date Added</th>

                      <th>Date Modified</th>

                      <th>Checked Out</th>

                      <th>Title</th>

                      <th>Alias</th>

                      <th>Color</th>

                      <th>Bundle</th>

                      <th>Checked Out By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.categories_project &&
                      Array.isArray(projects.categories_project) &&
                      projects.categories_project.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/categories/categories-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='is_published'>
                            {dataFormatter.booleanFormatter(item.is_published)}
                          </td>

                          <td data-label='date_added'>
                            {dataFormatter.dateTimeFormatter(item.date_added)}
                          </td>

                          <td data-label='date_modified'>
                            {dataFormatter.dateTimeFormatter(
                              item.date_modified,
                            )}
                          </td>

                          <td data-label='checked_out'>
                            {dataFormatter.dateTimeFormatter(item.checked_out)}
                          </td>

                          <td data-label='title'>{item.title}</td>

                          <td data-label='alias'>{item.alias}</td>

                          <td data-label='color'>{item.color}</td>

                          <td data-label='bundle'>{item.bundle}</td>

                          <td data-label='checked_out_by'>
                            {item.checked_out_by}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects?.categories_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Channels Project</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Redirect Id</th>

                      <th>Channel</th>

                      <th>Content</th>

                      <th>Hits</th>

                      <th>Unique Hits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.channels_project &&
                      Array.isArray(projects.channels_project) &&
                      projects.channels_project.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/channels/channels-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='redirect_id'>{item.redirect_id}</td>

                          <td data-label='channel'>{item.channel}</td>

                          <td data-label='content'>{item.content}</td>

                          <td data-label='hits'>{item.hits}</td>

                          <td data-label='unique_hits'>{item.unique_hits}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects?.channels_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Events Project</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Event Type</th>

                      <th>Event Order</th>

                      <th>Trigger Date</th>

                      <th>Trigger Interval</th>

                      <th>Trigger Interval Unit</th>

                      <th>Trigger Hour</th>

                      <th>Trigger Restricted Start Hour</th>

                      <th>Trigger Restricted Stop Hour</th>

                      <th>Trigger Mode</th>

                      <th>Decision Path</th>

                      <th>Temp Id</th>

                      <th>Channel</th>

                      <th>Channel Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.events_project &&
                      Array.isArray(projects.events_project) &&
                      projects.events_project.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/events/events-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='event_type'>{item.event_type}</td>

                          <td data-label='event_order'>{item.event_order}</td>

                          <td data-label='trigger_date'>
                            {dataFormatter.dateTimeFormatter(item.trigger_date)}
                          </td>

                          <td data-label='trigger_interval'>
                            {item.trigger_interval}
                          </td>

                          <td data-label='trigger_interval_unit'>
                            {item.trigger_interval_unit}
                          </td>

                          <td data-label='trigger_hour'>
                            {dataFormatter.dateTimeFormatter(item.trigger_hour)}
                          </td>

                          <td data-label='trigger_restricted_start_hour'>
                            {dataFormatter.dateTimeFormatter(
                              item.trigger_restricted_start_hour,
                            )}
                          </td>

                          <td data-label='trigger_restricted_stop_hour'>
                            {dataFormatter.dateTimeFormatter(
                              item.trigger_restricted_stop_hour,
                            )}
                          </td>

                          <td data-label='trigger_mode'>{item.trigger_mode}</td>

                          <td data-label='decision_path'>
                            {item.decision_path}
                          </td>

                          <td data-label='temp_id'>{item.temp_id}</td>

                          <td data-label='channel'>{item.channel}</td>

                          <td data-label='channel_id'>{item.channel_id}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects?.events_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Tasks Project</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Content</th>

                      <th>Starttime</th>

                      <th>Priority</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.tasks_project &&
                      Array.isArray(projects.tasks_project) &&
                      projects.tasks_project.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/tasks/tasks-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='content'>{item.content}</td>

                          <td data-label='starttime'>
                            {dataFormatter.dateTimeFormatter(item.starttime)}
                          </td>

                          <td data-label='priority'>{item.priority}</td>

                          <td data-label='status'>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects?.tasks_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Teams Project</p>
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
                    {projects.teams_project &&
                      Array.isArray(projects.teams_project) &&
                      projects.teams_project.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/teams/teams-view/?id=${item.id}`)
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects?.teams_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/projects/projects-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ProjectsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ProjectsView;
