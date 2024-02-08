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

import { update, fetch } from '../../stores/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditProjects = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    campaing: '',

    team: '',

    name: '',

    description: '',

    date_added: new Date(),

    created_by_user: '',

    date_modified: new Date(),

    modified_by: '',

    modified_by_user: '',

    public_on: new Date(),

    start_on: new Date(),

    end_on: new Date(),
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { projects } = useAppSelector((state) => state.projects);

  const { projectsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: projectsId }));
  }, [projectsId]);

  useEffect(() => {
    if (typeof projects === 'object') {
      setInitialValues(projects);
    }
  }, [projects]);

  useEffect(() => {
    if (typeof projects === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = projects[el]));

      setInitialValues(newInitialVal);
    }
  }, [projects]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: projectsId, data }));
    await router.push('/projects/projects-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit projects')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit projects'}
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
              <FormField label='Campaing' labelFor='campaing'>
                <Field
                  name='campaing'
                  id='campaing'
                  component={SelectField}
                  options={initialValues.campaing}
                  itemRef={'campaigns'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='Team' labelFor='team'>
                <Field
                  name='team'
                  id='team'
                  component={SelectField}
                  options={initialValues.team}
                  itemRef={'teams'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='Name' hasTextareaHeight>
                <Field name='name' id='name' component={RichTextField}></Field>
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  id='description'
                  component={RichTextField}
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

              <FormField label='Modified By'>
                <Field
                  type='number'
                  name='modified_by'
                  placeholder='Your Modified By'
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

              <FormField label='Public On'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.public_on
                      ? new Date(
                          dayjs(initialValues.public_on).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, public_on: date })
                  }
                />
              </FormField>

              <FormField label='Start On'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.start_on
                      ? new Date(
                          dayjs(initialValues.start_on).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, start_on: date })
                  }
                />
              </FormField>

              <FormField label='End On'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.end_on
                      ? new Date(
                          dayjs(initialValues.end_on).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, end_on: date })
                  }
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
                  onClick={() => router.push('/projects/projects-list')}
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditProjects.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditProjects;
