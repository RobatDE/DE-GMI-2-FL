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

import {
  update,
  fetch,
} from '../../stores/promptresponses/promptresponsesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditPromptresponses = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    program: '',

    name: '',

    engine: '',

    model: '',

    prompt: '',

    response: '',

    prompt_id: '',

    ['jsonprompt']: '',

    ['jsonresponse']: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { promptresponses } = useAppSelector((state) => state.promptresponses);

  const { promptresponsesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: promptresponsesId }));
  }, [promptresponsesId]);

  useEffect(() => {
    if (typeof promptresponses === 'object') {
      setInitialValues(promptresponses);
    }
  }, [promptresponses]);

  useEffect(() => {
    if (typeof promptresponses === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = promptresponses[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [promptresponses]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: promptresponsesId, data }));
    await router.push('/promptresponses/promptresponses-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit promptresponses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit promptresponses'}
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

              <FormField label='Name' hasTextareaHeight>
                <Field name='name' id='name' component={RichTextField}></Field>
              </FormField>

              <FormField label='Engine' hasTextareaHeight>
                <Field
                  name='engine'
                  id='engine'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Model' hasTextareaHeight>
                <Field
                  name='model'
                  id='model'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Prompt' hasTextareaHeight>
                <Field
                  name='prompt'
                  id='prompt'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Response' hasTextareaHeight>
                <Field
                  name='response'
                  id='response'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Prompt Id' labelFor='prompt_id'>
                <Field
                  name='prompt_id'
                  id='prompt_id'
                  component={SelectField}
                  options={initialValues.prompt_id}
                  itemRef={'prompts'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='Jsonprompt'>
                <Field name='jsonprompt' placeholder='Your Jsonprompt' />
              </FormField>

              <FormField label='Jsonresponse'>
                <Field name='jsonresponse' placeholder='Your Jsonresponse' />
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
                  onClick={() =>
                    router.push('/promptresponses/promptresponses-list')
                  }
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditPromptresponses.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditPromptresponses;
