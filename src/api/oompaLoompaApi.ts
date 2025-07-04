export async function fetchOompaLoompas(page: number) {
  const res = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
