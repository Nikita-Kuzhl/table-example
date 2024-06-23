export interface InputProps {
    /**
     * Текущее введёное значение
     */
    modelValue?: string;

    /**
     * Даёт возможность отключить autocomplete при вводе
     */
    autocomplete?: boolean;

    /**
     * Плейсхолдер инпута
     */
    placeholder?: string;
    disabled?: boolean;
}
