export class Category {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  expensesIds?: string[];
  userId: string;
}
