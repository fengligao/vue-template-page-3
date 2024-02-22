<template>
  <el-container>
    <el-header>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
  {{ formObj.name }}: {{ formObj.age }}

  <h1> {{ count }}</h1>
  <el-button @click="plusCount">加加</el-button>
  <el-button @click="reduceCount"> 减减</el-button>
</template>

<script setup lang="ts">
import { formObj } from "./pageVariable";

import { useCount } from "./pageVariable";

const { count, plusCount, reduceCount } = useCount();
</script>

<style scoped>
</style>