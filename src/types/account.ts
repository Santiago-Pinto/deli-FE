export interface AccountForm {
  email: string;
  fullName: string;
  age: string;
  userName: string;
  country: string;
}

export interface AccountFormInputs {
  email: AccountFormInput;
  fullName: AccountFormInput;
  age: AccountFormInput;
  userName: AccountFormInput;
}

export interface AccountFormInput {
  name: string;
  type: string;
  header: string;
  validate: (value: string) => string;
}
