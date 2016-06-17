h5.globalFunc = h5.globalFunc || {};


h5.globalFunc.addTouchToNode = function (node, touchEndCall, target, params) { //给node添加触摸事件
    var bTouchCanceled = false;
    var s = node.getContentSize();
    var rect = cc.rect(0, 0, s.width, s.height);
    var listener = node._tyTouchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var locationInNode = node.convertToNodeSpace(touch.getLocation());
            if (cc.rectContainsPoint(rect, locationInNode)) {
                bTouchCanceled = false;
                return true;
            }
            return false;
        },
        onTouchEnded: function (touch, event) {
            if (bTouchCanceled) {
                return;
            }
            var locationInNode = node.convertToNodeSpace(touch.getLocation());
            if (cc.rectContainsPoint(rect, locationInNode)) {
                if (touchEndCall) {
                    touchEndCall.call(target, locationInNode, params);
                }
            }
        },
        onTouchCancelled: function () {
            bTouchCanceled = true;
        },

        onTouchMoved: function (touch, event) {
            var locationInNode = node.convertToNodeSpace(touch.getLocation());
            if (cc.rectContainsPoint(rect, locationInNode) == false) {
                bTouchCanceled = true;
            }
        }
    });
    node.onEnter = function () {
        cc.Node.prototype.onEnter.call(this);	//除了像cc.control, cc.menu等重写了onEnter方法，其他都没有重写，所以可以直接用node的onEnter
        cc.eventManager.addListener(node._tyTouchListener, this);
    };
};
h5.globalFunc.getConfig = function (key) { //从project.json内读取配置项
    return cc.game.config[key];
};
