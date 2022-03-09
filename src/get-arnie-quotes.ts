import { httpGet } from './mock-http-interface';

// TODO define this type properly
type TResult = { [key: string]: string }

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  // TODO: Implement this function.

  return await Promise.all(urls.map(async (item: string): Promise<TResult> => {
    const result = await httpGet(item)

    if (result.status === 200) {
      return { 'Arnie Quote': JSON.parse(result.body).message }
    } else {
      return { 'FAILURE': JSON.parse(result.body).message }
    }
  }))

};
