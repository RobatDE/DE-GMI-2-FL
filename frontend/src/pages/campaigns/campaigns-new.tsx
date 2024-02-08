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

import { create } from '../../stores/campaigns/campaignsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const TablesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/campaigns/campaigns-list');
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

              is_published: false,

              date_added: '',

              created_by_user: '',

              date_modified: '',

              modified_by_user: '',

              checked_out: '',

              checked_out_by: '',

              checked_out_by_user: '',

              name: '',

              description: '',

              publish_up: '',

              publish_down: '',

              canvas_settings: '',

              allow_restart: '',
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

              <FormField label='Is Published' labelFor='is_published'>
                <Field
                  name='is_published'
                  id='is_published'
                  component={SwitchField}
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

              <FormField label='Checked Out'>
                <Field
                  type='datetime-local'
                  name='checked_out'
                  placeholder='Your Checked Out'
                />
              </FormField>

              <FormField label='Checked Out By'>
                <Field
                  type='number'
                  name='checked_out_by'
                  placeholder='Your Checked Out By'
                />
              </FormField>

              <FormField
                label='Checked Out By User'
                labelFor='checked_out_by_user'
              >
                <Field
                  name='checked_out_by_user'
                  id='checked_out_by_user'
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

              <FormField label='Publish Up'>
                <Field
                  type='datetime-local'
                  name='publish_up'
                  placeholder='Your Publish Up'
                />
              </FormField>

              <FormField label='Publish Down'>
                <Field
                  type='datetime-local'
                  name='publish_down'
                  placeholder='Your Publish Down'
                />
              </FormField>

              <FormField label='Canvas Settings' hasTextareaHeight>
                <Field
                  name='canvas_settings'
                  id='canvas_settings'
                  component={RichTextField}
                ></Field>
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
                  onClick={() => router.push('/campaigns/campaigns-list')}
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
