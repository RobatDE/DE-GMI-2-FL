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

import { create } from '../../stores/assets/assetsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const TablesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/assets/assets-list');
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
              project: '',

              category: '',

              is_published: false,

              date_added: '',

              created_by_user: '',

              date_modified: '',

              checked_out: '',

              checked_out_by_user: '',

              title: '',

              description: '',

              alias: '',

              storage_location: '',

              path: '',

              url: '',

              remote_path: '',

              original_file_name: '',

              lang: '',

              publish_up: '',

              publish_down: '',

              download_count: '',

              unique_download_count: '',

              revision: '',

              extension: '',

              mime: '',

              size: '',

              disallow: false,
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Project' labelFor='project'>
                <Field
                  name='project'
                  id='project'
                  component={SelectField}
                  options={[]}
                  itemRef={'projects'}
                ></Field>
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

              <FormField label='Storage Location'>
                <Field
                  name='storage_location'
                  placeholder='Your Storage Location'
                />
              </FormField>

              <FormField label='Path'>
                <Field name='path' placeholder='Your Path' />
              </FormField>

              <FormField label='Url'>
                <Field name='url' placeholder='Your Url' />
              </FormField>

              <FormField label='Remote Path' hasTextareaHeight>
                <Field
                  name='remote_path'
                  id='remote_path'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Original File Name' hasTextareaHeight>
                <Field
                  name='original_file_name'
                  id='original_file_name'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Lang'>
                <Field name='lang' placeholder='Your Lang' />
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

              <FormField label='Download Count'>
                <Field
                  type='number'
                  name='download_count'
                  placeholder='Your Download Count'
                />
              </FormField>

              <FormField label='Unique Download Count'>
                <Field
                  type='number'
                  name='unique_download_count'
                  placeholder='Your Unique Download Count'
                />
              </FormField>

              <FormField label='Revision'>
                <Field
                  type='number'
                  name='revision'
                  placeholder='Your Revision'
                />
              </FormField>

              <FormField label='Extension'>
                <Field name='extension' placeholder='Your Extension' />
              </FormField>

              <FormField label='Mime'>
                <Field name='mime' placeholder='Your Mime' />
              </FormField>

              <FormField label='Size'>
                <Field type='number' name='size' placeholder='Your Size' />
              </FormField>

              <FormField label='Disallow' labelFor='disallow'>
                <Field
                  name='disallow'
                  id='disallow'
                  component={SwitchField}
                ></Field>
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
                  onClick={() => router.push('/assets/assets-list')}
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
