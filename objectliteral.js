class Todo{
    constructor(initialTodo){
        this.todos = [];
    }
    addTodo(item){
        this.todos = [...this.todos, item];
        this._log('ADD_TODO ${item}')
    }

    _log(msg){
        console.log('{event} :', msg);
    }
}

const todo = new Todo();
todo.addTodo("sd");

const healthObj = {
    name : "runnign",
    lastTime : "PM 10 : 12",
    showHealth(){
        console.log(this.name + "님, 오늘은 " + this.lastTime + "에 운동을 하셨네요");
    }
}

healthObj.showHealth();