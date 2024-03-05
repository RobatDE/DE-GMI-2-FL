import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TablePositions from '../../components/Positions/TablePositions';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import ButtonsBase from '../../components/ButtonsBase';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/users/usersSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { colors } from '@mui/material';
import { Textarea } from '@material-tailwind/react';

const TablesPage = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [filterItems, setFilterItems] = useState([]);
  const [showTable, setShowTable] = useState(true);

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/users/users-list');
  };
  const [filters] = useState([
    { label: 'Title', title: 'title' },
    { label: 'Code', title: 'code' },
  ]);
  const addFilter = () => {
    const newItem = {
      id: uniqueId(),
      fields: {
        filterValue: '',
        filterValueFrom: '',
        filterValueTo: '',
        selectedField: '',
      },
    };
    newItem.fields.selectedField = filters[0].title;
    setFilterItems([...filterItems, newItem]);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Persona'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox className='mb-6'>
          <BaseButton
            className={'mr-3 btn-xs'}
            variant='contained'
            label='Select Occupation'
            color='info'
            onClick={() => setShowTable(!showTable)}
          >           
          </BaseButton>
          <div >
          Occupation: Nurse Code: fdssdf
          </div>
        </CardBox>
        {showTable && (
        <CardBox className='mb-6' hasTable>
          <TablePositions
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
          />
          </CardBox>  
        )}
        <CardBox>
          <Formik
            initialValues={{
              firstName: '',

              lastName: '',

              phoneNumber: '',

              email: '',

              role: '',

              disabled: false,

              avatar: [],
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Persona Title' />
              </FormField>

              <FormField label='Description'>
                <Field name='Description' placeholder='Description' />
              </FormField>

              <FormField label='Phone Number'>
                <Field name='phoneNumber' placeholder='Your Phone Number' />
              </FormField>

              <FormField label='E-Mail'>
                <Field name='email' placeholder='Your E-Mail' />
              </FormField>

              <FormField label='Role'>
                <FormCheckRadioGroup>
                  <FormCheckRadio type='radio' label='admin'>
                    <Field type='radio' name='role' value='admin' />
                  </FormCheckRadio>

                  <FormCheckRadio type='radio' label='user'>
                    <Field type='radio' name='role' value='user' />
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
                  path={'users/avatar'}
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
                  onClick={() => router.push('/users/users-list')}
                />
              </ButtonsBase>
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
