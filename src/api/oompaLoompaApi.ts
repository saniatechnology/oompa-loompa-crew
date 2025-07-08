import { toCamelCaseWorker } from "../utils/camelCaseWorker";

export async function fetchOompaLoompas(page: number) {
  const res = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data.results.map(toCamelCaseWorker);
}

export async function fetchOompaLoompaById(id: number) {
  const res = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return toCamelCaseWorker(data);
}
