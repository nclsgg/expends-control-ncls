export class User {
  id: string;
  email: string;
  password?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: String[];
  expenses?: String[];
}
