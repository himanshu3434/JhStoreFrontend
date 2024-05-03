import { ChangeEvent } from "react";

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

export type filterHandler =
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLInputElement>;

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  categoryName: string;
  coverPhoto: string;
  photo1: string;
  photo2: string;
  photo3: string;
  createdAt: Date;
  updatedAt: Date;
}

export type productProps = {
  productDetails: IProduct;
};
