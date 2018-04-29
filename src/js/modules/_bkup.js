
import Vue from 'vue';
import $ from 'jquery';
import axios from 'axios';
import _ from 'lodash';

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

// vue開発時必要
// Vue.config.devtools = true;


const app = new Vue({
  el: '#app',
  data: {
    message: 'mamimumeme.com',
    f: true,
    // count2: app.count,
  },
  methods: {
    toggleShow() {
      if (this.f === true) {
        this.f = false;
      } else {
        this.f = true;
      }
    },
    addData() {
      app2.groceryList.push({ id: app2.count, text: this.message });
      app2.count += 1;
    },
    addClear() {
      this.addData();
      this.message = '';
      $('input').val('');
    },
  },
  computed: {
    rMessage() {
      return this.message.split('').reverse().join('');
    },
  },
  created() {
    console.log(`${this.message} created`);
  },
});

$(() => {
  $('.test').on('click', () => {
    console.log(app.$el);
    console.log(app.$data);
  });
});

app.$watch('message', () => {
  document.title = app.message;
});

const scopedComponent = {
  props: ['scopedval'],
  template: '<li>{{scopedval.text}}</li>',
};

const app2 = new Vue({
  el: '#app2',
  data: {
    count: 0,
    todos: [
    //   { text: 'AAAAA' },
    //   { text: 'BBBBB' },
    //   { text: 'CCCCC' },
    ],
    groceryList: [
    //   { id: 0, text: 'Vegetables' },
    //   { id: 1, text: 'Cheese' },
    //   { id: 2, text: 'Whatever else humans are supposed to eat' },
    ],
  },
  methods: {
    del() {
      this.groceryList.splice(-1, 1);
    },
    delall() {
      this.groceryList.splice(0);
    },
  },
  components: {
    'scoped-component': scopedComponent,
  },
});

const app3 = new Vue({
  el: '#app3',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!',
  },
  watch: {
    question(newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to step typing...';
      this.getAnswer();
    },
  },
  methods: {
    getAnswer: _.debounce(function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)';
        return;
      }
      this.answer = 'Thinking...';
      const vm = this;
      axios.get('https://yesno.wtf/api')
        .then((response) => {
          app3.answer = _.capitalize(response.data.answer);
          console.log(response);
        })
        .catch((error) => {
          app3.answer = `Error! Could not reach the API${error}`;
        });
    }, 500),
  },
});

const textBlock = {
  props: ['textdblock'],
  template: '<p class="add">{{textdblock}}</p>',
};


const app4 = new Vue({
  el: '#app4',
  data: {
    acttiveClass: 'active',
    errorClass: 'text-danger',
    flag: true,
    message1: 'truetruetruetruetruetruetrue',
    message2: 'falsefalsefalsefalsefalsefalse',
  },
  methods: {
    flagChange() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
  components: {
    'text-block': textBlock,
  },
});

