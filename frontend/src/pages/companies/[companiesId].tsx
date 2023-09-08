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

import { update, fetch } from '../../stores/companies/companiesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCompanies = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    owner: '',

    is_published: false,

    date_added: new Date(),

    created_by_user: '',

    date_modified: new Date(),

    modified_by_user: '',

    checked_out: new Date(),

    checked_out_by: '',

    checked_out_by_user: '',

    social_cache: '',

    score: '',

    ['companyemail']: '',

    ['companyaddress1']: '',

    ['companyaddress2']: '',

    ['companyphone']: '',

    ['companycity']: '',

    ['companystate']: '',

    ['companyzipcode']: '',

    ['companycountry']: '',

    ['companyname']: '',

    ['companywebsite']: '',

    ['companyindustry']: '',

    companydescription: '',

    companynumber_of_employees: '',

    ['companyfax']: '',

    companyannual_revenue: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { companies } = useAppSelector((state) => state.companies);

  const { companiesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: companiesId }));
  }, [companiesId]);

  useEffect(() => {
    if (typeof companies === 'object') {
      setInitialValues(companies);
    }
  }, [companies]);

  useEffect(() => {
    if (typeof companies === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = companies[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [companies]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: companiesId, data }));
    await router.push('/companies/companies-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit companies')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit companies'}
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

              <FormField label='Social Cache' hasTextareaHeight>
                <Field
                  name='social_cache'
                  id='social_cache'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Score'>
                <Field type='number' name='score' placeholder='Your Score' />
              </FormField>

              <FormField label='Companyemail'>
                <Field name='companyemail' placeholder='Your Companyemail' />
              </FormField>

              <FormField label='Companyaddress 1'>
                <Field
                  name='companyaddress1'
                  placeholder='Your Companyaddress 1'
                />
              </FormField>

              <FormField label='Companyaddress 2'>
                <Field
                  name='companyaddress2'
                  placeholder='Your Companyaddress 2'
                />
              </FormField>

              <FormField label='Companyphone'>
                <Field name='companyphone' placeholder='Your Companyphone' />
              </FormField>

              <FormField label='Companycity'>
                <Field name='companycity' placeholder='Your Companycity' />
              </FormField>

              <FormField label='Companystate'>
                <Field name='companystate' placeholder='Your Companystate' />
              </FormField>

              <FormField label='Companyzipcode'>
                <Field
                  name='companyzipcode'
                  placeholder='Your Companyzipcode'
                />
              </FormField>

              <FormField label='Companycountry'>
                <Field
                  name='companycountry'
                  placeholder='Your Companycountry'
                />
              </FormField>

              <FormField label='Companyname'>
                <Field name='companyname' placeholder='Your Companyname' />
              </FormField>

              <FormField label='Companywebsite'>
                <Field
                  name='companywebsite'
                  placeholder='Your Companywebsite'
                />
              </FormField>

              <FormField label='Companyindustry'>
                <Field
                  name='companyindustry'
                  placeholder='Your Companyindustry'
                />
              </FormField>

              <FormField label='Companydescription' hasTextareaHeight>
                <Field
                  name='companydescription'
                  id='companydescription'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Companynumber Of Employees'>
                <Field
                  type='number'
                  name='companynumber_of_employees'
                  placeholder='Your Companynumber Of Employees'
                />
              </FormField>

              <FormField label='Companyfax'>
                <Field name='companyfax' placeholder='Your Companyfax' />
              </FormField>

              <FormField label='Companyannual Revenue'>
                <Field
                  type='number'
                  name='companyannual_revenue'
                  placeholder='Your Companyannual Revenue'
                />
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
                  onClick={() => router.push('/companies/companies-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCompanies.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditCompanies;
