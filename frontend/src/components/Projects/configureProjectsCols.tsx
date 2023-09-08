import React from 'react';
import BaseIcon from '../BaseIcon';
import { mdiEye, mdiTrashCan, mdiPencilOutline } from '@mdi/js';
import axios from 'axios';
import {
  GridActionsCellItem,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import ImageField from '../ImageField';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import DataGridMultiSelect from '../DataGridMultiSelect';

type Params = (id: string) => void;

export const loadColumns = async (
  onDelete: Params,
  onView: Params,
  onEdit: Params,
) => {
  async function callOptionsApi(entityName: string) {
    const data = await axios(`/${entityName}/autocomplete?limit=100`);
    return data.data;
  }

  return [
    {
      field: 'campaing',
      headerName: 'Campaing',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('campaigns'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'team',
      headerName: 'Team',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('teams'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'date_added',
      headerName: 'Date Added',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.date_added),
    },

    {
      field: 'created_by_user',
      headerName: 'Created By User',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('users'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'date_modified',
      headerName: 'Date Modified',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.date_modified),
    },

    {
      field: 'modified_by',
      headerName: 'Modified By',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'number',
    },

    {
      field: 'modified_by_user',
      headerName: 'Modified By User',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('users'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'public_on',
      headerName: 'Public On',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.public_on),
    },

    {
      field: 'start_on',
      headerName: 'Start On',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.start_on),
    },

    {
      field: 'end_on',
      headerName: 'End On',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.end_on),
    },

    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 130,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={1}
          icon={<BaseIcon path={mdiEye} size={24} />}
          onClick={() => onView(params?.row?.id)}
          label='Watch'
        />,
        <GridActionsCellItem
          key={1}
          icon={<BaseIcon path={mdiPencilOutline} size={24} />}
          onClick={() => onEdit(params?.row?.id)}
          label='Edit'
        />,
        <GridActionsCellItem
          key={2}
          icon={<BaseIcon path={mdiTrashCan} size={24} />}
          onClick={() => onDelete(params?.row?.id)}
          label='Delete'
        />,
      ],
    },
  ];
};
