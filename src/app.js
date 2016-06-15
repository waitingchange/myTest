var HelloWorldLayer = h5.TYBaseLayer.extend({
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();




        //连接websocket后端服务器
        //this.socket = io.connect('ws://:8088');

        var config =  {
            tcpServerIp: 'localhost',
            portNumber: 8088
        };

        //var ws = h5.TCPConnection;
        //ws.connect(config);



        var sprite = new cc.Sprite(res.HelloWorld_png);
        sprite.setPosition(cc.p(100,200));
        this.addChild(sprite);

        h5.globalFunc.addTouchToNode(sprite, this._clickSpr, this);







        return true;
    },
    call: function (data) {
        cc.log('fuck data is back');
      

    },
    _clickSpr:function(){
        h5.MsgFactory.sendHello();
        h5.NotificationCenter.trigger("haha","ssssssss");
    },
    _onListen:function(data){
        console.log("lalalalalal " + data);
    },
    _registerListener: function() {
        this._super();
        h5.NotificationCenter.listen("haha", this._onListen, this);

    },
    _removeListener: function() {
        this._super();
        h5.NotificationCenter.ignore("haha", this._onListen, this);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});