<template>
  <v-layout v-resize="onResize" fill-height column>
    <v-data-table
      dense
      ref="vDataTable"
      :headers="headers"
      :items="items"
      :search="search"
      item-key="_id"
      mobile-breakpoint="0"
      class="elevation-2 mx-sm-8"
      hide-deault-heade
      hide-default-footer
      :class="{ mobile: isMobile }"
      @click="handleClick"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('listing.TITLE') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-toolbar>
      </template>
      <template v-slot:body="{ items }">
        <template v-if="!isMobile">
          <tbody>
            <tr v-for="(item, i) in items" :key="`${i}-row`">
              <td v-for="(header, index) in headers" :key="`${index}-col`">
                {{ item[header.value] }}
              </td>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tr v-for="(item, i) in items" :key="`${i}-row`">
            <td colspan="2">
              <ul class="flex-content">
                <li
                  :data-label="header"
                  class="flex-item"
                  v-for="(header, index) in headers"
                  :key="`${index}-col`"
                >
                  {{ item[header.value] }}
                </li>
              </ul>
            </td>
          </tr>
        </template>
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip :color="item.status ? 'success' : 'error'" dark>
          {{ item.status ? 'Done' : 'Waiting' }}
        </v-chip>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
export default {
  name: 'datatableComponent',
  props: ['items', 'headers'],
  data() {
    return {
      search: '',
      isMobile: false
    }
  },
  methods: {
    handleClick(item) {
      console.log(item)
      // this.highlightClickedRow(value)
    },
    onResize() {
      console.log(window.innerWidth)
      if (window.innerWidth < 769) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
   .mobile {
      color: #333;
    }

    @media screen and (max-width: 768px) {
      .mobile table.v-table tr {
        max-width: 100%;
        position: relative;
        display: block;
      }

      .mobile table.v-table tr:nth-child(odd) {
        border-left: 6px solid deeppink;
      }

      .mobile table.v-table tr:nth-child(even) {
        border-left: 6px solid cyan;
      }

      .mobile table.v-table tr td {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        height: auto;
        padding: 10px;
      }

      .mobile table.v-table tr td ul li:before {
        content: attr(data-label);
        padding-right: .5em;
        text-align: left;
        display: block;
        color: #999;

      }
      .v-datatable__actions__select
      {
        width: 50%;
        margin: 0px;
        justify-content: flex-start;
      }
      .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
        background: transparent;
      }

    }
    .flex-content {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    .flex-item {
      padding: 5px;
      width: 50%;
      height: 40px;
      font-weight: bold;
    }
</style>
