<template>
  <header class="header">
    <div class="container">
      <button class="header__hamburger icon icon--medium fa fa-bars" type="button" />

      <RouterLink class="header__logo">APP </RouterLink>

      <div class="header__right">
        <button v-if="session.currentUser" class="link" type="button" @click="signOut">Sign Out</button>

        <RouterLink v-else class="link"> Sign In </RouterLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useTheSession } from '@/modules/session'

const { session, signOut } = useTheSession()
</script>
