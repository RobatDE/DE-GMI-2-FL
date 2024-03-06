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
  const [selectedposition, setSelectedPosition] = useState();

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
          {selectedposition}
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
        </CardBox>
        {showTable && (
        <CardBox className='mb-6' hasTable>
          <TablePositions
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            setSelectedPosition={setSelectedPosition}
            closeTable={() => setShowTable(!showTable)}
          />
          </CardBox>  
        )}
        <CardBox>
          <Formik
            initialValues={{
              title: '',
              description: '',
              occupation: '',
              educationlevel: '',
              incomerange: '',
              religion: '',
              income: '',
              disabled: false,
              avatar: [],
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            
            <Form>
            <div>
            <FormField label='Position'>
                <Field name='position' placeholder='Position' value={selectedposition} />
            </FormField>
              <FormField label='Title'>
                <Field name='title' placeholder='Persona Title' />
              </FormField>
              <FormField label='Description'>
                <Field name='Description' placeholder='Description' />
              </FormField>
              <FormField label='Gender'>
                <Field name='Gender' placeholder='Gender' />
              </FormField>
              <FormField label='GenderIdentity'>
                <Field name='GenderIdentity' placeholder='GenderIdentity' />
              </FormField>
              <FormField label='Occupation'>
                <Field name='Occupation' placeholder='Occupation' />
              </FormField>
              <FormField label='EducationLevel'>
                <Field name='EducationLevel' placeholder='EducationLevel' />
              </FormField>
              <FormField label='IncomeRange'>
                <Field name='IncomeRange' placeholder='IncomeRange' />
              </FormField>
              <FormField label='Age'>
                <Field name='age' placeholder='Age' />
              </FormField>
              <FormField label='MaritalStatus'>
                <Field name='MaritalStatus' placeholder='MaritalStatus' />
              </FormField>
              <FormField label='EmploymentType'>
                <Field name='EmploymentType' placeholder='EmploymentType' />
              </FormField>
              <FormField label='Household Composition'>
                <Field name='HouseholdComposition' placeholder='HouseholdComposition' />
              </FormField>
              <FormField label='Religion'>
                <Field name='Religion' placeholder='Religion' />
              </FormField>
              </div>
              <div>
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
              <FormField label='Communications'>
                <Field name='Communications' placeholder='Communications' />
              </FormField>
              <FormField label='Motives'>
                <Field name='Motives' placeholder='Motives' />
              </FormField>
              </div>
              <div>
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
              </div>
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
