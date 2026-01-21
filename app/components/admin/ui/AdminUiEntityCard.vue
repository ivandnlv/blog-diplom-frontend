<script setup lang="ts" generic="T extends Record<string, any> = object">
import type { EntityCardField, EntityCardUi } from '~/types/admin/ui/entity-card'

const props = defineProps<{
  data: T
  label?: string
  fields: EntityCardField<T>[]
  ui?: EntityCardUi
}>()

const mergedUi = computed<EntityCardUi>(() => {
  if (!props.ui) return {
    td: 'pr-4 py-2'
  }

  return {
    td: ['pr-4 py-2', 'td' in props.ui ? props.ui.td : ''].join(' '),
    label: 'label' in props.ui ? props.ui.label : ''
  }
})
</script>

<template>
  <UCard
    :ui="{
      body: 'h-full flex flex-col gap-4'
    }"
  >
    <span
      v-if="label"
      :class="mergedUi.label"
    >{{ label }}</span>

    <table class="max-[420px]:flex max-[420px]:flex-col table-fixed w-full">
      <tbody class="max-[420px]:flex max-[420px]:flex-col">
        <tr
          v-for="(field, i) in fields"
          :key="i"
          class="max-[420px]:flex max-[420px]:flex-col"
        >
          <td :class="mergedUi.td">
            <b class="font-semibold">{{ field.header }}:</b>
          </td>

          <td :class="mergedUi.td">
            <slot
              v-if="$slots[`${String(field.accessorKey)}-row`]"
              :name="`${String(field.accessorKey)}-row`"
              :field="field"
            />

            <span
              v-else-if="field.accessorKey in data"
            >{{ data[field.accessorKey] }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <slot name="bottom" />
  </UCard>
</template>
