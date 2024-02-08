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
import ButtonsBase from '../../components/ButtonsBase';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/channels/channelsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditChannels = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    project: '',

    event: '',

    owner: '',

    redirect_id: '',

    ['channel']: '',

    ['content']: '',

    hits: '',

    unique_hits: '',

    redirect: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { channels } = useAppSelector((state) => state.channels);

  const { channelsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: channelsId }));
  }, [channelsId]);

  useEffect(() => {
    if (typeof channels === 'object') {
      setInitialValues(channels);
    }
  }, [channels]);

  useEffect(() => {
    if (typeof channels === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = channels[el]));

      setInitialValues(newInitialVal);
    }
  }, [channels]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: channelsId, data }));
    await router.push('/channels/channels-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit channels')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit channels'}
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

              <FormField label='Owner' labelFor='owner'>
                <Field
                  name='owner'
                  id='owner'
                  component={SelectField}
                  options={initialValues.owner}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Redirect Id'>
                <Field
                  type='number'
                  name='redirect_id'
                  placeholder='Your Redirect Id'
                />
              </FormField>

              <FormField label='Channel'>
                <Field name='channel' placeholder='Your Channel' />
              </FormField>

              <FormField label='Content'>
                <Field name='content' placeholder='Your Content' />
              </FormField>

              <FormField label='Hits'>
                <Field type='number' name='hits' placeholder='Your Hits' />
              </FormField>

              <FormField label='Unique Hits'>
                <Field
                  type='number'
                  name='unique_hits'
                  placeholder='Your Unique Hits'
                />
              </FormField>

              <FormField label='Redirect' labelFor='redirect'>
                <Field
                  name='redirect'
                  id='redirect'
                  component={SelectField}
                  options={initialValues.redirect}
                  itemRef={'channels'}
                  showField={'id'}
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
                  onClick={() => router.push('/channels/channels-list')}
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditChannels.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditChannels;
