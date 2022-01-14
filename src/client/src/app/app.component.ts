import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { ApiService } from './services/api.service';
import { SocketioService } from './services/socket.service';
import { createUser, loadUsers, selectUserAction} from './store/actions/user/user.actions';
import { allUsersSelector, selectAllEntities, selectAllIds, selectAllTotal, selectedUserIdSelector, selectedUserSelector, usersSelector } from './store/selectors/user/user.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'client';

  selectedUser$: Observable<any>;

  users$: any;
  constructor(
    private socketService: SocketioService,
    public api: ApiService,
    private store: Store<any>,
    ) {

      this.users$ = this.store.select(allUsersSelector);
      this.selectedUser$ = this.store.select(selectedUserSelector);
    }

  ngOnInit() {

    this.store.dispatch(createUser({data: {name: 'user1', username: 'user1', email: 'user1@user1.com'}}));
    this.store.dispatch(loadUsers());
    this.socketService.getMessage().subscribe(message => { console.log(message); });
  }

  selectUser(user: User) {
    console.log('user', user)
    this.store.dispatch(selectUserAction({data: user}))
  }
}


