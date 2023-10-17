<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue';
// import {certificates, useCertificates, fetchCertificates } from '@/composables/useCertificates.ts';
import dayjs from 'dayjs';
import TableLite from "vue3-table-lite/ts";

const certificates = defineProps({
  value: Array<rowData>
});

// onMounted(() => {
//   fetchCertificates();
// });

const myChildMethod = () => {
  console.log("Called the child's method!");
};

// Define row data interface
interface rowData {
  _id: Number,
  number: Number,
  name: String,
  fromDate: Date,
  toDate: Date,
  subject: String,
  level: String,
  duration: Number,
  teacher: String
}

const table = reactive({
  isLoading: false,
  isReSearch: false,
  rowClasses: (row: rowData) => {
    if (row.number == 1) {
      return ["aaa", "is-number-one"];
    }
    return ["bbb", "other"];
  },
  columns: [
    // {
    //   label: "ID",
    //   field: "_id",
    //   width: "3%",
    //   sortable: true,
    //   isKey: true,
    // },
    {
      label: "number",
      field: "number",
      width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Name",
      field: "name",
      width: "10%",
      sortable: true,
      display: function (row: rowData) {
        return (
          '<a href="#" data-number="' +
          row.number +
          '" class="is-rows-el name-btn">' +
          row.name +
          "</a>"
        );
      },
    },
    {
      label: "Subject",
      field: "subject",
      width: "5%",
      sortable: true,
    },
    {
      label: "Level",
      field: "level",
      width: "5%",
    },
    {
      label: "Duration",
      field: "duration",
      width: "5%",
    },
    {
      label: "From",
      field: "fromDate",
      width: "10%",
      display: function (row: rowData) {
        return dayjs(row.fromDate).format('DD-MM-YYYY');
      },
    },
    {
      label: "To",
      field: "toDate",
      width: "10%",
      display: function (row: rowData) {
        return dayjs(row.toDate).format('DD-MM-YYYY');
      },
    },
    {
      label: "",
      field: "_id",
      width: "10%",
      display: function (row: rowData) {
        return (
          '<button type="button" data-number="' +
          row._id +
          '" class="is-rows-el quick-btn">Button</button>'
        );
      },
    },
  ],
  rows: [] as Array<rowData>,
  totalRecordCount: 0,
  sortable: {
    order: "number",
    sort: "desc",
  },
  messages: {
    pagingInfo: "Showing {0}-{1} of {2}",
    pageSizeChangeLabel: "Row count:",
    gotoPageLabel: "Go to page:",
    noDataAvailable: "No data",
  },
  pageOptions: [
    {
      value: 15,
      text: 15
    },
    {
      value: 30,
      text: 30
    }
  ]
});


const doSearch = (offset: number, limit: number, order: string, sort: string) => {
  table.isLoading = true;
  setTimeout(() => {
    table.isReSearch = offset == undefined ? true : false;
    if (offset >= 10 || limit >= 20) {
      limit = 20;
    }
    if (sort == "desc") {
      table.rows = certificates.value? certificates.value.slice(offset, offset + limit) : []
    } else {
      table.rows = certificates.value? certificates.value.slice(offset, offset + limit).reverse() : []
    }
    table.totalRecordCount = certificates.value? certificates.value.length : 0;
    table.sortable.order = order;
    table.sortable.sort = sort;
  }, 600);
  console.log(
    "doSearch"
  );
};

/**
 * Table search finished event
 */
const tableLoadingFinish = (elements: Array<HTMLElement>) => {
  table.isLoading = false;
  Array.prototype.forEach.call(elements, function (element: HTMLElement) {
    if (element.classList.contains("name-btn")) {
      element.addEventListener("click", function () {
        console.log(this.dataset.number + " name-btn click!!");
      });
    }
    if (element.classList.contains("quick-btn")) {
      element.addEventListener("click", function () {
        console.log(this.dataset.number + " quick-btn click!!");
      });
    }
  });
};

/**
 * Row checked event
 */
const updateCheckedRows = (rowsKey: number) => {
  console.log(rowsKey);
};

doSearch(0, 10, 'number', 'desc');

defineExpose({ doSearch });
</script>
  
<template>
  <div class="full">
    <!-- <ul v-for="cert in value.slice(0, 5)" :key="cert._id">
      <li class="certificate">
        {{ cert.number }} - {{ cert.name }}
      </li>
    </ul> -->
    <table-lite :is-fixed-first-column="true" :has-checkbox="true" :is-loading="table.isLoading" :is-re-search="table.isReSearch"
      :columns="table.columns" :rows="table.rows" :rowClasses="table.rowClasses" :total="table.totalRecordCount"
      :sortable="table.sortable" :messages="table.messages" :page-options="table.pageOptions" @do-search="doSearch"
      @is-finished="tableLoadingFinish" @return-checked-rows="updateCheckedRows"></table-lite>
  </div>
</template>