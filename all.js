let vm = new Vue({
    el: '#vm',
    data: {
        newText: "",
        newDate: null,
        newTime: null,
        index: 0,
        todos: [],
        allTodos: [],
        doneTodos: [],
        undoneTodos: [],
        isChosen: {
            all: false,
            done: false,
            undone: false
        }
    },
    methods: {
        addTodo: function (text, date, time) {
            this.allTodos.push({ todoText: text, todoDate: date, todoTime: time, completed: false, todoIndex: this.index })
            this.todos.push({ todoText: text, todoDate: date, todoTime: time, completed: false, todoIndex: this.index })
            this.index++

            this.filter()

            this.isChosen.all = true
            this.isChosen.done = false
            this.isChosen.undone = false
            
            this.newText = ""
            this.newDate = null
            this.newTime = null
        },
        removeTodo: function (item) {
            let result = this.allTodos.map(function (value) {
                // console.log(value.todoIndex);
                return value.todoIndex
            }).indexOf(item.todoIndex)
            // console.log(result);

            this.todos.splice(this.todos.indexOf(item), 1)
            this.allTodos.splice(result, 1)
        },
        completedTodo: function (item) {
            let result = this.allTodos.map(function (value) {
                return value.todoIndex
            }).indexOf(item.todoIndex)

            if (item.completed == false) {
                item.completed = true
                this.allTodos[result].completed = true
            } else {
                item.completed = false
                this.allTodos[result].completed = false
            }

            this.filter()
        },
        filter: function () {
            this.todos = []
            this.doneTodos = []
            this.undoneTodos = []
            for (i = 0; i < this.allTodos.length; i++) {
                if (this.allTodos[i].completed == true) {
                    this.doneTodos.push(this.allTodos[i])
                } else if (this.allTodos[i].completed == false) {
                    this.undoneTodos.push(this.allTodos[i])
                }
                this.todos.push(this.allTodos[i])
            }
        },
        showAll: function () {
            this.filter()
            this.isChosen.all = true
            this.isChosen.done = false
            this.isChosen.undone = false
        },
        showDone: function () {
            this.todos = this.doneTodos
            this.isChosen.all = false
            this.isChosen.done = true
            this.isChosen.undone = false
        },
        showUndone: function () {
            this.todos = this.undoneTodos
            this.isChosen.all = false
            this.isChosen.done = false
            this.isChosen.undone = true
        },
    }
})
