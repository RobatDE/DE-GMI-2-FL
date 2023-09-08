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
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/categories/categoriesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const TablesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/categories/categories-list');
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
              is_published: false,

              date_added: '',

              created_by_user: '',

              date_modified: '',

              modified_by_user: '',

              checked_out: '',

              checked_out_by_user: '',

              title: '',

              description: '',

              alias: '',

              color: '',

              bundle: '',

              project: '',

              checked_out_by: '',

              category: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
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

              <FormField label='Title'>
                <Field name='title' placeholder='Your Title' />
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  id='description'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Alias'>
                <Field name='alias' placeholder='Your Alias' />
              </FormField>

              <FormField label='Color'>
                <Field name='color' placeholder='Your Color' />
              </FormField>

              <FormField label='Bundle'>
                <Field name='bundle' placeholder='Your Bundle' />
              </FormField>

              <FormField label='Project' labelFor='project'>
                <Field
                  name='project'
                  id='project'
                  component={SelectField}
                  options={[]}
                  itemRef={'projects'}
                ></Field>
              </FormField>

              <FormField label='Checked Out By'>
                <Field
                  type='number'
                  name='checked_out_by'
                  placeholder='Your Checked Out By'
                />
              </FormField>

              <FormField label='Category' labelFor='category'>
                <Field
                  name='category'
                  id='category'
                  component={SelectField}
                  options={[]}
                  itemRef={'categories'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/categories/categories-list')}
                />
              </BaseButtons>
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
