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

import { update, fetch } from '../../stores/assets/assetsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditAssets = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    project: '',

    category: '',

    is_published: false,

    date_added: new Date(),

    created_by_user: '',

    date_modified: new Date(),

    checked_out: new Date(),

    checked_out_by_user: '',

    ['title']: '',

    description: '',

    ['alias']: '',

    ['storage_location']: '',

    ['path']: '',

    ['url']: '',

    remote_path: '',

    original_file_name: '',

    ['lang']: '',

    publish_up: new Date(),

    publish_down: new Date(),

    download_count: '',

    unique_download_count: '',

    revision: '',

    ['extension']: '',

    ['mime']: '',

    size: '',

    disallow: false,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { assets } = useAppSelector((state) => state.assets);

  const { assetsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: assetsId }));
  }, [assetsId]);

  useEffect(() => {
    if (typeof assets === 'object') {
      setInitialValues(assets);
    }
  }, [assets]);

  useEffect(() => {
    if (typeof assets === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = assets[el]));

      setInitialValues(newInitialVal);
    }
  }, [assets]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: assetsId, data }));
    await router.push('/assets/assets-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit assets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit assets'}
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
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/assets/assets-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditAssets.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditAssets;
