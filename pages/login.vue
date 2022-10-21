<template>
    <section class="login">
        <div class="login__container">
            <form class="login__form" @submit.prevent="login">
                <div class="login__form-container">
                    <div class="login__form-head">
                        <div class="login__form-head-img">
                            <img src="~/assets/img/logo.png" alt="MapsOs">
                        </div>
                        <p class="login__form-head-subtitle">Please login to your account</p>
                    </div>
                    <div class="login__form-groups">
                        <div class="login__form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="email" placeholder="email@example.com" :disabled="disabled" />
                        </div>
                        <div class="login__form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" v-model="password" placeholder="********" :disabled="disabled" />
                        </div>
                        <div class="login__form-group">
                            <!-- Register -->
                            <div class="login__form-group-register">
                                <nuxt-link to="/register">Don't have an account ? </nuxt-link>
                            </div>
                        </div>
                        <div class="login__form-group">
                            <button type="submit" :disabled="disabled">Login</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="login__background">
                <img src="~/assets/img/login-background.png" alt="MapsOs">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            disabled: false
        }
    },
    methods: {
        async login() {
            this.disabled = true;
            try {
                const res = await this.$axios.post('/auth/login', {
                    email: this.email,
                    password: this.password
                });

                if(res.status !== 200) {
                    this.password = '';
                    this.disabled = false;
                    return this.$toast.error('Login failed');
                }

                this.$toast.success('Login successful');
                localStorage.setItem('token', res.data.token);
                return this.$router.push('/');

            } catch (err) {
                this.password = '';
                this.disabled = false;
                console.log(err);
                return this.$toast.error(err);
            }            
        }
    }
}
</script>