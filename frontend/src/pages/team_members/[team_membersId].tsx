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

import { update, fetch } from '../../stores/team_members/team_membersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditTeam_members = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    team: '',

    user: '',

    name: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { team_members } = useAppSelector((state) => state.team_members);

  const { team_membersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: team_membersId }));
  }, [team_membersId]);

  useEffect(() => {
    if (typeof team_members === 'object') {
      setInitialValues(team_members);
    }
  }, [team_members]);

  useEffect(() => {
    if (typeof team_members === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = team_members[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [team_members]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: team_membersId, data }));
    await router.push('/team_members/team_members-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit team_members')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit team_members'}
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

              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Name' hasTextareaHeight>
                <Field name='name' id='name' component={RichTextField}></Field>
              </FormField>

              <FormField label='Organization' labelFor='organization'>
                <Field
                  name='organization'
                  id='organization'
                  component={SelectField}
                  options={initialValues.organization}
                  itemRef={'organizations'}
                  showField={'name'}
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
                  onClick={() => router.push('/team_members/team_members-list')}
                />
              </ButtonsBase>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditTeam_members.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditTeam_members;
