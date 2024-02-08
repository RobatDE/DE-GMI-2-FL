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

import { update, fetch } from '../../stores/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditTasks = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    team_member: '',

    project: '',

    ['title']: '',

    ['content']: '',

    starttime: new Date(),

    priority: '',

    status: '',

    owner: '',

    task: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { tasks } = useAppSelector((state) => state.tasks);

  const { tasksId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: tasksId }));
  }, [tasksId]);

  useEffect(() => {
    if (typeof tasks === 'object') {
      setInitialValues(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (typeof tasks === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = tasks[el]));

      setInitialValues(newInitialVal);
    }
  }, [tasks]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: tasksId, data }));
    await router.push('/tasks/tasks-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit tasks')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit tasks'}
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
              <FormField label='Team Member' labelFor='team_member'>
                <Field
                  name='team_member'
                  id='team_member'
                  component={SelectField}
                  options={initialValues.team_member}
                  itemRef={'team_members'}
                  showField={'id'}
                ></Field>
              </FormField>

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

              <FormField label='Title'>
                <Field name='title' placeholder='Your Title' />
              </FormField>

              <FormField label='Content'>
                <Field name='content' placeholder='Your Content' />
              </FormField>

              <FormField label='Starttime'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.starttime
                      ? new Date(
                          dayjs(initialValues.starttime).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, starttime: date })
                  }
                />
              </FormField>

              <FormField label='Priority'>
                <Field
                  type='number'
                  name='priority'
                  placeholder='Your Priority'
                />
              </FormField>

              <FormField label='Status'>
                <Field type='number' name='status' placeholder='Your Status' />
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

              <FormField label='Task' labelFor='task'>
                <Field
                  name='task'
                  id='task'
                  component={SelectField}
                  options={initialValues.task}
                  itemRef={'tasks'}
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
                  onClick={() => router.push('/tasks/tasks-list')}
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditTasks.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditTasks;
