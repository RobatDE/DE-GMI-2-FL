import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableAssets from '../../components/Assets/TableAssets';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import { useAppDispatch } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import { setRefetch, uploadCsv } from '../../stores/assets/assetsSlice';

const AssetsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: 'Title', title: 'title' },
    { label: 'Description', title: 'description' },
    { label: 'Alias', title: 'alias' },
    { label: 'Storage Location', title: 'storage_location' },
    { label: 'Path', title: 'path' },
    { label: 'Url', title: 'url' },
    { label: 'Remote Path', title: 'remote_path' },
    { label: 'Original File Name', title: 'original_file_name' },
    { label: 'Lang', title: 'lang' },
    { label: 'Extension', title: 'extension' },
    { label: 'Mime', title: 'mime' },
    { label: 'Download Count', title: 'download_count', number: 'true' },
    {
      label: 'Unique Download Count',
      title: 'unique_download_count',
      number: 'true',
    },
    { label: 'Revision', title: 'revision', number: 'true' },
    { label: 'Size', title: 'size', number: 'true' },

    { label: 'Date Added', title: 'date_added', date: 'true' },
    { label: 'Date Modified', title: 'date_modified', date: 'true' },
    { label: 'Checked Out', title: 'checked_out', date: 'true' },
    { label: 'Publish Up', title: 'publish_up', date: 'true' },
    { label: 'Publish Down', title: 'publish_down', date: 'true' },
    { label: 'Project', title: 'project' },
    { label: 'Category', title: 'category' },
    { label: 'Created By User', title: 'created_by_user' },
    { label: 'Checked Out By User', title: 'checked_out_by_user' },
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

  const getAssetsCSV = async () => {
    const response = await axios({
      url: '/assets?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'assetsCSV.csv';
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
        <title>{getPageTitle('Assets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Assets Table'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox className='mb-6'>
          <BaseButton
            className={'mr-3'}
            href={'/assets/assets-new'}
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
            onClick={getAssetsCSV}
          />
          <BaseButton
            color='info'
            label='Upload CSV'
            onClick={() => setIsModalActive(true)}
          />
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TableAssets
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

AssetsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default AssetsTablesPage;
