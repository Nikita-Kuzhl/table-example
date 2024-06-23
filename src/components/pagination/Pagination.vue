<script setup lang="ts">
// #region Imports
// Types
import type {PaginationProps} from "@/components/pagination/types.ts";

// Utils

// Vue
import {computed} from "vue";

// Pinia

// Components

// #endregion

// #region Props
const {limit, offset, total} = defineProps<PaginationProps>();
// #endregion

// #region Emits
const emit = defineEmits<{
  'update': [value: number],
}>();
// #endregion

// #region Data
//
// #endregion

// #region Computed
const pageList = computed(() => {
  const pageCount = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  const pagesToShow = 5; // Количество страниц для отображения

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(pageCount, startPage + pagesToShow - 1);

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
});
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
  <div :class="$style.Pagination">
    <button
      v-if="offset !== 0"
      :class="$style.btn"
      @click="emit('update', offset - limit)"
    >
      {{ "<" }}
    </button>
    <div :class="$style.list">
      <button
        v-for="item in pageList"
        :key="`pagination_item_${item}`"
        :class="[$style.btn, {[$style._active]: item === offset / limit + 1}]"
        @click="emit('update',(item - 1) * limit)"
      >
        {{ item }}
      </button>
    </div>
    <button
      v-if="offset + limit < total"
      :class="$style.btn"
      @click="emit('update', offset + limit)"
    >
      {{ ">" }}
    </button>
  </div>
</template>

<style module lang="scss">
.Pagination {
  display: flex;
  width: 100%;
  justify-content: center;
  column-gap: .5rem;
}

.list{
  display: flex;
  column-gap: .5rem;
}

.btn{
  display: flex;
  width: 4rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  background: rgba($gray, .2);
  cursor: pointer;
  font-weight: 400;
  transition: all $default-transition;

  &:not(._active){
    @include hover{
      opacity: .7;
    }
  }

  &._active{
    background: $red;
    color: #fff;
  }
}
</style>
