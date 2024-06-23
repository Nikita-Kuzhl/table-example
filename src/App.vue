<script setup lang="ts">
// #region Imports
// Types
import type {IInfo, IUser, IUserReqQuery, IUserResponse} from "@/types/user.ts";
import type { ITableRow } from "@/components/table/types.ts";

// Vue
import {nextTick, onMounted, ref} from "vue";

// Components
import TableWrapper from "@/components/table/TableWrapper.vue";
import UIInput from "@/components/input/UIInput.vue";

// Mock
import headData from '@/assets/data/table.json';

// Utils
import {getFormatedDate} from "@/utils/text.ts";
import {objectToQuery, queryToQueryObject} from "@/utils/query-utils.ts";

// Assets
import searchIcon from '@/assets/icons/search.svg';
import Pagination from "@/components/pagination/Pagination.vue";
// #endregion

// #region Props
//
// #endregion

// #region Emits
//
// #endregion

// #region Data
const list = ref<ITableRow[]>();
const info = ref<IInfo>();
const queryValues = ref<IUserReqQuery>({
  offset: 0,
  search: '',
  sort: '',
});
const isLoading = ref<boolean>(false);
// #endregion

// #region Computed
//
// #endregion

// #region Watch

// endregion

// #region Lifecycle
onMounted(async ()=>{
  queryValues.value = queryToQueryObject(window.location.search);
  await getUsers(queryValues.value);
});
// #endregion

// #region Methods
const getUsers = async (objQuery?: IUserReqQuery) => {
  if(isLoading.value){
    return;
  }
  try {
    isLoading.value = true;
    const query = objQuery ? objectToQuery<IUserReqQuery>(objQuery): '';
    if(objQuery){
      queryValues.value = objQuery;
      window.history.replaceState(null, "", query?`/?${query}`:'/');
    }
    const res = await fetch(`/api/user/?${query}`);
    const data = await res.json() as IUserResponse;
    list.value = getFormatedRows(data.results);
    info.value = data.info;
  }catch (error) {
    console.error('[App/getUsers] - ', error);
  }finally {
    await nextTick();
    isLoading.value = false;
  }
};

const getFormatedRows = (data: IUser[]):ITableRow[] => {
  return data.map(item=>{
    return {
      id: item.id.value|| item.phone,
      columns: [
        // Аватар
        {
          type: 'img',
          value: item.picture.medium,
        },
        // ФИО
        {
          type: 'string',
          value: `${item.name.title} ${item.name.first} ${item.name.last}`
        },
        // Пол
        {
          type: 'string',
          value: item.gender,
        },
        // Страна
        {
          type: 'string',
          value: item.location.country,
        },
        // Дата рождения
        {
          type: 'string',
          value: getFormatedDate(item.dob.date)
        },
        // Email
        {
          type: "string",
          value: item.email,
        },
        // Телефон
        {
          type: "string",
          value: item.phone
        }
      ]
    };
  });
};
// #endregion
</script>

<template>
  <div
    :class="$style.page"
    class="container"
  >
    <p>Для работы сортировки нужно нажать на заголовки в таблице (Пример: ФИО, Пол, Страна, Дата рождения, Email, Телефон)</p>
    <!-- Поиск  -->
    <UIInput
      :model-value="queryValues.search"
      name="search"
      placeholder="Поиск"
      aria-label="Поиск"
      :autocomplete="false"
      :disabled="isLoading"
      @update:model-value="queryValues.search = $event"
      @submit="getUsers({search: queryValues.search, offset: 0, sort: ''})"
    >
      <template #suffix>
        <button
          :class="$style.searchBtn"
          @click="getUsers({search: queryValues.search, offset: 0, sort: ''})"
        >
          <searchIcon />
        </button>
      </template>
    </UIInput>
    <!--  Таблицы  -->
    <div :class="$style.tableWrapper">
      <TableWrapper
        v-if="list && list.length"
        :head="headData.headColumns"
        :list="list"
        :sort-value="queryValues.sort"
        @update="getUsers({...queryValues, offset: 0, sort: $event})"
      />
    </div>
    <!--  Пагинация  -->
    <Pagination
      v-if="info?.results"
      :offset="Number(queryValues.offset)||0"
      :limit="20"
      :total="info.results"
      @update="getUsers({...queryValues, offset: $event})"
    />
  </div>
</template>

<style lang="scss" module>
 .page{
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding-top: 2rem;
   padding-bottom: 2rem;
   row-gap: 2rem;
 }

 .searchBtn{
   width: 4rem;
   height: 4rem;
   padding: 1rem;
   color: $gray;
   cursor: pointer;
 }

 .tableWrapper{
   overflow-x: scroll;
   width: 100%;
   display: flex;

   @include respond-to(mobile){
     width: calc(100vw - 4rem);
   }
 }
</style>
