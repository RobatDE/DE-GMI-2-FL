import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import ButtonsBase from '../../components/ButtonsBase';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/promptresponses/promptresponsesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const TablesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/promptresponses/promptresponses-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={{
              program: '',

              name: '',

              engine: '',

              model: '',

              prompt: '',

              response: '',

              prompt_id: '',

              jsonprompt: '',

              jsonresponse: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Program' labelFor='program'>
                <Field
                  name='program'
                  id='program'
                  component={SelectField}
                  options={[]}
                  itemRef={'programs'}
                ></Field>
              </FormField>

              <FormField label='Name' hasTextareaHeight>
                <Field name='name' id='name' component={RichTextField}></Field>
              </FormField>

              <FormField label='Engine' hasTextareaHeight>
                <Field
                  name='engine'
                  id='engine'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Model' hasTextareaHeight>
                <Field
                  name='model'
                  id='model'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Prompt' hasTextareaHeight>
                <Field
                  name='prompt'
                  id='prompt'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Response' hasTextareaHeight>
                <Field
                  name='response'
                  id='response'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Prompt Id' labelFor='prompt_id'>
                <Field
                  name='prompt_id'
                  id='prompt_id'
                  component={SelectField}
                  options={[]}
                  itemRef={'prompts'}
                ></Field>
              </FormField>

              <FormField label='Jsonprompt'>
                <Field name='jsonprompt' placeholder='Your Jsonprompt' />
              </FormField>

              <FormField label='Jsonresponse'>
                <Field name='jsonresponse' placeholder='Your Jsonresponse' />
              </FormField>

              <BaseDivider />
              <ButtonsBase>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/promptresponses/promptresponses-list')
                  }
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TablesPage;
