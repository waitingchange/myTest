h5.TCP_CONNECT_FAILED = 1;
h5.TCP_CONNECT_ERROR = 2; // 连接错误(中断)
h5.TCP_CONNECT_DEFAULT_CONFIG = 3; // 连接错误(中断)

h5._TCPConnection = cc.Class.extend({
    self: null,
    _retryConnectTimeOut: 5,
    _config: null,

    ctor: function () {
        // 初始化成空对象
        this._socket = null;
        this._config = null;
        this["reconnect"] = this.reconnect; //为了混淆之后保留reconnect方法
    },

    // 进行网络的连接
    connect: function (config) {
        cc.log("now the state is SOCKET_STATUS_CONNECTING");
        this._config = config;
        var self = this;

        try {
            this._socket = new WebSocket("ws://" + config.tcpServerIp + ":" + config.portNumber);
            // this._socket["binaryType"] = "arraybuffer";
        } catch (e) {
            cc.error("服务器建立失败，请查看连接地址是否正确! 错误信息：" + e);
            return;
        }
        var self = this;
        this._socket.onopen = function () {
            // h5.NotificationCenter.trigger(h5.EventType.TCP_OPENED);
            cc.log("fuck is open ");
        };
        this._socket.onmessage = function (msg) {
            // h5.NotificationCenter.trigger(h5.EventType.MSG_HEART_BEAT);

            cc.log("fuck is on message");


            var data = msg["data"];
            var content = self.decodeMessage(data);

            if (content == null || content == '0000') {
                cc.log('get heartbeat msg');
                return;
            }

            cc.log("receive message in tcp: " + content);
            //var strJson = content.substr(0, content.length - 0);
            //if (strJson != null && strJson.length > 0) {
            //    var _json = JSON.parse(strJson);
            //    h5.netMsgDispatcher.processMsg(_json["cmd"], [_json]);
            //}
        };
        //http://stackoverflow.com/questions/27731490/how-to-handle-websocket-onerror
        //onerror可以被随时触发,不需要关闭连接等.可以不做处理
        var interval = this._retryConnectTimeOut;
        this._socket.onclose = function (event) {

            cc.log("fuck is close...");
            // h5.NotificationCenter.trigger(h5.EventType.TCP_CLOSE);
            //如果是被挤下去的用户则不进行断线重连
            // if (!hall.ME.isOtherLogin) {
            //     //断线重连
            //     h5.Timer.setTimer(self, function () {
            //         h5.TCPConnection.reconnect();
            //     }, interval, 0, 0);
            // }
        };

    },

    decodeMessage: function (data) {
        if (typeof ArrayBuffer != 'undefined' && data instanceof ArrayBuffer) {
            var databytes = new Uint8Array(data);
            var content = '';
            for (var i = 0, len = databytes.length; i < len; i++) {
                var tmpc = String.fromCharCode(databytes[i]);
                content += tmpc;
            }
            return content
        }
        //var data = hall.GlobalFuncs.base64decodeRaw(data);
        var mask = data.slice(0, 4);
        data = data.slice(4);
        for (var i = 0, len = data.length; i < len; i++) {
            var charcode = data[i];
            charcode ^= mask[i % 4];
            data[i] = charcode;
        }
        //var result = hall.GlobalFuncs._utf8_decode(data);
        return data;
    },

    reconnect: function () { //发起重连
        if (this._config != null) {
            this.connect(this._config);
            // h5.NotificationCenter.trigger(h5.EventType.TCP_RECONNECT);
            cc.log("正在发起重连...");
        }
    },

    // 发送消息,
    // msg的格式是json转成的字符串,所以外部调用这个函数之前要先把数据准备成合适的格式
    sendMsg: function (msg) {
        if (this._socket && this._socket.readyState == this._socket.OPEN) {

            if (typeof Uint8Array == 'undefined') {
                this._socket.send(msg);
            } else {
                var message = ''
                for (var i = 0, len = msg.length; i < len; i++) {
                    var tmpc = msg.charCodeAt(i)
                    if (tmpc > 255) {
                        message += '\\u' + tmpc.toString(16);
                    } else {
                        message += msg.charAt(i);
                    }
                }
                var mlen = message.length;
                var arr = new Uint8Array(mlen);
                for (var i = 0; i < mlen; i++) {
                    arr[i] = message.charCodeAt(i);
                }
                this._socket.send(arr.buffer);
            }
        }
    },

    // 关闭连接
    close: function () {
        cc.log(" close _TCPConnection");
        //socket.io实现
        this._socket.close();
    },

    /**
     * 杀掉连接，仅在heart time out的时候调用，模拟一次网络错误
     */
    kill: function () {
        if (this._socket) {
            this._socket.close();
            cc.log("socket.io is not exist kill _TCPConnection");
        }
    },

    /**
     * 设置重连超时时间
     * @param n
     */
    setRetryConnectTimeOut: function (n) {
        this._retryConnectTimeOut = n;
    }
});