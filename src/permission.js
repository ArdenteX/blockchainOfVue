import router from "@/router";

router.beforeEach((to,from,next)=>{
    if(to.name === '/login'){
        next();
        return;
    }
    if(this.$store.state.username == null && to.name !== 'login'){
        next({path:"/"})
    }
})