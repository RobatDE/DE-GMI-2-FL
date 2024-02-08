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

import { create } from '../../stores/programs/programsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const TablesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/programs/programs-list');
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
              company: '',

              date_added: '',

              created_by_user: '',

              date_modified: '',

              modified_by_user: '',

              name: '',

              description: '',

              goal: '',

              start_date: '',

              end_date: '',

              allow_restart: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Company' labelFor='company'>
                <Field
                  name='company'
                  id='company'
                  component={SelectField}
                  options={[]}
                  itemRef={'companies'}
                ></Field>
              </FormField>

              <FormField label='Date Added'>
                <Field
                  type='datetime-local'
                  name='date_added'
                  placeholder='Your Date Added'
                />
              </FormField>

              <FormField label='Created By User' labelFor='created_by_user'>
                <Field
                  name='created_by_user'
                  id='created_by_user'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Date Modified'>
                <Field
                  type='datetime-local'
                  name='date_modified'
                  placeholder='Your Date Modified'
                />
              </FormField>

              <FormField label='Modified By User' labelFor='modified_by_user'>
                <Field
                  name='modified_by_user'
                  id='modified_by_user'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Name'>
                <Field name='name' placeholder='Your Name' />
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  id='description'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Goal' hasTextareaHeight>
                <Field name='goal' id='goal' component={RichTextField}></Field>
              </FormField>

              <FormField label='Start Date'>
                <Field
                  type='datetime-local'
                  name='start_date'
                  placeholder='Your Start Date'
                />
              </FormField>

              <FormField label='End Date'>
                <Field
                  type='datetime-local'
                  name='end_date'
                  placeholder='Your End Date'
                />
              </FormField>

              <FormField label='Allow Restart'>
                <Field
                  type='number'
                  name='allow_restart'
                  placeholder='Your Allow Restart'
                />
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
                  onClick={() => router.push('/programs/programs-list')}
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
