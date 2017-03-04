import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import TestPanel from './components/TestPanel.vue'
import ActivityList from './components/ActivityList.vue'
import TestList from './components/TestList.vue'
import AddTest from './components/AddTest.vue'

const routes = [
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: 'testpanel',
                component: TestPanel,
                children: [
                    {
                        path: 'list',
                        component: TestList
                    },
                    {
                        path: 'add',
                        name: 'addtest',
                        component: AddTest
                    }
                ]
            },
            {
                path: 'activitylist',
                component: ActivityList
            }
        ]
    },
    { path: '*', redirect: '/login' }
]

const router = new VueRouter({
    routes: routes
})

export default router