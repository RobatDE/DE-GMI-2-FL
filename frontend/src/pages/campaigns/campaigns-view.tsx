import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/campaigns/campaignsSlice';
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

const CampaignsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { campaigns } = useAppSelector((state) => state.campaigns);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View campaigns')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View campaigns'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Program</p>

            <p>{campaigns?.program?.id ?? 'No data'}</p>
          </div>

          <SwitchField
            field={{ name: 'is_published', value: campaigns?.is_published }}
            form={{ setFieldValue: () => null }}
            disabled
          />

          <FormField label='Date Added'>
            {campaigns.date_added ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  campaigns.date_added
                    ? new Date(
                        dayjs(campaigns.date_added).format('YYYY-MM-DD hh:mm'),
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

            <p>{campaigns?.created_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Date Modified'>
            {campaigns.date_modified ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  campaigns.date_modified
                    ? new Date(
                        dayjs(campaigns.date_modified).format(
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
            <p className={'block font-bold mb-2'}>Modified By User</p>

            <p>{campaigns?.modified_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Checked Out'>
            {campaigns.checked_out ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  campaigns.checked_out
                    ? new Date(
                        dayjs(campaigns.checked_out).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Checked Out</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Checked Out By</p>
            <p>{campaigns?.checked_out_by || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Checked Out By User</p>

            <p>{campaigns?.checked_out_by_user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{campaigns?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {campaigns.description ? (
              <p dangerouslySetInnerHTML={{ __html: campaigns.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <FormField label='Publish Up'>
            {campaigns.publish_up ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  campaigns.publish_up
                    ? new Date(
                        dayjs(campaigns.publish_up).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Publish Up</p>
            )}
          </FormField>

          <FormField label='Publish Down'>
            {campaigns.publish_down ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  campaigns.publish_down
                    ? new Date(
                        dayjs(campaigns.publish_down).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Publish Down</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Canvas Settings</p>
            {campaigns.canvas_settings ? (
              <p
                dangerouslySetInnerHTML={{ __html: campaigns.canvas_settings }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Allow Restart</p>
            <p>{campaigns?.allow_restart || 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Projects Campaing</p>
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
                    {campaigns.projects_campaing &&
                      Array.isArray(campaigns.projects_campaing) &&
                      campaigns.projects_campaing.map((item: any) => (
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
              {!campaigns?.projects_campaing?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/campaigns/campaigns-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CampaignsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default CampaignsView;
