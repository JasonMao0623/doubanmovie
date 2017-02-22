function convertToStarsArray(stars){
    var num=stars.toString().substring(0,1);
    var array=[];
    for(var i=1;i<=5;i++){
        if(i<=num){
            array.push(1);
        }
        else{
            array.push(0);
        }
    }
    return array;
};
function convertToCastString(casts){
    var castString="";
    for(var idx in casts){
        castString=castString + casts[idx].name + "/";
    }
    return castString.substring(0,castString.length-2);
}
function convertToCastInfos(casts){
    var castsArray=[];
    for (var idx in casts){
        var cast={
            img:casts[idx].avatars?casts[idx].avatars.large:"",
            name:casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
};
function http(Url,callBack) {
        wx.request({
            url:Url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "application/xml"
            }, // 设置请求的 header
            success: function (res) {
                callBack(res.data)
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
module.exports = {
  convertToStarsArray:convertToStarsArray,
  http:http,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos,
}