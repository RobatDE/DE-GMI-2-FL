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

import { create } from '../../stores/companies/companiesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const TablesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/companies/companies-list');
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
              owner: '',

              is_published: false,

              date_added: '',

              created_by_user: '',

              date_modified: '',

              modified_by_user: '',

              checked_out: '',

              checked_out_by: '',

              checked_out_by_user: '',

              social_cache: '',

              score: '',

              companyemail: '',

              companyaddress1: '',

              companyaddress2: '',

              companyphone: '',

              companycity: '',

              companystate: '',

              companyzipcode: '',

              companycountry: '',

              companyname: '',

              companywebsite: '',

              companyindustry: '',

              companydescription: '',

              companynumber_of_employees: '',

              companyfax: '',

              companyannual_revenue: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Owner' labelFor='owner'>
                <Field
                  name='owner'
                  id='owner'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
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
                <Field
                  type='datetime-local'
                  name='date_added'
                  placeholder='Your Date Added'
                />
              </FormField>

              <FormField label='Created By User' labelFor='created_by_user'>
                <Field
                  name='created_by_user'
                  id='created_by_user'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Date Modified'>
                <Field
                  type='datetime-local'
                  name='date_modified'
                  placeholder='Your Date Modified'
                />
              </FormField>

              <FormField label='Modified By User' labelFor='modified_by_user'>
                <Field
                  name='modified_by_user'
                  id='modified_by_user'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Checked Out'>
                <Field
                  type='datetime-local'
                  name='checked_out'
                  placeholder='Your Checked Out'
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
                  options={[]}
                  itemRef={'users'}
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

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TablesPage;
