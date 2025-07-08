export interface Favorite {
  color: string;
  food: string;
  randomString: string;
  song: string;
}

export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  gender: string;
  profession: string;
  email?: string;
  country?: string;
  height?: number;
  favorite?: Favorite;
}
