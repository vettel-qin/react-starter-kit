import Request from './request';
import * as middleware from './middleware';

export { Request };
export { middleware };
export default new Request({
  baseUrl: process.env.REACT_APP_API_BASE,
  type: 'form',
  credentials: 'same-origin',
  mode: 'same-origin',
  loading: true,
}, [
  middleware.timeout,
  middleware.postForm,
// 根据具体的接口结构来定制中间件
  middleware.jsonResult,
]);
