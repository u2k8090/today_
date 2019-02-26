<template>
<div>
  <header class="header">
      <div class="input-form">
          <div class="app-title">today<span class="anim-blink">_</span> <transition name="bounce"><span class="badge" v-if="totalTodo > finTodo"><span class="text">{{totalTodo - finTodo}}</span></span></transition></div>
          <input id="input-form-input" v-model="inputVal" @focus="resetEdit" @keydown.enter="keyCheck" @keyup.enter="enterAdd" :placeholder="todayDate">
          <button @click="addTodo">＋</button>
      </div>
  </header>
  <div class="app-list">
      <draggable class="app-list-inr"  element="ul" @start="drag=true" @end="drag=false" :options="{animation:100}">
          <transition-group name="fade">
              <todo-col
                v-for="(todo, index) in orderbyTodos"
                :key="todo.id"
                :todo="todo"
                :index="index"
                :edit="todoEdit"
                :check="todoCheck"
                @remove="todos.splice(index, 1)"
              ></todo-col>
          </transition-group>
      </draggable>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable';

const todoCol = {
  props: ['todo', 'index', 'edit', 'check'],
  methods: {
  },
  template: '\
      <li class="app-list-col" :class="[{check: todo.check}]"  >\
        <span class="checkBox" @click="check(index)"></span>\
        <p class="text" v-if="!todo.edit" @click="edit(index)">{{todo.text}}</p>\
        <input v-bind:id="\'todo-col-\' + todo.id" v-if="todo.edit" v-model="todo.text" @keyup.enter="edit(index)" @click="edit(index)">\
        <button @click="$emit(\'remove\')" >×</button>\
      </li>',
};


  export default {
    name: 'Home',
    components: {
      'todo-col': todoCol,
      draggable,
    },
    props:[
    ],
		data() {
			return {
    todayDate: null,
    inputVal: '',
    totalTodo: 0,
    finTodo: 0,
    todos: [
    //   {
    //     id: 0,
    //     text: 'test task',
    //     check: false,
    //     edit: false,
    //   },
    ],
    todoId: null,
    keyDownCode: 0,
      }
		},
  beforeCreate() {
    console.log('init');
  },
  mounted() {
    this.start();
  },
  computed: {
    orderbyTodos() {
      return _.orderBy(this.todos, 'index');
    },
    todoTotal() {
      return this.totalTodo + this.finTodo;
    }
  },
  methods: {
    addTodo() {
      if (this.inputVal === '') return;
      if (!this.inputVal) return;
      this.todos.push({
        id: this.todoId += 1,
        text: this.inputVal,
        check: false,
        edit: false,
        keyDownCode: 0,
      });
      this.inputVal = '';
    },
    todoCheck(i) {
      _.each(this.todos, (todo) => {
        this.$set(todo, 'edit', false);
      });
      if (this.todos[i].check === false) {
        this.$set(this.todos[i], 'check', true);
        this.badgeAnim('.badge');
      } else {
        this.$set(this.todos[i], 'check', false);
        this.badgeAnim('.badge');
      }
    },
    todoEdit(i) {
      const num = this.todos[i].id;
      if (this.todos[i].edit === false) {
        _.each(this.todos, (todo) => {
          this.$set(todo, 'edit', false);
        });
        this.$set(this.todos[i], 'edit', true);
        this.$nextTick(() => {
          document.getElementById(`todo-col-${num}`).focus();
        });
      } else {
        this.$set(this.todos[i], 'edit', false);
      }
    },
    resetEdit() {
      _.each(this.todos, (todo) => {
        this.$set(todo, 'edit', false);
      });
    },
    keyCheck(e) {
      this.keyDownCode = e.which;
    },
    enterAdd(e) {
      if (e.which === 13 && e.which === this.keyDownCode) {
        this.addTodo();
      }
      return false;
    },
    badgeAnim(target) {
    //   console.log('badgeAnim');
      TweenMax.set(target, { scale: 1.5 });
      TweenMax.to(target, 0.2, { scale: 1.0 });
    },
    start(){
    let self = this;
    this.todayDate = setInterval(function() {self.count()}, 10);
    },
    count(){
      this.todayDate = new Date().toLocaleString();
    }
  },
  watch: {
    todoTotals() {
      this.badgeAnim('.badge');
    },
    todos: {
      handler() {
        const input = 'input-form-input';
        let fincount = 0;
        // const placeholder = [
        //   '今日は何しようか？',
        // ];
        if (this.todos.length > 0) {
          _.each(this.todos, (todo) => {
            if (todo.check === true) {
              fincount += 1;
            }
          });
          this.finTodo = fincount;
          this.totalTodo = this.todos.length;
          document.getElementById(input).setAttribute('placeholder', placeholder[0]); // [this.totalTodo]
          document.title = `(${this.finTodo}/${this.totalTodo}) this_`;
        } else {
          this.finTodo = fincount;
          this.totalTodo = this.todos.length;
          document.getElementById(input).setAttribute('placeholder', placeholder[0]);
          document.title = 'today_';
        }
      },
      deep: true,
    },
  },
  }
</script>
