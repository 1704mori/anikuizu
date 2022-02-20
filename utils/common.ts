export const fetcher = async <T = any>(url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Yo that's NOT OK!!!");
  }
  const data: T = await res.json();
  return data;
};
