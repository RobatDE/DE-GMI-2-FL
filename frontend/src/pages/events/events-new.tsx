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

import { create } from '../../stores/events/eventsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const TablesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/events/events-list');
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

              name: '',

              description: '',

              event_type: '',

              event_order: '',

              properties: '',

              trigger_date: '',

              trigger_interval: '',

              trigger_interval_unit: '',

              trigger_hour: '',

              trigger_restricted_start_hour: '',

              trigger_restricted_stop_hour: '',

              trigger_restricted_dow: '',

              trigger_mode: '',

              decision_path: '',

              temp_id: '',

              channel: '',

              channel_id: '',

              event: '',
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

              <FormField label='Event Type'>
                <Field name='event_type' placeholder='Your Event Type' />
              </FormField>

              <FormField label='Event Order'>
                <Field
                  type='number'
                  name='event_order'
                  placeholder='Your Event Order'
                />
              </FormField>

              <FormField label='Properties' hasTextareaHeight>
                <Field
                  name='properties'
                  id='properties'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Trigger Date'>
                <Field
                  type='datetime-local'
                  name='trigger_date'
                  placeholder='Your Trigger Date'
                />
              </FormField>

              <FormField label='Trigger Interval'>
                <Field
                  type='number'
                  name='trigger_interval'
                  placeholder='Your Trigger Interval'
                />
              </FormField>

              <FormField label='Trigger Interval Unit'>
                <Field
                  name='trigger_interval_unit'
                  placeholder='Your Trigger Interval Unit'
                />
              </FormField>

              <FormField label='Trigger Hour'>
                <Field
                  type='datetime-local'
                  name='trigger_hour'
                  placeholder='Your Trigger Hour'
                />
              </FormField>

              <FormField label='Trigger Restricted Start Hour'>
                <Field
                  type='datetime-local'
                  name='trigger_restricted_start_hour'
                  placeholder='Your Trigger Restricted Start Hour'
                />
              </FormField>

              <FormField label='Trigger Restricted Stop Hour'>
                <Field
                  type='datetime-local'
                  name='trigger_restricted_stop_hour'
                  placeholder='Your Trigger Restricted Stop Hour'
                />
              </FormField>

              <FormField label='Trigger Restricted Dow' hasTextareaHeight>
                <Field
                  name='trigger_restricted_dow'
                  id='trigger_restricted_dow'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Trigger Mode'>
                <Field name='trigger_mode' placeholder='Your Trigger Mode' />
              </FormField>

              <FormField label='Decision Path'>
                <Field name='decision_path' placeholder='Your Decision Path' />
              </FormField>

              <FormField label='Temp Id'>
                <Field name='temp_id' placeholder='Your Temp Id' />
              </FormField>

              <FormField label='Channel'>
                <Field name='channel' placeholder='Your Channel' />
              </FormField>

              <FormField label='Channel Id'>
                <Field
                  type='number'
                  name='channel_id'
                  placeholder='Your Channel Id'
                />
              </FormField>

              <FormField label='Event' labelFor='event'>
                <Field
                  name='event'
                  id='event'
                  component={SelectField}
                  options={[]}
                  itemRef={'events'}
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
                  onClick={() => router.push('/events/events-list')}
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
