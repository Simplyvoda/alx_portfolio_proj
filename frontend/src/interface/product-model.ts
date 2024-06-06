export interface IGetSearchResults {
  message: string;
  data: Data;
}

export interface Data {
  superMart: SuperMart[];
  ngMart: NgMart[];
}

export interface SuperMart {
  title: string;
  link: string;
  price: string;
  image: string;
}

export interface NgMart {
  title: string;
  link: string;
  price: string;
  image: string;
}

export interface IProduct {
  title: string;
  link: string;
  price: string;
  image: string;
  source: string;
}
