import request from '~/core/request';

export function jsSDK(data: object) {
  return request.post('/wechatBH/wechatauth/authJsSdk', data);
}
