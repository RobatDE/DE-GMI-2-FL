import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/companies/companiesSlice';
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

const CompaniesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector((state) => state.companies);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View companies')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View companies'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Owner</p>

            <p>{companies?.owner?.firstName ?? 'No data'}</p>
          </div>

          <SwitchField
            field={{ name: 'is_published', value: companies?.is_published }}
            form={{ setFieldValue: () => null }}
            disabled
          />

          <FormField label='Date Added'>
            {companies.date_added ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  companies.date_added
                    ? new Date(
                        dayjs(companies.date_added).format('YYYY-MM-DD hh:mm'),
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

            <p>{companies?.created_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Date Modified'>
            {companies.date_modified ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  companies.date_modified
                    ? new Date(
                        dayjs(companies.date_modified).format(
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

            <p>{companies?.modified_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Checked Out'>
            {companies.checked_out ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  companies.checked_out
                    ? new Date(
                        dayjs(companies.checked_out).format('YYYY-MM-DD hh:mm'),
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
            <p>{companies?.checked_out_by || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Checked Out By User</p>

            <p>{companies?.checked_out_by_user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Social Cache</p>
            {companies.social_cache ? (
              <p dangerouslySetInnerHTML={{ __html: companies.social_cache }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Score</p>
            <p>{companies?.score || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyemail</p>
            <p>{companies?.companyemail}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyaddress 1</p>
            <p>{companies?.companyaddress1}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyaddress 2</p>
            <p>{companies?.companyaddress2}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyphone</p>
            <p>{companies?.companyphone}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companycity</p>
            <p>{companies?.companycity}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companystate</p>
            <p>{companies?.companystate}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyzipcode</p>
            <p>{companies?.companyzipcode}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companycountry</p>
            <p>{companies?.companycountry}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyname</p>
            <p>{companies?.companyname}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companywebsite</p>
            <p>{companies?.companywebsite}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyindustry</p>
            <p>{companies?.companyindustry}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companydescription</p>
            {companies.companydescription ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: companies.companydescription,
                }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companynumber Of Employees</p>
            <p>{companies?.companynumber_of_employees || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyfax</p>
            <p>{companies?.companyfax}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Companyannual Revenue</p>
            <p>{companies?.companyannual_revenue || 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Programs Company</p>
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

                      <th>Name</th>

                      <th>Start Date</th>

                      <th>End Date</th>

                      <th>Allow Restart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.programs_company &&
                      Array.isArray(companies.programs_company) &&
                      companies.programs_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/programs/programs-view/?id=${item.id}`,
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

                          <td data-label='name'>{item.name}</td>

                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>

                          <td data-label='allow_restart'>
                            {item.allow_restart}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!companies?.programs_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Markets Company</p>
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
                    {companies.markets_company &&
                      Array.isArray(companies.markets_company) &&
                      companies.markets_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/markets/markets-view/?id=${item.id}`)
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!companies?.markets_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Opportunities Company</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Public On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.opportunities_company &&
                      Array.isArray(companies.opportunities_company) &&
                      companies.opportunities_company.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/opportunities/opportunities-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='public_on'>
                            {dataFormatter.dateTimeFormatter(item.public_on)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!companies?.opportunities_company?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/companies/companies-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CompaniesView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default CompaniesView;
