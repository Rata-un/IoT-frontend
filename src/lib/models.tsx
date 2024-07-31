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

export interface OrderItem {
  id: number;
  order_id: number;
  menu_id: number;
  quantity: number;
  price: number;
  total_price: number;
  menu: Menu; 
}

export interface Order {
  id: number;
  date: string;
  description: string;
  total_price: number;
  order_items: OrderItem[];
}
