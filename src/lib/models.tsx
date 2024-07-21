export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  is_published: boolean;
  detail: string;
  synopsis: string;
  category : string;
  image: string;
}

export interface Menu {
  id: number;
  name: string;
  price: number;
  menuImage: string;
}