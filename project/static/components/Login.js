export default({
    data:()=>({
       user :{
           email:'',
           password:''
       },
        error:''
    }),
    methods:{
        async login(){
            fetch('/user-login',
                {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.user)
                    }
                )

                .then(async (res) => {
                    const data = await res.json();
                    if (res.ok) {
                        localStorage.setItem('auth-token', data.token)
                        localStorage.setItem('role', data.role)
                        this.$router.push({path: '/'})
                    } else {

                        this.error = data.message
                    }

                });
        }
    },
    template:`
    <div class="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div class="col-lg-4">
            <div>
                <h3>Login</h3>
                <div class="alert alert-danger" v-if="error!=''">
                    {{error}}
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" v-model="user.email" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" v-model="user.password" class="form-control"/>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-dark" @click="login">
                        LOGIN
                    </button>
                </div>
                <p class="mb-0 mt-2">Don't have an account yet?</p>
                <router-link to="/register">Register</router-link>
            </div>
        </div>
    </div>
    `
})
