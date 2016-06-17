


h5.init = function(){
    h5.TCPConnection = new h5._TCPConnection();
    h5.MsgFactory = new h5._MsgFactory();

    h5.isdebug = h5.globalFunc.getConfig("debugMode");
    h5.Me = new h5._UserInfo();
    h5.MsgSource = new h5.MsgCenter();
    //h5.Http =  new h5._Http();
    //h5.HeartBeat = new h5._HeartBeat();


};