<script setup lang="ts">
// #region Imports
// Types
import {ITableRow} from "@/components/table/types.ts";

// Utils

// Vue

// Pinia

// Components

// #endregion

// #region Props

const {
  id,
  columns
} = defineProps<ITableRow>();
// #endregion

// #region Emits
//
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
  <tr>
    <td
      v-for="item in columns"
      :key="`row_${id}_${item.value}`"
      :class="$style.td"
    >
      <template
        v-if="item.type === 'string'"
      >
        {{ item.value }}
      </template>
      <img
        v-else
        :class="$style.img"
        :src="item.value"
        loading="lazy"
        alt="Фото"
      >
    </td>
  </tr>
</template>
<style module lang="scss">
.td{
  border: .1rem solid $gray;
  padding: 1rem 2rem;

  @include text(td);
}

.img{
  width: 7.2rem;
  height: 7.2rem;
}
</style>
