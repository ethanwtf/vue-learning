import UserRegister from '../../views/register/UserRegister.vue';
import UserLogin from '../../views/login/UserLogin.vue';
import UserProfile from '../../views/profile/UserProfile.vue';

const userRouter = [
    {
        path: '/register',
        name: 'register',
        component: UserRegister,
    },
    {
        path: '/login',
        name: 'login',
        component: UserLogin,
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            auth: true,
        },
        component: UserProfile,
    },
];

export default userRouter;
