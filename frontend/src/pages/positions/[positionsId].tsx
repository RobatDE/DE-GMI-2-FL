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

import { update, fetch } from '../../stores/personas/personasSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditUsers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    ['Name']: '',
    ['EducationLevel']: '',
    ['Occupation']: '',
    ['AgeRange']: '',
    ['Religion']: '',
    ['MaritalStatus']: '',
    ['Age']: '',
    ['Description']: '',
    ['Gender']:  '',
    ['GenderIdentity']:  '',
    ['IncomeRange']:  '',
    ['EmploymentType']:  '',
    ['HouseholdComposition']:  '',
    ['Income']: '',
    ['Nationality']:  '',
    ['Geography']:  '',
    ['Ethnicity']:  '',
    ['Race']: '',
    ['Language']:  '',

    role: '',
    disabled: false,
    avatar: [],

  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { personas } = useAppSelector((state) => state.personas);

  const { personasId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: personasId }));
  }, [personasId]);

  useEffect(() => {
    if (typeof personas === 'object') {
      setInitialValues(personas);
    }
  }, [personas]);

  useEffect(() => {
    if (typeof personas === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = personas[el]));

      setInitialValues(newInitialVal);
    }
  }, [personas]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: personasId, data }));
    console.log('saving personas...');
    console.dir(data);
    await router.push('/personas/personas-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit personas')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit personas'}
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
              <FormField label='Name'>
                <Field name='Name' placeholder='Persona Name' />
              </FormField>

              <FormField label='Description'>
                <Field name='Description' placeholder='Persona Description' />
              </FormField>

              <FormField label='Gender'>
                <Field name='Gender' placeholder='Gender' />
              </FormField>

              <FormField label='Gender Identity'>
                <Field name='GenderIdentity' placeholder='Gender Identity' />
              </FormField>

              <FormField label='Occupation'>
                <Field name='Occupation' placeholder='Career' />
              </FormField>

              <FormField label='EducationLevel'>
                <Field name='EducatonLevel' placeholder='Education' />
              </FormField>

              <FormField label='Income Range'>
                <Field name='IncomeRange' placeholder='Income range' />
              </FormField>

              <FormField label='Age'>
                <Field name='Age' placeholder='Age' />
              </FormField>

              <FormField label='MaritalStatus'>
                <Field name='MaritalStatus' placeholder='Marital Status' />
              </FormField>

              <FormField label='EmploymentType'>
                <Field name='EmploymentType' placeholder='Employment Type Status' />
              </FormField>

              <FormField label='HouseholdComposition'>
                <Field name='HouseholdComposition' placeholder='HouseholdComposition' />
              </FormField>

              <FormField label='Religion'>
                <Field name='Religion' placeholder='Religion' />
              </FormField>

              <FormField label='Income'>
                <Field name='Income' placeholder='Income' />
              </FormField>

              <FormField label='Nationality'>
                <Field name='Nationality' placeholder='Nationality' />
              </FormField>

              <FormField label='Geography'>
                <Field name='Geography' placeholder='Geography' />
              </FormField>

              <FormField label='Ethnicity'>
                <Field name='Ethnicity' placeholder='Ethnicity' />
              </FormField>

              <FormField label='Race'>
                <Field name='Race' placeholder='Race' />
              </FormField>

              <FormField label='Language'>
                <Field name='Language' placeholder='Language' />
              </FormField>

              <FormField label='PoliticalAffiliation'>
                <Field name='PoliticalAffiliation' placeholder='PoliticalAffiliation' />
              </FormField>

              <FormField label='HomeOwnership'>
                <Field name='HomeOwnership' placeholder='HomeOwnership' />
              </FormField>

              <FormField label='PersonalityDetails'>
                <Field name='PersonalityDetails' placeholder='PersonalityDetails' />
              </FormField>

              <FormField label='PositionDetails'>
                <Field name='PositionDetails' placeholder='PositionDetails' />
              </FormField>

              <FormField label='CommunicationsDetails'>
                <Field name='CommunicationsDetails' placeholder='CommunicationsDetails' />
              </FormField>

              <FormField label='MotivationsDetails'>
                <Field name='MotivationsDetails' placeholder='MotivationsDetails' />
              </FormField>

              <FormField label='Role'>
                <FormCheckRadioGroup>
                  <FormCheckRadio type='radio' label='position'>
                    <Field type='radio' name='role' value='admin' />
                  </FormCheckRadio>

                  <FormCheckRadio type='radio' label='persona'>
                    <Field type='radio' name='role' value='persona' />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>

              <FormField label='Disabled' labelFor='disabled'>
                <Field
                  name='disabled'
                  id='disabled'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField>
                <Field
                  label='Avatar'
                  color='info'
                  icon={mdiUpload}
                  path={'personas/avatar'}
                  name='avatar'
                  id='avatar'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
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
                  onClick={() => router.push('/personas/personas-list')}
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditUsers.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditUsers;
