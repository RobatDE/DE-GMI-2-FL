import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/categories/categoriesSlice';
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

const CategoriesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View categories')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View categories'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <SwitchField
            field={{ name: 'is_published', value: categories?.is_published }}
            form={{ setFieldValue: () => null }}
            disabled
          />

          <FormField label='Date Added'>
            {categories.date_added ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  categories.date_added
                    ? new Date(
                        dayjs(categories.date_added).format('YYYY-MM-DD hh:mm'),
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

            <p>{categories?.created_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Date Modified'>
            {categories.date_modified ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  categories.date_modified
                    ? new Date(
                        dayjs(categories.date_modified).format(
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

            <p>{categories?.modified_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Checked Out'>
            {categories.checked_out ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  categories.checked_out
                    ? new Date(
                        dayjs(categories.checked_out).format(
                          'YYYY-MM-DD hh:mm',
                        ),
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
            <p className={'block font-bold mb-2'}>Checked Out By User</p>

            <p>{categories?.checked_out_by_user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{categories?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {categories.description ? (
              <p dangerouslySetInnerHTML={{ __html: categories.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Alias</p>
            <p>{categories?.alias}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Color</p>
            <p>{categories?.color}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Bundle</p>
            <p>{categories?.bundle}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Project</p>

            <p>{categories?.project?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Checked Out By</p>
            <p>{categories?.checked_out_by || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Category</p>

            <p>{categories?.category?.id ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Assets Category</p>
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
                    {categories.assets_category &&
                      Array.isArray(categories.assets_category) &&
                      categories.assets_category.map((item: any) => (
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
              {!categories?.assets_category?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/categories/categories-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CategoriesView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default CategoriesView;
