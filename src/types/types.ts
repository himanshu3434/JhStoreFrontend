export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  category_id: string;
  coverPhoto: string;
  photo1: string;
  photo2: string;
  photo3: string;
  createdAt: Date;
  updatedAt: Date;
}
