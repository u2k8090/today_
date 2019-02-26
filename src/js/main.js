
import Vue from 'vue';
import router from './router';
import App from './App.vue';
import Home from './views/Home.vue';

import _ from 'lodash';
import isMobile from 'ismobilejs';
// import $ from 'jquery';

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */


Vue.config.devtools = true;





new Vue({
  router,
  data: {
    spFlag: false,
    isPhone: isMobile.any,
    innerWidth: window.innerWidth
  },
  methods: {
    handleResize(){
      this.innerWidth = window.innerWidth;
      this.isPhone = isMobile.any;
      this.checkSP();
    },
    checkSP(){
      if(this.innerWidth < 769){
        this.spFlag = true;
      } else {
        this.spFlag = false;
      }
    },
    debugLog(){
      console.log('menuFlag:' + this.menuFlag);
      console.log('spFlag:' + this.spFlag);
      console.log('innerWidth:' + this.innerWidth);
    }
  },
  mounted(){
    // console.log(this.isPhone);
    this.debugLog();
    this.checkSP();
    window.addEventListener('resize', _.debounce(this.handleResize, 1000));
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  render: h => h(App)
}).$mount('#app')



// const app = new Vue({
//   el: '#app',
//   data: {
//     menuFlag: true,
//     spFlag: false,
//     message: "meme-men",
//     // isPhone: isMobile.any,  // -> not used
//     innerWidth: window.innerWidth
//   },
//   methods: {
//     handleResize(){
//       this.innerWidth = window.innerWidth;
//       this.isPhone = isMobile.any;
//       this.checkSP();
//     },
//     checkSP(){
//       if(this.innerWidth < 769){
//         this.spFlag = true;
//       } else {
//         this.spFlag = false;
//       }
//     },
//     menuToggle(){
//       this.menuFlag = !this.menuFlag;
//       console.log(this.menuFlag);
//     },
//     debugLog(){
//       console.log('menuFlag:' + this.menuFlag);
//       console.log('spFlag:' + this.spFlag);
//       console.log('innerWidth:' + this.innerWidth);
//     }
//   },
//   mounted(){
//     // console.log(this.isPhone);
//     this.debugLog();
//     this.checkSP();
//     window.addEventListener('resize', _.debounce(this.handleResize, 1000));
//   },
//   beforeDestroy: function () {
//     window.removeEventListener('resize', this.handleResize);
//   },
// });


