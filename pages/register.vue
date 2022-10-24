<template>
    <section class="login">
        <div class="login__container">
            <form class="login__form" @submit.prevent="register">
                <div class="login__form-container">
                    <div class="login__form-head">
                        <div class="login__form-head-img">
                            <img src="~/assets/img/logo.png" alt="MapsOs">
                        </div>
                        <p class="login__form-head-subtitle">
                            Create a new account
                        </p>
                    </div>
                    <div class="login__form-groups">
                        <div class="login__form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="email" placeholder="email@example.com" :disabled="disabled" />
                        </div>
                        <div class="login__form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" v-model="username" placeholder="JohnDoe123" :disabled="disabled" />
                        </div>
                        <div class="login__form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" v-model="password" placeholder="********" :disabled="disabled" />
                        </div>
                        <div class="login__form-group">
                            <label for="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="********" :disabled="disabled" />
                        </div>
                        <div class="login__form-group">
                            <!-- Login -->
                            <div class="login__form-group-register">
                                <nuxt-link to="/login">Already registered ? </nuxt-link>
                            </div>
                        </div>
                        <div class="login__form-group">
                            <button type="submit" :disabled="disabled">Register</button>
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
            username: '',
            password: '',
            confirmPassword: '',
            disabled: false
        }
    },
    async mounted() {
        await this.isAuth();
    },
    methods: {
        async register() {
            this.disabled = true;

            try {
                if (this.password !== this.confirmPassword) {
                    this.password = '';
                    this.confirmPassword = '';
                    this.disabled = false;
                    return this.$toast.error("Password do not match");
                }

                const res = await this.$axios.post('/auth/register', {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                });

                if(res.status !== 201) {
                    this.password = '';
                    this.confirmPassword = '';
                    this.disabled = false;
                    return this.$toast.error("Registration failed");
                }

                this.$toast.success('Registered successfully! Redirecting to login page...');
                return this.$router.push('/login');
            } catch (err) {
                this.password = '';
                this.confirmPassword = '';
                this.disabled = false;
                return this.$toast.error("Registration failed");
            }
        },
        async isAuth() {
            const token = localStorage.getItem('token');
            if(token) {
                try {
                    this.$axios.setHeader("Authorization", "Bearer " + token);
                    var res = await this.$axios.post('/auth/me');

                    if (res.status !== 200) {
                        localStorage.removeItem('token');
                    }

                    return this.$router.push('/');
                } catch (err) {
                    localStorage.removeItem('token');
                    return this.$router.push('/login');
                }
            }
        }
    }
}
</script>