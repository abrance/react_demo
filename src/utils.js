
export function param_fy(params) {
    /*
    * 为了简化 fetch get请求传入操作，只需传入get的参数对象，将返回后面参数字符串化。
    *
    * */
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        return '?' + paramsArray.join('&')
    }
}