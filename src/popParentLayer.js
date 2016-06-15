/**
 * Created by change on 16/6/14.
 */

h5.PopParentLayer = h5.TYBaseLayer.extend({
    ctor: function () {
        this._super();
        this._swallowTouch = true;
        var winSize = cc.winSize;
        var w = winSize.width;
        var h = winSize.height;

        this._baseOder = 10;

        this._popNodes = [];

    },
    init: function () {



    }
    //addChilds:function(child){
    //    this._popNodes.push(child);
    //    var len = this._popNodes.length;
    //    child.setZOrder(len + this._baseOder);
    //
    //},
    //removeNode:function(child){
    //    child._mark = 'die';
    //    var arr = [];
    //    for (var i = 0;i < this._popNodes.length;i++){
    //        var pn = this._popNodes[i];
    //        if (pn._mark == 'live'){
    //            arr.push(pn);
    //        }
    //    }
    //
    //}


});