import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'



const routes= [
   

      {
        path: "/home",
        name: "Home",
        component:Home ,
        props:true,
      },
    //   {
    //     path: "/posts",
    //     name: "Blog",
    //     component:PostBlog,
    //     props:true,
    //   },
    
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
    ]
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

  export default router;