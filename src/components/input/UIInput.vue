<script setup lang="ts">
// #region Imports
// Types
import type {InputProps} from "@/components/input/types.ts";

// Utils

// Vue
import {computed, ref, useAttrs, useCssModule} from "vue";

// Pinia

// Components

// #endregion

// #region Props
const {modelValue, autocomplete, placeholder, disabled } = defineProps<InputProps>();
// #endregion

// #region Emits
const emit = defineEmits<{
  focus: [value: FocusEvent],
  blur: [value: FocusEvent],
  input: [value: Event],
  submit: []
  'update:modelValue': [value: string],
}>();

// #endregion

// #region Data
const $style = useCssModule();
const attrs = useAttrs();
const isFocused = ref(false);
// #endregion

// #region Computed
const attributes = computed(() => {
  const attrsValue = {
    ...attrs,
    type: 'text',
    ariaLabel: '',
    maxlength: 524288,
    autocomplete: 'on',
    class: '',
  };

  if (!autocomplete) {
    attrsValue.autocomplete = 'off';
  }

  return attrsValue;
});

const classList = computed(() => [
  {
    [$style._focused]: isFocused.value,
    [$style._active]: modelValue || true,
    [$style._disabled]: disabled,
  },
]);


// #endregion

// #region Watch
//
// endregion

// #region Lifecycle

// #endregion

// #region Methods
const onFocus = (e: FocusEvent) => {
  isFocused.value = true;
  emit('focus', e);
};

const onBlur = (e: FocusEvent) => {
  isFocused.value = false;
  emit('blur', e);
};

const onInput = (e: Event) => {
  emit('input', e);
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const onKeyPress = (e: KeyboardEvent) => {
  if(e.key === 'Enter' && isFocused.value){
    emit('submit');
  }
};

// #endregion
</script>

<template>
  <div :class="[$style.UIInput, classList]">
    <input
      v-bind="attributes"
      :placeholder="placeholder"
      :tabindex="0"
      :value="modelValue"
      :class="$style.native"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @keypress="onKeyPress"
    >
    <div
      v-if="$slots.suffix"
      :class="$style.suffix"
    >
      <slot
        name="suffix"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.UIInput {
  position: relative;
  height: 4.8rem;
  width: 40rem;
  border-radius: 4rem;
  border: .1rem solid $gray;
  display: flex;
  align-items: center;
  transition: border-color $default-transition;

  @include respond-to(mobile){
    width: 100%;
  }

  .suffix{
    position: absolute;
    right: 1rem;
  }

  .native{
    @include text(input);

    padding: 0 5rem 0 2rem;
    width: 100%;
  }

  &:not(._disabled,._focused){
    @include hover{
      border: .1rem solid rgba($gray,.7);
    }
  }

  &._disabled {
    cursor: not-allowed;

    .native, .suffix {
      pointer-events: none;
    }

    ::placeholder {
      user-select: none;
    }
  }
}
</style>
