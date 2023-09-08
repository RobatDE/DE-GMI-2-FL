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
      field: 'event_type',
      headerName: 'Event Type',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'event_order',
      headerName: 'Event Order',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'number',
    },

    {
      field: 'properties',
      headerName: 'Properties',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'trigger_date',
      headerName: 'Trigger Date',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.trigger_date),
    },

    {
      field: 'trigger_interval',
      headerName: 'Trigger Interval',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'number',
    },

    {
      field: 'trigger_interval_unit',
      headerName: 'Trigger Interval Unit',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'trigger_hour',
      headerName: 'Trigger Hour',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.trigger_hour),
    },

    {
      field: 'trigger_restricted_start_hour',
      headerName: 'Trigger Restricted Start Hour',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.trigger_restricted_start_hour),
    },

    {
      field: 'trigger_restricted_stop_hour',
      headerName: 'Trigger Restricted Stop Hour',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.trigger_restricted_stop_hour),
    },

    {
      field: 'trigger_restricted_dow',
      headerName: 'Trigger Restricted Dow',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'trigger_mode',
      headerName: 'Trigger Mode',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'decision_path',
      headerName: 'Decision Path',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'temp_id',
      headerName: 'Temp Id',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'channel',
      headerName: 'Channel',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
    },

    {
      field: 'channel_id',
      headerName: 'Channel Id',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'number',
    },

    {
      field: 'event',
      headerName: 'Event',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: true,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('events'),
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
