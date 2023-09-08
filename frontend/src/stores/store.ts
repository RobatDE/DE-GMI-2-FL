import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from './users/usersSlice';
import assetsSlice from './assets/assetsSlice';
import categoriesSlice from './categories/categoriesSlice';
import channelsSlice from './channels/channelsSlice';
import companiesSlice from './companies/companiesSlice';
import programsSlice from './programs/programsSlice';
import campaignsSlice from './campaigns/campaignsSlice';
import projectsSlice from './projects/projectsSlice';
import eventsSlice from './events/eventsSlice';
import tasksSlice from './tasks/tasksSlice';
import teamsSlice from './teams/teamsSlice';
import marketsSlice from './markets/marketsSlice';
import opportunitiesSlice from './opportunities/opportunitiesSlice';
import organizationsSlice from './organizations/organizationsSlice';
import promptsSlice from './prompts/promptsSlice';
import team_membersSlice from './team_members/team_membersSlice';
import promptresponsesSlice from './promptresponses/promptresponsesSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

    users: usersSlice,
    assets: assetsSlice,
    categories: categoriesSlice,
    channels: channelsSlice,
    companies: companiesSlice,
    programs: programsSlice,
    campaigns: campaignsSlice,
    projects: projectsSlice,
    events: eventsSlice,
    tasks: tasksSlice,
    teams: teamsSlice,
    markets: marketsSlice,
    opportunities: opportunitiesSlice,
    organizations: organizationsSlice,
    prompts: promptsSlice,
    team_members: team_membersSlice,
    promptresponses: promptresponsesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
