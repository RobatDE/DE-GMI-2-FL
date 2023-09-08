import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/events/eventsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditEvents = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    project: '',

    ['name']: '',

    description: '',

    ['event_type']: '',

    event_order: '',

    properties: '',

    trigger_date: new Date(),

    trigger_interval: '',

    ['trigger_interval_unit']: '',

    trigger_hour: new Date(),

    trigger_restricted_start_hour: new Date(),

    trigger_restricted_stop_hour: new Date(),

    trigger_restricted_dow: '',

    ['trigger_mode']: '',

    ['decision_path']: '',

    ['temp_id']: '',

    ['channel']: '',

    channel_id: '',

    event: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { events } = useAppSelector((state) => state.events);

  const { eventsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: eventsId }));
  }, [eventsId]);

  useEffect(() => {
    if (typeof events === 'object') {
      setInitialValues(events);
    }
  }, [events]);

  useEffect(() => {
    if (typeof events === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = events[el]));

      setInitialValues(newInitialVal);
    }
  }, [events]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: eventsId, data }));
    await router.push('/events/events-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit events')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit events'}
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Project' labelFor='project'>
                <Field
                  name='project'
                  id='project'
                  component={SelectField}
                  options={initialValues.project}
                  itemRef={'projects'}
                  showField={'id'}
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.trigger_date
                      ? new Date(
                          dayjs(initialValues.trigger_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, trigger_date: date })
                  }
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.trigger_hour
                      ? new Date(
                          dayjs(initialValues.trigger_hour).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, trigger_hour: date })
                  }
                />
              </FormField>

              <FormField label='Trigger Restricted Start Hour'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.trigger_restricted_start_hour
                      ? new Date(
                          dayjs(
                            initialValues.trigger_restricted_start_hour,
                          ).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      trigger_restricted_start_hour: date,
                    })
                  }
                />
              </FormField>

              <FormField label='Trigger Restricted Stop Hour'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.trigger_restricted_stop_hour
                      ? new Date(
                          dayjs(
                            initialValues.trigger_restricted_stop_hour,
                          ).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      trigger_restricted_stop_hour: date,
                    })
                  }
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
                  options={initialValues.event}
                  itemRef={'events'}
                  showField={'id'}
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

EditEvents.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditEvents;
