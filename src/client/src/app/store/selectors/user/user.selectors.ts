import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromUser from '../../reducers/user/user.reducer';

const { selectAll, selectEntities, selectIds, selectTotal } = fromUser.userAdapter.getSelectors();

const userFeatureSelector = createFeatureSelector<fromUser.State>(fromUser.userFeatureKey);

export const usersSelector = selectEntities;

export const allUsersSelector = createSelector(
  userFeatureSelector,
  selectAll
);

export const selectedUserIdSelector = createSelector(
  userFeatureSelector,
  (state) => state.selectedUserId
)

export const selectAllEntities = createSelector(
  userFeatureSelector,
  selectEntities
);

export const selectAllIds = createSelector(
  userFeatureSelector,
  selectIds
);

export const selectAllTotal = createSelector(
  userFeatureSelector,
  selectTotal
);



export const selectedUserSelector = createSelector(
  selectAllEntities,
  selectedUserIdSelector,
  (entities, selectedUserId) => {
    console.log(entities, selectedUserId);
    return selectedUserId ? entities[selectedUserId] : undefined;
  }
)


