/**
 * Created by change on 16/6/17.
 */


h5.MsgCenter =  cc.Class.extend({
    //如果是单利中的类,那么根本不需要下面的  destroy:  先写,规范化

    ctor:function(){
        h5.NotificationCenter.listen("todo_task", this.onTodoTask, this);


    },
    destroy: function() {
        h5.NotificationCenter.ignore("todo_task", this.onTodoTask, this);

    },
    onTodoTask:function(){
        cc.log("fuck on todo_task");

        //var msgArr = [];
    }

});


h5.TodoTaskVec = cc.Class.extend({

    ctor: function() {
        this.gameId = 0;
        this.userId = 0;
        this.exitPopWndType = 0;
        this.taskVec = []; //当前正在处理的任务
    },

    destroy: function() {},

    parseTodoTask: function(result) {
        if (typeof(result) != 'undefined') {
            this.gameId = result["gameId"];
            this.userId = result["userId"];
            var vec = this.taskVec;
            var tasks = result["tasks"];
            for (var i = 0, len = tasks.length; i < len; i++) {
                var task = new hall._TodoTask();
                task.parseTask(tasks[i]);
                vec.push(task);
            }
            h5.ToDoTask.runTasks();
        }
    }
});