import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/prompts/promptsSlice';
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

const PromptsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { prompts } = useAppSelector((state) => state.prompts);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View prompts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'View prompts'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            {prompts.name ? (
              <p dangerouslySetInnerHTML={{ __html: prompts.name }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Prompt</p>
            {prompts.prompt ? (
              <p dangerouslySetInnerHTML={{ __html: prompts.prompt }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Jsonprompt</p>
            <p>{prompts?.jsonprompt}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Promptresponses Prompt Id</p>
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
                    {prompts.promptresponses_prompt_id &&
                      Array.isArray(prompts.promptresponses_prompt_id) &&
                      prompts.promptresponses_prompt_id.map((item: any) => (
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
              {!prompts?.promptresponses_prompt_id?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/prompts/prompts-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PromptsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PromptsView;
