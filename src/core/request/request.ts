import 'whatwg-fetch';
import extend from 'extend';
import { stringify } from 'query-string';
import compose from './compose';
import { isAbsoluteUrl } from './utils';

/**
 * Enhanced Fetch Api
 */
class Request {
  public static defaults = {
    baseUrl: '',
    method: 'GET',
    headers: {},
    params: {},
  };
  public middlewares: any[];

  constructor(options: any, middlewares: any[]) {
    this.options = extend(true, {}, Request.defaults, options);
    this.middlewares = [...middlewares].reverse();
  }

  public use(fn: any) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be a function!');
    }

    this.middlewares.unshift(fn);
  }

  public createContext(url: any, options: any) {
    const context = { url };
    extend(true, context, this.options, options);
    return context;
  }

  public applyFetch({ url, params, baseUrl, ...options }) {
    if (typeof url !== 'string') {
      throw new TypeError(`Parameter 'url' must be a string, not ${typeof url}`);
    }

  // tslint:disable-next-line:variable-name
    const _baseUrl = isAbsoluteUrl(url) ? '' : baseUrl; // eslint-disable-line
    const queryString = stringify(params);
    const concatSymbol = url.indexOf('?') > -1 ? '&' : '?';

    return fetch(`${_baseUrl}${url}${queryString && (concatSymbol + queryString)}`, options);
  }

  public fetch(url: string, options: any) {
    const fn = compose(this.middlewares);
    const context = this.createContext(url, options);
    return fn(context, this.applyFetch);
  }

  public head(url: string, options: any) {
    return this.fetch(url, { ...options, method: 'HEAD' });
  }

  public options(url: string, options: any) {
    return this.fetch(url, { ...options, method: 'OPTIONS' });
  }

  public get(url: string, options: any) {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  public delete(url: string, options: any) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }

  public post(url: string, payload: any, options: any) {
    return this.fetch(url, { ...options, method: 'POST', body: payload });
  }

  public put(url: string, payload: any, options: any) {
    return this.fetch(url, { ...options, method: 'PUT', body: payload });
  }
}

export default Request;
