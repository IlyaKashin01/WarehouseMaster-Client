import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonResponse } from '../models/auth/auth';
import { GroupParams } from '../models/group/group';

export class PersonalDialog {
  constructor(
    public id:number,
    public name:string,
    public avatar:string
  ){}
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private tokenSubject = new BehaviorSubject<string>('');
  private personSubject = new BehaviorSubject<PersonResponse>(new PersonResponse(0, "", "", "", "", "", ""));
  private recipientIdSubject = new BehaviorSubject<number>(0);
  public recipientId$ = this.recipientIdSubject.asObservable();
  private resetLoginSubject = new BehaviorSubject<string>("");
  public resetLogin$ = this.resetLoginSubject.asObservable();
  private warehouseIdSubject = new BehaviorSubject<number>(0);
  public warehouseId$ = this.warehouseIdSubject.asObservable();
  public dialogNameSubject = new BehaviorSubject<string>('');
  public dialogName$ = this.dialogNameSubject.asObservable();
  public dialogSubject = new BehaviorSubject<PersonalDialog>(new PersonalDialog(0, "", ""));
  public dialog$ = this.dialogSubject.asObservable();
  public groupParamsSubject = new BehaviorSubject<GroupParams>(new GroupParams("",0,0,"","",[]));
  public groupParams$ = this.groupParamsSubject.asObservable();
  private hideCounterKeySubject = new BehaviorSubject<number>(0);
  public hideCounterKey$ = this.hideCounterKeySubject.asObservable();
  setToken(token: string) {
    this.tokenSubject.next(token);
  }
  getToken() {
    return this.tokenSubject.getValue();
  }
  setPerson(person: PersonResponse) {
    this.personSubject.next(person);
  }
  getPerson() {
    return this.personSubject.getValue();
  }
  setRecipientId(recipientId: number) {
    this.recipientIdSubject.next(recipientId);
  }
  setWarehouseId(warehouseId: number) {
    this.warehouseIdSubject.next(warehouseId);
  }
  getWarehouseId(){
    return this.warehouseIdSubject.getValue();
  }
  setResetLogin(login: string) {
    this.resetLoginSubject.next(login);
  }
  getGetResetLogin(){
    return this.resetLoginSubject.getValue();
  }
  setDialogName(name: string) {
    this.dialogNameSubject.next(name);
  }
  setDialog(id:number, name: string, avatar: string) {
    this.dialogSubject.next(new PersonalDialog(id, name, avatar));
  }
  setGroupParams(params: GroupParams) {
    this.groupParamsSubject.next(params);
  }
  setHideCounterKey(key: number){
    this.hideCounterKeySubject.next(key);
  }
}
