<script setup lang="ts">
// #region Imports
// Types
import {TableWrapperProps} from "./types.ts";

// Utils

// Vue

// Pinia

// Components
import TableHead from "./TableHead.vue";
import TableRow from "@/components/table/TableRow.vue";

// #endregion

// #region Props
const {
    head,
    list,
    sortValue
} = defineProps<TableWrapperProps>();
// #endregion

// #region Emits
const emit = defineEmits<{
  'update': [value: string],
}>();
// #endregion

// #region Data
//
// #endregion

// #region Computed
//
// #endregion

// #region Watch
//
// endregion

// #region Lifecycle

// #endregion

// #region Methods
//
// #endregion
</script>

<template>
  <table :class="$style.Table">
    <TableHead
      :head="head"
      :sort-value="sortValue"
      @update="emit('update',$event)"
    />
    <template v-if="list && list.length">
      <TableRow
        v-for="item in list"
        :id="`table_row_${item.id}`"
        :key="`table_row_${item.id}`"
        :columns="item.columns"
      />
    </template>
  </table>
</template>

<style module lang="scss">
.Table {
  border-collapse: collapse;
  border: .1rem solid $gray;
  width: 100%;
}
</style>
