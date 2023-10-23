import { WrapPromise } from "@/types";

function wrapPromise(promise: Promise<Array<any> | Object>): WrapPromise {
  let status: string = 'pending';
  let response: Object | string;

  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    },
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

export default wrapPromise;
