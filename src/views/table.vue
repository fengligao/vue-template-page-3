<template>
  <miji-table :columns="columns" :dataSource="dataSource"></miji-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const columns = ref([
  { prop: "index", label: "序号", width: "80px" },
  { prop: "date", label: "Date" },
  { prop: "name", label: "Name" },
  {
    prop: "state",
    label: "State",
  },
  { prop: "city", label: "City", minWidth: "120px" },
  { prop: "address", label: "Address", minWidth: "120px" },
  { prop: "zip", label: "Zip", minWidth: "120px" },
  { prop: "tag", label: "Tag", minWidth: "120px" },
  {
    prop: "option",
    label: "操作",
    fixed: "right",
    type: "options",
    options: [
      {
        type: "primary",
        text: "查看",
        clickEvent: (row) => optionsFunction(row),
      },
      {
        type: "danger",
        text: "编辑",
        disabled: (row) => row.tag === "Office",
        clickEvent: (row) => optionsFunction(row),
      },
      {
        type: "info",
        text: "删除",
        clickEvent: (row) => optionsFunction(row),
      },
      {
        type: "info",
        text: "其他",
        clickEvent: (row) => optionsFunction(row),
      },
    ],
  },
]);

const dataSource = ref([]);

const optionsFunction = (row) => {
  console.log(row);
};

onMounted(() => {
  setTimeout(() => {
    dataSource.value = [
      {
        date: "2016-05-03",
        name: "Tom",
        state: "California",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        zip: "CA 90036",
        tag: "Home",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        state: "California",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        zip: "CA 90036",
        tag: "Office",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        state: "California",
        city: "Los Angeles",
        address: "No. 189, Grove St, Los Angeles",
        zip: "CA 90036",
        tag: "Home",
      },
    ];
  }, 1000);
});
</script>

<style scoped></style>
