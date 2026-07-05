import {createRouter, createWebHistory} from 'vue-router'
import Profile from './pages/Profile.vue'
import Education from './pages/education/Education.vue'
import Dashboard from './pages/Dashboard.vue'
import Work from './pages/Work.vue'
import Skill from './pages/Skill.vue'
import Tool from './pages/Tool.vue'
import Feature from './pages/Feature.vue'
import Technology from './pages/Technology.vue'


const routes =[
    {path: '/', component: Dashboard},
    {path: '/profile', component: Profile},
    {path: '/education', component: Education},
    {path: '/skill', component: Skill},
    {path: '/work', component: Work},
    {path: '/feature', component: Feature},
    {path: '/technology', component: Technology},
    {path: '/tool', component: Tool}
]

export const router = createRouter({
    linkActiveClass: '',
    history: createWebHistory(),
    routes
})
