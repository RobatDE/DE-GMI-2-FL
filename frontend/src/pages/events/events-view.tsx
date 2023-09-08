import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/events/eventsSlice';
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

const EventsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View events')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View events'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Project</p>

            <p>{events?.project?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{events?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {events.description ? (
              <p dangerouslySetInnerHTML={{ __html: events.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Event Type</p>
            <p>{events?.event_type}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Event Order</p>
            <p>{events?.event_order || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Properties</p>
            {events.properties ? (
              <p dangerouslySetInnerHTML={{ __html: events.properties }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <FormField label='Trigger Date'>
            {events.trigger_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  events.trigger_date
                    ? new Date(
                        dayjs(events.trigger_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Trigger Date</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Trigger Interval</p>
            <p>{events?.trigger_interval || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Trigger Interval Unit</p>
            <p>{events?.trigger_interval_unit}</p>
          </div>

          <FormField label='Trigger Hour'>
            {events.trigger_hour ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  events.trigger_hour
                    ? new Date(
                        dayjs(events.trigger_hour).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Trigger Hour</p>
            )}
          </FormField>

          <FormField label='Trigger Restricted Start Hour'>
            {events.trigger_restricted_start_hour ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  events.trigger_restricted_start_hour
                    ? new Date(
                        dayjs(events.trigger_restricted_start_hour).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Trigger Restricted Start Hour</p>
            )}
          </FormField>

          <FormField label='Trigger Restricted Stop Hour'>
            {events.trigger_restricted_stop_hour ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  events.trigger_restricted_stop_hour
                    ? new Date(
                        dayjs(events.trigger_restricted_stop_hour).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Trigger Restricted Stop Hour</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Trigger Restricted Dow</p>
            {events.trigger_restricted_dow ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: events.trigger_restricted_dow,
                }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Trigger Mode</p>
            <p>{events?.trigger_mode}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Decision Path</p>
            <p>{events?.decision_path}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Temp Id</p>
            <p>{events?.temp_id}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Channel</p>
            <p>{events?.channel}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Channel Id</p>
            <p>{events?.channel_id || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Event</p>

            <p>{events?.event?.id ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Channels Event</p>
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
                    {events.channels_event &&
                      Array.isArray(events.channels_event) &&
                      events.channels_event.map((item: any) => (
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
              {!events?.channels_event?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/events/events-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

EventsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EventsView;
