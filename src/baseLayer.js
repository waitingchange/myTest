/**
 * Created by change on 16/6/14.
 */


//
// tybase_layer.js
// highladder
//
// Created by guangy on 2015-11-03
//
//基础类，用于注册监听事件

h5.TYBaseLayer = cc.Layer.extend({

    ctor: function() {
        this._super();
        this._registered = false;
        this._loadingLayer = null;
        this._swallowTouch = false;
        this._touchListener = null;
    },

    init: function() {
        if (this._super()) {
            this._registerListener(); //如果只在init里注册，当onexit时取消掉监听，回来就没监听了，但如果只在onEnter里注册，如果消息在onenter之前到来，就会出问题。所以两处都要注册
            return true;
        }
        return false;
    },

    onEnter: function() {
        this._super();
        if (!this._registered) { //不重复注册
            this._registerListener();
        }
        if (this._swallowTouch) {	//习惯remove的时候不带参数，默认cleanup，导致再次被添加时没有了触摸事件，在onEnter里每次都添加之后，就可以放心的直接remove，而不用考虑是否需要cleanup
            var listener = this._touchListener;
            if (!listener) {
                var that = this;
                listener = this._touchListener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function(touch, event) {
                        return true;
                    },
                    onTouchEnded:function(touch,event) {
                        that._touchEndCall(touch, event);
                    }
                })
            }
            cc.eventManager.addListener(listener, this);
        }
    },

    onExit: function() {
        this._removeListener();
        this._super();
    },

    _touchEndCall:function(touch, event){

    },

    _registerListener: function() {
        this._registered = true;
    },

    _removeListener: function() {
        this._registered = false;
    }
});