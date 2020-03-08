<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create Account
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          Already Have an Account?
          <router-link :to="{ name: 'login' }" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            Sign in
          </router-link>
        </p>
      </div>
      <form class="mt-8" @submit.prevent="register" @keydown="form.onKeydown($event)">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Name
            </label>
            <input v-model="form.name" :class="{ 'border-red-500': form.errors.has('name') }" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10" id="grid-first-name" type="text" placeholder="Jane" name="name" required>
            <has-error :form="form" field="name" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
              Email address
            </label>
            <input v-model="form.email" :class="{ 'border-red-500': form.errors.has('email') }" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10" id="grid-first-name" type="email" placeholder="example@example.com" name="email" required>
            <has-error :form="form" field="email" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Password
            </label>
            <input v-model="form.password" :class="{ 'border-red-500': form.errors.has('password') }" class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10" id="grid-password" type="password" placeholder="******************" name="password" required>
            <has-error :form="form" field="password" />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Confirmation Password
            </label>
            <input v-model="form.password_confirmation" :class="{ 'border-red-500': form.errors.has('password_confirmation') }" class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10" id="grid-password" type="password" placeholder="******************" name="password_confirmation" required>
            <has-error :form="form" field="password_confirmation" />
          </div>
        </div>
        <div class="mt-6">
          <button :class="{ 'loading': form.busy }" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            <span class="absolute left-0 inset-y pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Form from 'vform'

export default {
  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('register') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    mustVerifyEmail: false
  }),

  methods: {
    async register () {
      axios.get('/airlock/csrf-cookie').then(async response => {
          // Register the user.
          const { data } = await this.form.post('/register')

          // Save the token.
          this.$store.dispatch('auth/setLogin')

          // Fetch user.
          this.$store.dispatch('auth/fetchUser')

          // Redirect home.
          this.$router.push({ name: 'home' })

      });
    }
  }
}
</script>
