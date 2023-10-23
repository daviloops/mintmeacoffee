import wrapPromise from '@/data/wrapPromise';

function fetchData(url: string, props: Object) {
  const promise = fetch(url, props)
    .then((res) => res.json())
    .then((res) => res.data);

  return wrapPromise(promise);
}

export default fetchData;
