<script setup lang="ts">
// #region Imports
// Types
import {ITableHeadItem, TableHeadProps} from "./types.ts";

// Utils

// Vue

// Pinia

// Components

// #endregion

// #region Props
const { head, sortValue } = defineProps<TableHeadProps>();
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
const onClick = (item: ITableHeadItem) => {
  if(item.value === ''){
    return;
  }
  if(sortValue === item.value){
    emit('update', `-${item.value}`);
    return;
  }
  if(sortValue?.replace('-','') === item.value){
    emit('update','');
  }
  emit('update', item.value);
};
// #endregion
</script>

<template>
  <thead :class="$style.TableHead">
    <tr>
      <th
        v-for="item in head"
        :key="`head_${item.value||item.label}`"
        :class="[
          $style.th,
          {[$style._disabled]: !item.value},
          {[$style._active]: item.value && item.value === sortValue},
          {[$style._activeReverse]: item.value && item.value === sortValue?.replace('-','')}
        ]"
        scope="col"
        @click="onClick(item)"
      >
        <button>{{ item.label }}<span>{{ ">" }}</span></button>
      </th>
    </tr>
  </thead>
</template>

<style module lang="scss">
.TableHead {
  background: rgba($gray, .2);
}

.th {
  padding: 1rem 2rem;
  border: .1rem solid $gray;
  cursor: pointer;

  span{
    display: none;
    transition: transform $default-transition;
  }

  button{
    @include text(th);

    display: inline-flex;
    column-gap: .5rem;
    cursor: pointer;
  }

  &._disabled{
    cursor: default;

    button {
      cursor: default;
    }
  }

  &._activeReverse{
    span{
      display: block;
      transform: rotate(90deg);
    }
  }

  &._active{
    span{
      display: block;
      transform: rotate(-90deg);
    }
  }
}
</style>
