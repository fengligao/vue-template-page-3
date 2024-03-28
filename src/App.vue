<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <nav>
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/table">通用表格</el-menu-item>
      <el-menu-item index="/page">通用页面</el-menu-item>
    </el-menu>
    <!-- <router-link class="link" to="/table">表格</router-link>
    <router-link class="link" to="/page">模版页面</router-link> -->
  </nav>
  <RouterView />
</template>

<style scoped>
.link {
  padding: 10px 30px;
}
</style>
