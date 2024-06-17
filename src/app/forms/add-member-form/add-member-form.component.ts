import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonResponse } from '../../models/auth/auth';
import { GroupService } from '../../services/group.service';
import { HubService } from '../../services/hub.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-member-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-member-form.component.html',
  styleUrl: './add-member-form.component.css'
})
export class AddMemberFormComponent implements OnInit{
  users: PersonResponse[] = [];
  @Output() closeForm = new EventEmitter<void>();
  selectedUserId: number[] = [];
  @Input() groupId: number = 0;
  message: string = "";
  name: string = "";
  isSelected: boolean = false;
  subscribed: boolean = false;
  constructor(private groupHub: GroupService, private hubService: HubService) {
  }
  async ngOnInit(): Promise<void> {
      if (await this.hubService.getGroupPromiseStart() !== null) {
          if (!this.subscribed) {
              await this.groupHub.subscribeUsers();
              this.groupHub.users$.subscribe((users: PersonResponse[]) => {
                  this.users = users;
              });

              await this.groupHub.getUsers(this.groupId);
              this.subscribed = true;
          }
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

  async joinToGroup() {
      await this.selectedUserId.forEach(async id => {
          await this.groupHub.joinPersonToGroup(this.groupId, id);
      });
      await this.groupHub.getGroupMembers(this.groupId);
      this.close();
  }
}
