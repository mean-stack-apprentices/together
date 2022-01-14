import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createUserSuccess, deleteUserSuccess, loadUsers, loadUsersSuccess, selectUserAction, updateUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State extends EntityState<User> {

  selectedUserId: string;
}



export const userAdapter = createEntityAdapter<User>(
  {
    selectId: selectUserId,
  }
);

export const initialState: State = userAdapter.getInitialState({
  // additional entity state properties
  selectedUserId: '',
});
export function selectUserId(a: User): string {
  //In this case this would be optional since primary key is id
  return a._id || '';
}


export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => {
    return userAdapter.setAll(action.data, state);
  }),
  on(selectUserAction, (state, action) => {
    return { ...state, selectedUserId: `${action.data?._id}` }
  }),
  on(updateUserSuccess, (state, action) => {
    return userAdapter.updateOne({id: `${action.data._id}`, changes: action.data}, state);
  }),
  on(deleteUserSuccess, (state, action) => userAdapter.removeOne(`${action?.data._id}`, state)),
  on(createUserSuccess, (state, action) => {
    return userAdapter.addOne(action.data, state)
  })
);

