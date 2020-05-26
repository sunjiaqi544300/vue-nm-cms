import Axios from "axios"

export function TMap(key) {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(qq) // 注意这里
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init&key=' + key
        script.onerror = reject
        document.head.appendChild(script)
    })
}


export function coordinateFn(lng, lat) {
      //方法1
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  // let x = lng - 0.0065; 
  let x = lng - 0.003;
  // let y = lat - 0.006;  
  let y = lat - (-0.0007);
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let new_lng = z * Math.cos(theta);
  let new_lat = z * Math.sin(theta);
  return [new_lng, new_lat]
}


/*百度转腾讯定位
 *@method Localtiontransform
 *@param{lng, lat, type, ak} 参数名{经，纬，类型，密钥} 参数说明
 *@return {data} 返回值说明  经纬度 arr= [33.000,111.0000]
*/
export async function Localtiontransform(lng, lat, type, ak){
    var data
    //本地使用http
    await Axios.get("/translate"+"?locations="+lng+","+lat+
    // Axios.get("https://apis.map.qq.com/ws/coord/v1/translate?locations="+lng+","+lat+
        "&type="+ type +
        "&key="+ak)
    .then(res =>{
        data =res.data
    }).catch(err =>{
        console.log(err+"定位转换失败")
    })
    return data
    
}

//计算两个坐标之间的距离
export function GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}