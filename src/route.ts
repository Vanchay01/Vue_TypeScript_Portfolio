import {createRouter, createWebHistory} from 'vue-router'
import Profile from './pages/Profile.vue'
import Education from './pages/education/Education.vue'
import Dashboard from './pages/Dashboard.vue'
import Work from './pages/work/Work.vue'
import Skill from './pages/skill/Skill.vue'
import Tool from './pages/Tool.vue'
import Feature from './pages/Feature.vue'
import Technology from './pages/Technology.vue'
import Parent from './pages/test-modal-components/Parent.vue'


const routes =[
    {path: '/', component: Dashboard},
    {path: '/parent', component: Parent},
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
