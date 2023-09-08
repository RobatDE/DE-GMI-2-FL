import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.firstName;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.firstName };
    });
  },
  usersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.firstName, id: val.id };
  },

  categoriesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  categoriesOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  categoriesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  categoriesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  channelsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  channelsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  channelsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  channelsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  companiesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  companiesOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  companiesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  companiesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  programsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  programsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  programsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  programsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  campaignsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  campaignsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  campaignsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  campaignsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  projectsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  projectsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  projectsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  projectsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  eventsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  eventsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  eventsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  eventsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  tasksManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  tasksOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  tasksManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  tasksOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  teamsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  teamsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  teamsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  teamsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  marketsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  marketsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  marketsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  marketsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  organizationsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  organizationsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  organizationsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  organizationsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  promptsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  promptsOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  promptsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  promptsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },

  team_membersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.id);
  },
  team_membersOneListFormatter(val) {
    if (!val) return '';
    return val.id;
  },
  team_membersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.id };
    });
  },
  team_membersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.id, id: val.id };
  },
};
