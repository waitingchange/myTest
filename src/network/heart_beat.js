
h5._HeartBeat = cc.Class.extend({

    ctor:function () {
        cc.log(" in ctor new _HeartBeat");
        this._interval = 0; // 心跳的间隔

        //h5.NotificationCenter.listen(h5.EventType.MSG_HEART_BEAT, this.onHeartbeatBack, this);

        this._timeoutNum = 0; // 超时的心跳包个数

        this.num = 5;
    },

    // 开始客户端心跳的逻辑
    startHeartBeat:function (interval, num) {
        this._interval      = interval || this._interval;
        this.num            = num || this.num;
        this._timeoutNum    = 0;
        this._startTick();
    },

    _startTick:function () {
        h5.Timer.cancelTimer(this, this._sendMsg);
        h5.Timer.setTimer(this, this._sendMsg, this._interval, cc.REPEAT_FOREVER, 0);
    },

    _sendMsg:function () {
        // 检查超时
        if(++this._timeoutNum > this.num)
        {
            cc.log('Heart beat time out.');
            h5.NotificationCenter.trigger(h5.EventType.HEART_BEAT_RECEIVE_ERROR);
        }
        h5.NotificationCenter.trigger(h5.EventType.HEART_BEAT_LOGIC);
    },

    // 停止客户端心跳的逻辑
    stopHeartBeat:function () {
        h5.Timer.cancelTimer(this, this._sendMsg);
    },

    // 收到了心跳回来的消息
    onHeartbeatBack:function () {
        // var jsonObj = argument[0];
        // cc.log('reset _timeoutNum');
        this._timeoutNum = 0;
    }
});