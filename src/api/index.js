import axios from 'axios'
// axios拦截器
axios.interceptors.request.use(
        config => {
            console.log(config.method)
            if (config.method == "get") {
                config.params = {
                    _t: Date.parse(new Date()) / 1000,
                    ...config.params
                }
            } else if (config.method == "post") {
                config.data = {
                    ...config.data,
                    _t: Date.parse(new Date()) / 1000
                }
            }
            var token = localStorage.getItem('token')
                // console.log(config.url)
            if (config.url != '192.168.1.3:8000/wechat/api/user/' || config.url != '192.168.1.3:8000/wechat/api/code/') {
                if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
                    config.headers.Authorization = 'JWT ' + token
                }
            }
            return config
        },
        err => {
            return Promise.reject(err)
        })
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    // Element.Message.error({
                    //   message: '请您登陆'
                    // })
                    router.push('/')
            }
            return false
        }
        return false
    })


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        console.log(params)
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err)
            })
    })
}