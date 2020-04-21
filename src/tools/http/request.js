import http from './http';

var request = {
  get:function (url,data,success,fail) {
  	
    return http.get(url,{params: data})
      .then(function (res) {
        if(res.data.result == 1){
          success(res.data);
        }else{
          fail(res.data);
        }
      })
      .catch(function (error) {
        if(fail){
          fail(error);
        }
      })
  },
  post:function (url,data,success,fail) {
  	
    return http.post(url,data)
      .then(function (res) {
        success(res.data);
      })
      .catch(function (error) {
        if(fail){
          fail(error);
        }
      })
  }
}
export default  request;