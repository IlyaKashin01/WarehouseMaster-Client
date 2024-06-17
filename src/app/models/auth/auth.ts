export class AuthResponse {
  constructor(
    public person: PersonResponse,
    public token: string
  ) { }
}

export class AuthRequest {
  constructor(
    public Login: string,
    public Password: string
  ) { }
}

export class SignUpRequest {
  constructor(
    public Login: string,
    public Password: string
  ) { }
}

export class PersonResponse {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public middleName: string,
    public login: string,
    public email: string,
    public avatar: string
  ) { }
}

export class CodeRequest {
  constructor (
    public login : string,
    public resetCode : number,
  ) {}
}

export class PassRequest {
  constructor (
    public login : string,
    public newPassword : string,
  ) {}
}

export class ResetRequest {
  constructor (
    public login : string,
  ) {}
}