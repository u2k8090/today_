
import _ from 'lodash';
// import $ from 'jquery';
import TweenMax from 'gsap';
import Vue from 'vue';
import hoge from './modules/_hoge';
// import axios from 'axios';


/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */

// vue開発時必要
Vue.config.devtools = true;

const cookies = document.cookie;

const todoCol = {
  props: ['todo', 'index', 'edit', 'check'],
  methods: {
  },
  template: '\
      <li class="app-list-col" :class="[{check: todo.check}]"  >\
        <span class="checkBox" @click="check(index)"></span>\
        <p class="text" v-if="!todo.edit" @click="edit(index)">{{todo.text}}</p>\
        <input v-bind:id="\'todo-col-\' + todo.id" v-if="todo.edit" v-model="todo.text" @keyup.enter="edit(index)">\
        <button @click="$emit(\'remove\')" >×</button>\
      </li>',
};

// Vue.component('todo-col', {
//   props: ['todo'],
//   template: '\
//       <li class="app-list-col" :class="[{check: todo.check}]"  >\
//         <span class="checkBox" @click="$emit(\'check\')"></span>\
//         <p class="text" v-if="!todo.edit" @click="$emit(\'edit\')">{{todo.text}}</p>\
//         <input v-bind:id="\'todo-col-\' + todo.id" v-if="todo.edit" v-model="todo.text" @keyup.enter="$emit(\'edit\')">\
//         <button @click="$emit(\'remove\')" >×</button>\
//       </li>',
// });

const today = new Vue({
  el: '#app',
  components: {
    'todo-col': todoCol,
  },
  //   components: ['list-col'],
  data: {
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
  },
  beforeCreate() {
    console.log('init');
  },
  updated() {
    // console.table(this.todos);
  },
  computed: {
    orderbyTodos() {
      return _.orderBy(this.todos, 'index');
    },
  },
  watch: {
    todos: {
      handler() {
        const input = 'input-form-input';
        let fincount = 0;
        const placeholder = [
          '今日は何しようか？',
        ];
        let findEditFlag = _.findIndex(today.todos, ['edit', true]); // else -1
        if (today.todos.length > 0) {
          _.each(today.todos, (todo) => {
            if (todo.check === true) {
              fincount += 1;
            }
          });
          if (today.todos.length > 1 && findEditFlag < 0) {
            today.badgeAnim('.badge');
          }
          today.finTodo = fincount;
          today.totalTodo = today.todos.length;
          document.getElementById(input).setAttribute('placeholder', placeholder[0]); // [today.totalTodo]
          document.title = `(${today.finTodo}/${today.totalTodo}) today_`;
        } else {
          today.finTodo = fincount;
          today.totalTodo = today.todos.length;
          document.getElementById(input).setAttribute('placeholder', placeholder[0]);
          document.title = 'today_';
        }
      },
      deep: true,
    },
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
      hoge.fuga();
    },
    todoCheck(i) {
      _.each(this.todos, (todo) => {
        Vue.set(todo, 'edit', false);
      });
      if (this.todos[i].check === false) {
        Vue.set(this.todos[i], 'check', true);
      } else {
        Vue.set(this.todos[i], 'check', false);
      }
    },
    todoEdit(i) {
      const num = this.todos[i].id;
      if (this.todos[i].edit === false) {
        _.each(this.todos, (todo) => {
          Vue.set(todo, 'edit', false);
        });
        Vue.set(this.todos[i], 'edit', true);
        this.$nextTick(() => {
          document.getElementById(`todo-col-${num}`).focus();
        });
      } else {
        Vue.set(this.todos[i], 'edit', false);
      }
    },
    resetEdit() {
      _.each(this.todos, (todo) => {
        Vue.set(todo, 'edit', false);
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
  },

});

// // title sync
// today.$watch('todos', () => {
//   const input = 'input-form-input';
//   let fincount = 0;
//   const placeholder = [
//     '今日は何しようか？',
//   ];
//   let findEditFlag = _.findIndex(today.todos, ['edit', true]); // else -1
//   if (today.todos.length > 0) {
//     _.each(today.todos, (todo) => {
//       if (todo.check === true) {
//         fincount += 1;
//       }
//     });
//     if (today.todos.length > 1 && findEditFlag < 0) {
//       today.badgeAnim('.badge');
//     }
//     today.finTodo = fincount;
//     today.totalTodo = today.todos.length;
//     document.getElementById(input).setAttribute('placeholder', placeholder[0]); // [today.totalTodo]
//     document.title = `(${today.finTodo}/${today.totalTodo}) today_`;
//   } else {
//     today.finTodo = fincount;
//     today.totalTodo = today.todos.length;
//     document.getElementById(input).setAttribute('placeholder', placeholder[0]);
//     document.title = 'today_';
//   }
// }, { deep: true }); // dee: true でネストされたDOMまで監視

