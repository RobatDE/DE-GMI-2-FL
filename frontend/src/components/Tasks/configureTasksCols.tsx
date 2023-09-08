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
      field: 'team_member',
      headerName: 'Team Member',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('team_members'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'project',
      headerName: 'Project',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('projects'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'starttime',
      headerName: 'Starttime',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.starttime),
    },

    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'number',
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'number',
    },

    {
      field: 'owner',
      headerName: 'Owner',
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
      field: 'task',
      headerName: 'Task',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('tasks'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
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