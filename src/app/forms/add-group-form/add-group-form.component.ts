import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonResponse } from '../../models/auth/auth';
import { GroupService } from '../../services/group.service';
import { HubService } from '../../services/hub.service';
import { Dialog } from '../../models/common/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-group-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-group-form.component.html',
  styleUrl: './add-group-form.component.css'
})
export class AddGroupFormComponent implements OnInit{
  users: PersonResponse[] = [];
  @Output() closeForm = new EventEmitter<void>();
  dialog: Dialog = new Dialog(0,"", "","", false, new Date(), 0, "", false, 0, "");
  selectedUserId: number[] = [];
  message: string = "";
  name: string = "";
  isSelected: boolean = false;
  isCreated: boolean = false;
  constructor(private groupHub: GroupService, private hubService: HubService) {
  }
  async ngOnInit(): Promise<void> {
      if (await this.hubService.getGroupPromiseStart() !== null) {
          await this.groupHub.subscribeUsers();
          this.groupHub.users$.subscribe((users: PersonResponse[]) => {
              this.users = users;
          });
          await this.groupHub.subscribeNewGroup();
          this.groupHub.newGroup$.subscribe((dialog: Dialog) => {
              this.dialog = dialog;
          });
      }
  }
  close() {
      this.closeForm.emit();
  }

  selectUser(user: PersonResponse) {
      this.selectedUserId.push(user.id);
      this.isSelected = true;
  }

  cancel() {
      this.message = "";
      this.close();
  }

  async create() {
      await this.groupHub.createGroup(this.name);
      await this.groupHub.getUsers(this.dialog.id);
      this.isCreated = true;
  }
  async joinToGroup() {
      console.log(this.dialog.id);
      
      await this.selectedUserId.forEach(async id => {
          await this.groupHub.joinPersonToGroup(this.dialog.id, id);
      });
      this.close();
  }
}
