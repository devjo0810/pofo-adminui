import { API_CONFIG, HTTP } from "@/config";
import { jsonToQs } from "@/utils/util";

export default {
  install(Vue) {
    // http 기본 옵션
    const defaultOption = {
      baseUrl: API_CONFIG.baseUrl,
      timeout: API_CONFIG.timeout,
      debug: API_CONFIG.debug,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: -1,
      },
    };

    /**
     * request before interceptor
     * @param {object} parameter
     * @param {string} url request URL
     * @param {object} httpOption fetch option(http header, request body...)
     * @param {object} option 호출시 전달한 option
     */
    const defaultRequestBefore = ({ url, httpOption }) => {
      if (!defaultOption.debug) return;
      console.log("[request before]", "url :", url, "body :", httpOption.body);
    };

    /**
     * request after interceptor
     * @param {object} parameter
     * @param {string} url request URL
     * @param {object} httpOption fetch option(http header, request body...)
     * @param {object} option 호출시 전달한 option
     * @param {object} response 호출후 전달받은 response값
     */
    const defaultRequestAfter = ({ response }) => {
      if (!defaultOption.debug) return;
      console.log(
        "[request after]",
        "status :",
        response.status,
        "result :",
        response.result
      );
    };

    // widget 요청 인터셉터
    const widgetRequestBefore = ({ option }) => {
      if (!option) return;
      const { spinnerOff, compoId } = option;
      if (spinnerOff) return;
      if (!compoId) return;
      Vue.widget.spinner.on(compoId);
    };

    // widget 응답 인터셉터
    const widgetRequestAfter = ({ option, response }) => {
      if (!option) return;
      const { compoId, toastOff } = option;
      if (!compoId) return;
      const { error } = response;
      Vue.widget.spinner.off(compoId);
      if (!error || toastOff) return;
      Vue.toast.danger(error.message);
    };

    const interceptor = {
      request: [defaultRequestBefore, widgetRequestBefore],
      response: [defaultRequestAfter, widgetRequestAfter],
    };

    /**
     * HTTP Method 별 파라미터 변환 처리
     * @param {string} httpMethod HTTP Method type(GET, POST...)
     * @param {object} params 변환할 parameters
     * @returns querystring || json
     */
    const convertParams = (httpMethod, params) => {
      switch (httpMethod) {
        case HTTP.METHOD.GET:
          return jsonToQs(params);
        case HTTP.METHOD.POST:
        case HTTP.METHOD.PUT:
        case HTTP.METHOD.DELETE:
          return JSON.stringify(params);
      }
    };

    // http response 에러 체크
    const httpResponseHandle = async (response) => {
      const { status } = response;
      const { STATUS } = HTTP;
      let result = null;
      let error = null;
      // http status code 핸들링
      switch (status) {
        case STATUS.OK:
        case STATUS.CREATED:
          result = await response.json();
          break;
        case STATUS.NO_CONTENT:
        case STATUS.BAD_REQUEST:
        case STATUS.UNAUTHORIZED:
        case STATUS.FORBIDDEN:
        case STATUS.NOT_FOUND:
        case STATUS.REQUEST_TIMEOUT:
        case STATUS.PAYLOAD_TOO_LARGE:
        case STATUS.URI_TOO_LONG:
        case STATUS.INTERNAL_SERVER_ERROR:
        case STATUS.BAD_GATEWAY:
          error = { status, message: HTTP.ERROR_MESSAGE[status] };
          break;
        default: {
          error = { status, message: "알수없는 오류가 발생하였습니다." };
          break;
        }
      }
      return { result, error };
    };

    const send = async (httpMethod, url, params, option) => {
      params = convertParams(httpMethod, params);
      url = httpMethod === HTTP.METHOD.GET ? url + params : url;

      const headers = { ...defaultOption.headers };
      if (option && option.headers) {
        Object.assign(headers, option.headers);
      }
      const body = httpMethod !== HTTP.METHOD.GET ? params : null;
      const controller = new AbortController(); // fetch timeout 처리용
      const httpOption = {
        method: httpMethod,
        headers,
        signal: controller.signal,
      };
      if (body) httpOption.body = body;

      interceptor.request.forEach((fn) => fn({ url, httpOption, option }));
      const timeoutId = setTimeout(
        () => controller.abort(),
        defaultOption.timeout
      );
      const response = await fetch(url, httpOption);
      clearTimeout(timeoutId);
      const { result, error } = await httpResponseHandle(response);
      response.result = result;
      response.error = error;
      interceptor.response.forEach((fn) =>
        fn({ url, httpOption, option, response })
      );

      return response;
    };

    const http = {
      setup: {
        option(option) {
          // defaultOption 변경 또는 추가
          Object.assign(defaultOption, option);
        },
        request(fn) {
          // request interceptor 추가
          interceptor.request.push(fn);
        },
        response(fn) {
          // response interceptor 추가
          interceptor.response.push(fn);
        },
      },
      async get(url, params, option) {
        return await send(HTTP.METHOD.GET, url, params, option);
      },
      async post(url, params, option) {
        return await send(HTTP.METHOD.POST, url, params, option);
      },
      async put(url, params, option) {
        return await send(HTTP.METHOD.PUT, url, params, option);
      },
      async delete(url, params, option) {
        return await send(HTTP.METHOD.DELETE, url, params, option);
      },
    };
    Vue.http = http;
    Vue.prototype.$http = http;
  },
};
