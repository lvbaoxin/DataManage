import http from 'axios'

let baseUrl = '';
if(window.location.href.indexOf('192.168.0.252')>=0){
    //正式环境
    baseUrl = 'http://192.168.0.252:8930/largeData'
	//baseUrl='http://192.168.0.97:8930/largeData'
}else{
	
    //测试环境
    baseUrl = 'http://116.62.128.194:8930/largeData'
	//baseUrl = 'http://localhost:8930/largeData'
	//baseUrl="http://192.168.0.252:8930/largeData"
}
http.defaults.baseURL = baseUrl
//http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//http.defaults.withCredentials = true;
// http.defaults.timeout = 2500
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// http.defaults.headers.post['Content-Type'] = 'application/json'
// cache-control: "max-age=0, private, must-revalidate"
// http.defaults.headers.post['Cache-control'] = 'max-age=5'

http.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}];

http.interceptors.request.use(function (config) {

    config.headers["Authorization"] = "Bearer "+localStorage.getItem('token');
    if(config.method == 'get'){
        config.url  = encodeURI(config.url);
    }
    return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
	
    return response;
}, function (error) {
	const err = new Error();
  
    throw err;
});

export default http