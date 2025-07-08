interface FavoriteSnake {
  color: string;
  food: string;
  random_string: string;
  song: string;
}

interface WorkerSnake {
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
  favorite?: FavoriteSnake;
}

export function toCamelCaseWorker(worker: WorkerSnake) {
  return {
    id: worker.id,
    firstName: worker.first_name,
    lastName: worker.last_name,
    age: worker.age,
    image: worker.image,
    gender: worker.gender,
    profession: worker.profession,
    email: worker.email,
    country: worker.country,
    height: worker.height,
    favorite: worker.favorite
      ? {
          color: worker.favorite.color,
          food: worker.favorite.food,
          randomString: worker.favorite.random_string,
          song: worker.favorite.song,
        }
      : undefined,
  };
}
