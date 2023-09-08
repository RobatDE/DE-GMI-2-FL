import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/users/usersSlice';
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

const UsersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View users')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View users'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>First Name</p>
            <p>{users?.firstName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Last Name</p>
            <p>{users?.lastName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone Number</p>
            <p>{users?.phoneNumber}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>E-Mail</p>
            <p>{users?.email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Role</p>
            <p>{users?.role ?? 'No data'}</p>
          </div>

          <SwitchField
            field={{ name: 'disabled', value: users?.disabled }}
            form={{ setFieldValue: () => null }}
            disabled
          />

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Avatar</p>
            {users?.avatar?.length ? (
              <ImageField
                name={'avatar'}
                image={users?.avatar}
                className='w-20 h-20'
              />
            ) : (
              <p>No Avatar</p>
            )}
          </div>

          <>
            <p className={'block font-bold mb-2'}>Assets Created By User</p>
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
                    {users.assets_created_by_user &&
                      Array.isArray(users.assets_created_by_user) &&
                      users.assets_created_by_user.map((item: any) => (
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
              {!users?.assets_created_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Assets Checked Out By User</p>
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
                    {users.assets_checked_out_by_user &&
                      Array.isArray(users.assets_checked_out_by_user) &&
                      users.assets_checked_out_by_user.map((item: any) => (
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
              {!users?.assets_checked_out_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Categories Created By User</p>
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
                    {users.categories_created_by_user &&
                      Array.isArray(users.categories_created_by_user) &&
                      users.categories_created_by_user.map((item: any) => (
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
              {!users?.categories_created_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Categories Modified By User
            </p>
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
                    {users.categories_modified_by_user &&
                      Array.isArray(users.categories_modified_by_user) &&
                      users.categories_modified_by_user.map((item: any) => (
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
              {!users?.categories_modified_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Categories Checked Out By User
            </p>
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
                    {users.categories_checked_out_by_user &&
                      Array.isArray(users.categories_checked_out_by_user) &&
                      users.categories_checked_out_by_user.map((item: any) => (
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
              {!users?.categories_checked_out_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Channels Owner</p>
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
                    {users.channels_owner &&
                      Array.isArray(users.channels_owner) &&
                      users.channels_owner.map((item: any) => (
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
              {!users?.channels_owner?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Companies Owner</p>
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

                      <th>Score</th>

                      <th>Companyemail</th>

                      <th>Companyaddress 1</th>

                      <th>Companyaddress 2</th>

                      <th>Companyphone</th>

                      <th>Companycity</th>

                      <th>Companystate</th>

                      <th>Companyzipcode</th>

                      <th>Companycountry</th>

                      <th>Companyname</th>

                      <th>Companywebsite</th>

                      <th>Companyindustry</th>

                      <th>Companynumber Of Employees</th>

                      <th>Companyfax</th>

                      <th>Companyannual Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.companies_owner &&
                      Array.isArray(users.companies_owner) &&
                      users.companies_owner.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/companies/companies-view/?id=${item.id}`,
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

                          <td data-label='score'>{item.score}</td>

                          <td data-label='companyemail'>{item.companyemail}</td>

                          <td data-label='companyaddress1'>
                            {item.companyaddress1}
                          </td>

                          <td data-label='companyaddress2'>
                            {item.companyaddress2}
                          </td>

                          <td data-label='companyphone'>{item.companyphone}</td>

                          <td data-label='companycity'>{item.companycity}</td>

                          <td data-label='companystate'>{item.companystate}</td>

                          <td data-label='companyzipcode'>
                            {item.companyzipcode}
                          </td>

                          <td data-label='companycountry'>
                            {item.companycountry}
                          </td>

                          <td data-label='companyname'>{item.companyname}</td>

                          <td data-label='companywebsite'>
                            {item.companywebsite}
                          </td>

                          <td data-label='companyindustry'>
                            {item.companyindustry}
                          </td>

                          <td data-label='companynumber_of_employees'>
                            {item.companynumber_of_employees}
                          </td>

                          <td data-label='companyfax'>{item.companyfax}</td>

                          <td data-label='companyannual_revenue'>
                            {item.companyannual_revenue}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.companies_owner?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Companies Created By User</p>
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

                      <th>Score</th>

                      <th>Companyemail</th>

                      <th>Companyaddress 1</th>

                      <th>Companyaddress 2</th>

                      <th>Companyphone</th>

                      <th>Companycity</th>

                      <th>Companystate</th>

                      <th>Companyzipcode</th>

                      <th>Companycountry</th>

                      <th>Companyname</th>

                      <th>Companywebsite</th>

                      <th>Companyindustry</th>

                      <th>Companynumber Of Employees</th>

                      <th>Companyfax</th>

                      <th>Companyannual Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.companies_created_by_user &&
                      Array.isArray(users.companies_created_by_user) &&
                      users.companies_created_by_user.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/companies/companies-view/?id=${item.id}`,
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

                          <td data-label='score'>{item.score}</td>

                          <td data-label='companyemail'>{item.companyemail}</td>

                          <td data-label='companyaddress1'>
                            {item.companyaddress1}
                          </td>

                          <td data-label='companyaddress2'>
                            {item.companyaddress2}
                          </td>

                          <td data-label='companyphone'>{item.companyphone}</td>

                          <td data-label='companycity'>{item.companycity}</td>

                          <td data-label='companystate'>{item.companystate}</td>

                          <td data-label='companyzipcode'>
                            {item.companyzipcode}
                          </td>

                          <td data-label='companycountry'>
                            {item.companycountry}
                          </td>

                          <td data-label='companyname'>{item.companyname}</td>

                          <td data-label='companywebsite'>
                            {item.companywebsite}
                          </td>

                          <td data-label='companyindustry'>
                            {item.companyindustry}
                          </td>

                          <td data-label='companynumber_of_employees'>
                            {item.companynumber_of_employees}
                          </td>

                          <td data-label='companyfax'>{item.companyfax}</td>

                          <td data-label='companyannual_revenue'>
                            {item.companyannual_revenue}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.companies_created_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Companies Modified By User</p>
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

                      <th>Score</th>

                      <th>Companyemail</th>

                      <th>Companyaddress 1</th>

                      <th>Companyaddress 2</th>

                      <th>Companyphone</th>

                      <th>Companycity</th>

                      <th>Companystate</th>

                      <th>Companyzipcode</th>

                      <th>Companycountry</th>

                      <th>Companyname</th>

                      <th>Companywebsite</th>

                      <th>Companyindustry</th>

                      <th>Companynumber Of Employees</th>

                      <th>Companyfax</th>

                      <th>Companyannual Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.companies_modified_by_user &&
                      Array.isArray(users.companies_modified_by_user) &&
                      users.companies_modified_by_user.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/companies/companies-view/?id=${item.id}`,
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

                          <td data-label='score'>{item.score}</td>

                          <td data-label='companyemail'>{item.companyemail}</td>

                          <td data-label='companyaddress1'>
                            {item.companyaddress1}
                          </td>

                          <td data-label='companyaddress2'>
                            {item.companyaddress2}
                          </td>

                          <td data-label='companyphone'>{item.companyphone}</td>

                          <td data-label='companycity'>{item.companycity}</td>

                          <td data-label='companystate'>{item.companystate}</td>

                          <td data-label='companyzipcode'>
                            {item.companyzipcode}
                          </td>

                          <td data-label='companycountry'>
                            {item.companycountry}
                          </td>

                          <td data-label='companyname'>{item.companyname}</td>

                          <td data-label='companywebsite'>
                            {item.companywebsite}
                          </td>

                          <td data-label='companyindustry'>
                            {item.companyindustry}
                          </td>

                          <td data-label='companynumber_of_employees'>
                            {item.companynumber_of_employees}
                          </td>

                          <td data-label='companyfax'>{item.companyfax}</td>

                          <td data-label='companyannual_revenue'>
                            {item.companyannual_revenue}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.companies_modified_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Companies Checked Out By User
            </p>
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

                      <th>Score</th>

                      <th>Companyemail</th>

                      <th>Companyaddress 1</th>

                      <th>Companyaddress 2</th>

                      <th>Companyphone</th>

                      <th>Companycity</th>

                      <th>Companystate</th>

                      <th>Companyzipcode</th>

                      <th>Companycountry</th>

                      <th>Companyname</th>

                      <th>Companywebsite</th>

                      <th>Companyindustry</th>

                      <th>Companynumber Of Employees</th>

                      <th>Companyfax</th>

                      <th>Companyannual Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.companies_checked_out_by_user &&
                      Array.isArray(users.companies_checked_out_by_user) &&
                      users.companies_checked_out_by_user.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/companies/companies-view/?id=${item.id}`,
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

                          <td data-label='score'>{item.score}</td>

                          <td data-label='companyemail'>{item.companyemail}</td>

                          <td data-label='companyaddress1'>
                            {item.companyaddress1}
                          </td>

                          <td data-label='companyaddress2'>
                            {item.companyaddress2}
                          </td>

                          <td data-label='companyphone'>{item.companyphone}</td>

                          <td data-label='companycity'>{item.companycity}</td>

                          <td data-label='companystate'>{item.companystate}</td>

                          <td data-label='companyzipcode'>
                            {item.companyzipcode}
                          </td>

                          <td data-label='companycountry'>
                            {item.companycountry}
                          </td>

                          <td data-label='companyname'>{item.companyname}</td>

                          <td data-label='companywebsite'>
                            {item.companywebsite}
                          </td>

                          <td data-label='companyindustry'>
                            {item.companyindustry}
                          </td>

                          <td data-label='companynumber_of_employees'>
                            {item.companynumber_of_employees}
                          </td>

                          <td data-label='companyfax'>{item.companyfax}</td>

                          <td data-label='companyannual_revenue'>
                            {item.companyannual_revenue}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.companies_checked_out_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Programs Created By User</p>
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
                    {users.programs_created_by_user &&
                      Array.isArray(users.programs_created_by_user) &&
                      users.programs_created_by_user.map((item: any) => (
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
              {!users?.programs_created_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Programs Modified By User</p>
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
                    {users.programs_modified_by_user &&
                      Array.isArray(users.programs_modified_by_user) &&
                      users.programs_modified_by_user.map((item: any) => (
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
              {!users?.programs_modified_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Campaigns Created By User</p>
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
                    {users.campaigns_created_by_user &&
                      Array.isArray(users.campaigns_created_by_user) &&
                      users.campaigns_created_by_user.map((item: any) => (
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
              {!users?.campaigns_created_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Campaigns Modified By User</p>
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
                    {users.campaigns_modified_by_user &&
                      Array.isArray(users.campaigns_modified_by_user) &&
                      users.campaigns_modified_by_user.map((item: any) => (
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
              {!users?.campaigns_modified_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Campaigns Checked Out By User
            </p>
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
                    {users.campaigns_checked_out_by_user &&
                      Array.isArray(users.campaigns_checked_out_by_user) &&
                      users.campaigns_checked_out_by_user.map((item: any) => (
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
              {!users?.campaigns_checked_out_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Projects Created By User</p>
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
                    {users.projects_created_by_user &&
                      Array.isArray(users.projects_created_by_user) &&
                      users.projects_created_by_user.map((item: any) => (
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
              {!users?.projects_created_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Projects Modified By User</p>
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
                    {users.projects_modified_by_user &&
                      Array.isArray(users.projects_modified_by_user) &&
                      users.projects_modified_by_user.map((item: any) => (
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
              {!users?.projects_modified_by_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Tasks Owner</p>
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
                    {users.tasks_owner &&
                      Array.isArray(users.tasks_owner) &&
                      users.tasks_owner.map((item: any) => (
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
              {!users?.tasks_owner?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Team_members User</p>
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
                    {users.team_members_user &&
                      Array.isArray(users.team_members_user) &&
                      users.team_members_user.map((item: any) => (
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
              {!users?.team_members_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/users/users-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default UsersView;
