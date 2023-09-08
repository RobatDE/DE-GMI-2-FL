import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/programs/programsSlice';
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

const ProgramsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { programs } = useAppSelector((state) => state.programs);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View programs')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View programs'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Company</p>

            <p>{programs?.company?.id ?? 'No data'}</p>
          </div>

          <FormField label='Date Added'>
            {programs.date_added ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  programs.date_added
                    ? new Date(
                        dayjs(programs.date_added).format('YYYY-MM-DD hh:mm'),
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

            <p>{programs?.created_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Date Modified'>
            {programs.date_modified ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  programs.date_modified
                    ? new Date(
                        dayjs(programs.date_modified).format(
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

            <p>{programs?.modified_by_user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{programs?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {programs.description ? (
              <p dangerouslySetInnerHTML={{ __html: programs.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Goal</p>
            {programs.goal ? (
              <p dangerouslySetInnerHTML={{ __html: programs.goal }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <FormField label='Start Date'>
            {programs.start_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  programs.start_date
                    ? new Date(
                        dayjs(programs.start_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Start Date</p>
            )}
          </FormField>

          <FormField label='End Date'>
            {programs.end_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  programs.end_date
                    ? new Date(
                        dayjs(programs.end_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No End Date</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Allow Restart</p>
            <p>{programs?.allow_restart || 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Campaigns Program</p>
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

                      <th>Checked Out By</th>

                      <th>Name</th>

                      <th>Publish Up</th>

                      <th>Publish Down</th>

                      <th>Allow Restart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.campaigns_program &&
                      Array.isArray(programs.campaigns_program) &&
                      programs.campaigns_program.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/campaigns/campaigns-view/?id=${item.id}`,
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

                          <td data-label='checked_out_by'>
                            {item.checked_out_by}
                          </td>

                          <td data-label='name'>{item.name}</td>

                          <td data-label='publish_up'>
                            {dataFormatter.dateTimeFormatter(item.publish_up)}
                          </td>

                          <td data-label='publish_down'>
                            {dataFormatter.dateTimeFormatter(item.publish_down)}
                          </td>

                          <td data-label='allow_restart'>
                            {item.allow_restart}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!programs?.campaigns_program?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Promptresponses Program</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Jsonprompt</th>

                      <th>Jsonresponse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.promptresponses_program &&
                      Array.isArray(programs.promptresponses_program) &&
                      programs.promptresponses_program.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/promptresponses/promptresponses-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='jsonprompt'>{item.jsonprompt}</td>

                          <td data-label='jsonresponse'>{item.jsonresponse}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!programs?.promptresponses_program?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/programs/programs-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ProgramsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ProgramsView;
