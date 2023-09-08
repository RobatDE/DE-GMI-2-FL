import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/promptresponses/promptresponsesSlice';
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

const PromptresponsesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { promptresponses } = useAppSelector((state) => state.promptresponses);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View promptresponses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View promptresponses'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Program</p>

            <p>{promptresponses?.program?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            {promptresponses.name ? (
              <p dangerouslySetInnerHTML={{ __html: promptresponses.name }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Engine</p>
            {promptresponses.engine ? (
              <p dangerouslySetInnerHTML={{ __html: promptresponses.engine }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Model</p>
            {promptresponses.model ? (
              <p dangerouslySetInnerHTML={{ __html: promptresponses.model }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Prompt</p>
            {promptresponses.prompt ? (
              <p dangerouslySetInnerHTML={{ __html: promptresponses.prompt }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Response</p>
            {promptresponses.response ? (
              <p
                dangerouslySetInnerHTML={{ __html: promptresponses.response }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Prompt Id</p>

            <p>{promptresponses?.prompt_id?.id ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Jsonprompt</p>
            <p>{promptresponses?.jsonprompt}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Jsonresponse</p>
            <p>{promptresponses?.jsonresponse}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/promptresponses/promptresponses-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PromptresponsesView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PromptresponsesView;
