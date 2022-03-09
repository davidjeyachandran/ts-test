import { httpGet } from './mock-http-interface';

type TResult = { [key: string]: string }

/**
 * Executes a HTTP GET request on each of the URLs, transforms each of the
 *     HTTP responses according to the challenge instructions and returns the results.
 * @param {string[]} urls - The urls to be requested 
 * @returns {Promise} - A promise which resolves to a results array
 */
export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {

  if (urls.length === 0) {
    // TODO - I'm not sure how we want to handle errors
    throw new Error('Your request has been terminated. urls cannot be an empty array.')
  }

  return await Promise.all(urls.map(async (item: string): Promise<TResult> => {
    const result = await httpGet(item)
    const msg = JSON.parse(result.body).message

    return (result.status === 200) ? { 'Arnie Quote': msg } : { 'FAILURE': msg }

  }))

};
