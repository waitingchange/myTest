
h5.httpUrl = '192.168.154.129:8888/';
h5._Http = cc.Class.extend({
    self: null,

    ctor: function() {
        this.getNextTag = (function(argument) {
            var i = 0;

            function realGetTag(argument) {
                // 第一个是1
                i = i + 1;

                cc.log('i == ' + i);

                return i;
            }

            return realGetTag;
        })();
    },

    // http的get操作, configObj是个对象，url、headers、obj、callback分别表示相应的参数
    httpGet: function(cmd, reqData, callback, server) {
        this.requestByMethod("GET", cmd, reqData, callback, server);
    },

    // http的post操作
    httpPost: function(cmd, reqData, callback, server) {
        this.requestByMethod("POST", cmd, reqData, callback, server);
    },

    // http put操作
    httpPut: function(cmd, reqData, callback) {
        this.requestByMethod("PUT", cmd, reqData, callback);
    },

    // http delete操作
    httpDelete: function(cmd, reqData, callback) {
        this.requestByMethod("DELETE", cmd, reqData, callback);
    },

    requestByMethod: function(method, cmd, reqData, callback, server) {
        if (cmd == null) {
            cc.log('request url is null');
            return;
        }
        reqData = reqData || {};
        //传到代理服务器上的有三个参数data,cmd,server
        /**
         *	data  代理服务器转发的数据，即请求的目标服务器所需的数据
         *	cmd   代理服务器通过传入的cmd选择所访问的目标服务器接口
         *   server 目标服务器地址 如:http://open.touch4.me/ 默认为sdk的登录地址，若想换，则需传入该参数
         */
        var request_data = {
            "data": this.connectJson(reqData),
            "cmd": cmd
        };
        if (server && server.length != 0) {
            request_data['server'] = server;
        } else {
            request_data['server'] = h5.loginUrl;
        }
//        var reqURL = "http://" + window.location.host + "/server/proxy.php";
        var reqURL = h5.httpUrl

        callback = callback || function(json) {};
        var xhr = cc.loader.getXMLHttpRequest();
        // var oUrl = window.location.host;
        // oUrl = encodeURIComponent(oUrl);


        xhr.ontimeout = function() {
            // alert('请求服务器超时');
        };
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // reclick = true;

            }
            if (xhr.readyState == 4 && xhr.status == 200) {
                // var result = JSON.parse(xhr.responseText);
                // callfunc(result);
                callback(xhr.responseText);
            }
        };
        var params_data = "";
        for (var key in request_data) {
            if(request_data[key]) {
                params_data = params_data + key + "=" + escape(request_data[key]) + "&";
            }
        }
        var isPost = method && (method == 'post' || method == 'POST')
        if(!isPost){
            reqURL += '?' + params_data
        }
        // param = encodeURI(param);
        xhr.open(method, reqURL, true);
        xhr.timeout = 30 * 1000;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.send(params_data);
    },
    connectJson: function(json) {
        var str = "";
        for (var key in json) {
            str = str + encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
        };
        str = str.substr(0, str.length - 1);
        return str;
    },

    // http post上传文件，内部用form实现,一定注意程序需要有对 fullFilePath指定的路径有读权限
    httpPostFile: function(configObj) {
        var tag = 'post_file' + this.getNextTag();

        var url = configObj.url;
        var headers = configObj.headers || [];
        var fullFilePath = configObj.fullFilePath || ''; // 一定注意程序需要有对这个文件的读权限
        var partName = configObj.partName || '';
        var contentType = configObj.contentType || '';
        var obj = configObj.obj;
        var callback = configObj.callback;
    }
});