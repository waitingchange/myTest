h5._MsgFactory = cc.Class.extend({

    ctor: function () {
        this.sender = h5.TCPConnection;
    },
    _sendCmd: function (json) {
        var strValue = JSON.stringify(json) + '\r\n';
        cc.log('send msg in msg_factory :' + strValue);
        this.sender.sendMsg(strValue);

    },
    sendHello: function () {
        var params = {
            'cmd': 'hello',
            'params': {
                'userId': 111,
                'gameId': 111,
                'clientId': 111
            }
        };
        this._sendCmd(params);
    }

});