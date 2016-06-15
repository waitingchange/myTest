/**
 * Created by change on 16/6/15.
 */


h5.NotificationCenter = (function(){
    var events = {},
        registerEvent = function(eName, handler, scope){
            events[eName] = events[eName] || [];
            events[eName].push({
                scope: scope || this,
                handler: handler
            });
        },
        removeEvent = function(eName, handler, scope){
            scope = scope || this;
            var fns = events[eName]

            if(!fns)
                return;

            events[eName] = fns.filter(function(fn){
                return fn.scope!=scope || fn.handler!=handler
            });
        },
    //
        triggerEvent = function(eventName,params){
            var fns = events[eventName],i,fn;
            if(!fns)
                return;
            var i, fn;
            if(h5.isdebug == false) {
                try{
                    for(i=0;fn=fns[i];i++){
                        fn.handler.call(fn.scope, params)
                    }
                }catch(error) {
                    cc.error("error is " + error + " fns = " + fn.scope + " params = " + params);
                }
            }else {
                for(i=0;fn=fns[i];i++){
                    fn.handler.call(fn.scope, params)
                }
            }
        };
    return {
        listen: registerEvent,
        ignore: removeEvent,
        trigger: triggerEvent
    }
})();