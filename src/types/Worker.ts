export interface Favorite {
  color: string;
  food: string;
  random_string: string;
  song: string;
}

export interface Worker {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  image: string;
  gender: string;
  profession: string;
  email?: string;
  country?: string;
  height?: number;
  favorite?: Favorite;
}
