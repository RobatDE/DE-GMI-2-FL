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

import { update, fetch } from '../../stores/categories/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCategories = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    is_published: false,

    date_added: new Date(),

    created_by_user: '',

    date_modified: new Date(),

    modified_by_user: '',

    checked_out: new Date(),

    checked_out_by_user: '',

    ['title']: '',

    description: '',

    ['alias']: '',

    ['color']: '',

    ['bundle']: '',

    project: '',

    checked_out_by: '',

    category: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { categories } = useAppSelector((state) => state.categories);

  const { categoriesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: categoriesId }));
  }, [categoriesId]);

  useEffect(() => {
    if (typeof categories === 'object') {
      setInitialValues(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (typeof categories === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = categories[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [categories]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: categoriesId, data }));
    await router.push('/categories/categories-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit categories')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit categories'}
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
                  options={initialValues.project}
                  itemRef={'projects'}
                  showField={'id'}
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
                  options={initialValues.category}
                  itemRef={'categories'}
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
                  onClick={() => router.push('/categories/categories-list')}
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCategories.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditCategories;
