import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GroupService } from '../../services/group.service';
import { HubService } from '../../services/hub.service';
import { LeaveGroupRequest, MemberResponse } from '../../models/group/group';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-group-info-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './group-info-form.component.html',
  styleUrl: './group-info-form.component.css'
})
export class GroupInfoFormComponent implements OnInit{
  @Input() members: MemberResponse = new MemberResponse("", []);
  @Input() onlineMarkers: number[] = [];  
  @Input() personId: number = 0;
  @Input() groupId: number = 0;
  @Input() groupName: string = '';
  @Output() closeForm = new EventEmitter<void>();
  personName : string = this.dataService.getPerson().login;
  isSubsctibed: boolean = false;

  constructor( private dataService: DataService, private groupHub: GroupService, private hubService: HubService) {
  }
  async ngOnInit(): Promise<void> {
      if (this.hubService.getGroupPromiseStart !== null) {
          if (!this.isSubsctibed) {
              await this.groupHub.subscribeGroupMembers();
              this.groupHub.members$.subscribe((members: MemberResponse) => {
                  this.members = members;
              });
              await this.groupHub.getGroupMembers(this.groupId);
          }
      }
  }

  close() {
      this.closeForm.emit();
  }

  excludeMember(memberId: number, memberLogin: string, creatorLogin: string){
      this.groupHub.LeaveGroup(new LeaveGroupRequest(this.groupId, memberId, memberLogin, creatorLogin, true));
  }
}
