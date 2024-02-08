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

import { update, fetch } from '../../stores/campaigns/campaignsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCampaigns = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    program: '',

    is_published: false,

    date_added: new Date(),

    created_by_user: '',

    date_modified: new Date(),

    modified_by_user: '',

    checked_out: new Date(),

    checked_out_by: '',

    checked_out_by_user: '',

    ['name']: '',

    description: '',

    publish_up: new Date(),

    publish_down: new Date(),

    canvas_settings: '',

    allow_restart: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { campaigns } = useAppSelector((state) => state.campaigns);

  const { campaignsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: campaignsId }));
  }, [campaignsId]);

  useEffect(() => {
    if (typeof campaigns === 'object') {
      setInitialValues(campaigns);
    }
  }, [campaigns]);

  useEffect(() => {
    if (typeof campaigns === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = campaigns[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [campaigns]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: campaignsId, data }));
    await router.push('/campaigns/campaigns-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit campaigns')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit campaigns'}
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
              <FormField label='Program' labelFor='program'>
                <Field
                  name='program'
                  id='program'
                  component={SelectField}
                  options={initialValues.program}
                  itemRef={'programs'}
                  showField={'id'}
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.date_added
                      ? new Date(
                          dayjs(initialValues.date_added).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, date_added: date })
                  }
                />
              </FormField>

              <FormField label='Created By User' labelFor='created_by_user'>
                <Field
                  name='created_by_user'
                  id='created_by_user'
                  component={SelectField}
                  options={initialValues.created_by_user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Date Modified'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.date_modified
                      ? new Date(
                          dayjs(initialValues.date_modified).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, date_modified: date })
                  }
                />
              </FormField>

              <FormField label='Modified By User' labelFor='modified_by_user'>
                <Field
                  name='modified_by_user'
                  id='modified_by_user'
                  component={SelectField}
                  options={initialValues.modified_by_user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Checked Out'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.checked_out
                      ? new Date(
                          dayjs(initialValues.checked_out).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, checked_out: date })
                  }
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
                  options={initialValues.checked_out_by_user}
                  itemRef={'users'}
                  showField={'firstName'}
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.publish_up
                      ? new Date(
                          dayjs(initialValues.publish_up).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, publish_up: date })
                  }
                />
              </FormField>

              <FormField label='Publish Down'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.publish_down
                      ? new Date(
                          dayjs(initialValues.publish_down).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, publish_down: date })
                  }
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

EditCampaigns.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditCampaigns;
