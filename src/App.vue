<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>

  <header>
    <v-container>
      <div class="wrapper">

        <img alt="Vue logo" class="logo" src="@/assets/gemini-svg.svg" width="300" height="200"/>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/admin">Area riservata</RouterLink>
          <a href="#" @click.prevent="auth.loggedIn ? auth.logout() : auth.login()">
            {{ auth.loggedIn ? 'Logout' : 'Login' }}
          </a>
        </nav>

      </div>
    </v-container>
  </header>

  <RouterView/>
</template>

<style scoped lang="scss">
header {
  height: 100px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;

  &:visited {
    color: var(--color-text);
  }
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;

  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 0;
  }
}
</style>
