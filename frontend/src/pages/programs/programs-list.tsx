import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TablePrograms from '../../components/Programs/TablePrograms';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import { useAppDispatch } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import { setRefetch, uploadCsv } from '../../stores/programs/programsSlice';

const ProgramsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: 'Name', title: 'name' },
    { label: 'Description', title: 'description' },
    { label: 'Goal', title: 'goal' },
    { label: 'Allow Restart', title: 'allow_restart', number: 'true' },

    { label: 'Date Added', title: 'date_added', date: 'true' },
    { label: 'Date Modified', title: 'date_modified', date: 'true' },
    { label: 'Start Date', title: 'start_date', date: 'true' },
    { label: 'End Date', title: 'end_date', date: 'true' },
    { label: 'Company', title: 'company' },
    { label: 'Created By User', title: 'created_by_user' },
    { label: 'Modified By User', title: 'modified_by_user' },
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

  const getProgramsCSV = async () => {
    const response = await axios({
      url: '/programs?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'programsCSV.csv';
    link.click();
  };

  const onModalConfirm = async () => {
    if (!csvFile) return;
    await dispatch(uploadCsv(csvFile));
    dispatch(setRefetch(true));
    setCsvFile(null);
    setIsModalActive(false);
  };

  const onModalCancel = () => {
    setCsvFile(null);
    setIsModalActive(false);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Programs')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Programs Table'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox className='mb-6'>
          <BaseButton
            className={'mr-3'}
            href={'/programs/programs-new'}
            color='info'
            label='New Item'
          />
          <BaseButton
            className={'mr-3'}
            color='info'
            label='Add Filter'
            onClick={addFilter}
          />
          <BaseButton
            className={'mr-3'}
            color='info'
            label='Download CSV'
            onClick={getProgramsCSV}
          />
          <BaseButton
            color='info'
            label='Upload CSV'
            onClick={() => setIsModalActive(true)}
          />
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TablePrograms
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title='Upload CSV'
        buttonColor='info'
        buttonLabel={'Confirm'}
        // buttonLabel={false ? 'Deleting...' : 'Confirm'}
        isActive={isModalActive}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      >
        <DragDropFilePicker
          file={csvFile}
          setFile={setCsvFile}
          formats={'.csv'}
        />
      </CardBoxModal>
    </>
  );
};

ProgramsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ProgramsTablesPage;
