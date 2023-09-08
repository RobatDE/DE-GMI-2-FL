import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/assets/assetsSlice';
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

const AssetsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { assets } = useAppSelector((state) => state.assets);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View assets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View assets'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Project</p>

            <p>{assets?.project?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Category</p>

            <p>{assets?.category?.id ?? 'No data'}</p>
          </div>

          <SwitchField
            field={{ name: 'is_published', value: assets?.is_published }}
            form={{ setFieldValue: () => null }}
            disabled
          />

          <FormField label='Date Added'>
            {assets.date_added ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  assets.date_added
                    ? new Date(
                        dayjs(assets.date_added).format('YYYY-MM-DD hh:mm'),
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

            <p>{assets?.created_by_user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='Date Modified'>
            {assets.date_modified ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  assets.date_modified
                    ? new Date(
                        dayjs(assets.date_modified).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Date Modified</p>
            )}
          </FormField>

          <FormField label='Checked Out'>
            {assets.checked_out ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  assets.checked_out
                    ? new Date(
                        dayjs(assets.checked_out).format('YYYY-MM-DD hh:mm'),
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

            <p>{assets?.checked_out_by_user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{assets?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {assets.description ? (
              <p dangerouslySetInnerHTML={{ __html: assets.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Alias</p>
            <p>{assets?.alias}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Storage Location</p>
            <p>{assets?.storage_location}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Path</p>
            <p>{assets?.path}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Url</p>
            <p>{assets?.url}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Remote Path</p>
            {assets.remote_path ? (
              <p dangerouslySetInnerHTML={{ __html: assets.remote_path }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Original File Name</p>
            {assets.original_file_name ? (
              <p
                dangerouslySetInnerHTML={{ __html: assets.original_file_name }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Lang</p>
            <p>{assets?.lang}</p>
          </div>

          <FormField label='Publish Up'>
            {assets.publish_up ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  assets.publish_up
                    ? new Date(
                        dayjs(assets.publish_up).format('YYYY-MM-DD hh:mm'),
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
            {assets.publish_down ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  assets.publish_down
                    ? new Date(
                        dayjs(assets.publish_down).format('YYYY-MM-DD hh:mm'),
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
            <p className={'block font-bold mb-2'}>Download Count</p>
            <p>{assets?.download_count || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Unique Download Count</p>
            <p>{assets?.unique_download_count || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Revision</p>
            <p>{assets?.revision || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Extension</p>
            <p>{assets?.extension}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Mime</p>
            <p>{assets?.mime}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Size</p>
            <p>{assets?.size || 'No data'}</p>
          </div>

          <SwitchField
            field={{ name: 'disallow', value: assets?.disallow }}
            form={{ setFieldValue: () => null }}
            disabled
          />

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/assets/assets-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

AssetsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default AssetsView;
