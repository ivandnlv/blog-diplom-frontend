<script setup lang="ts" generic="T extends Record<string, any> = object">
import type { EntityCardField } from '~/types/admin/ui/entity-card'

defineProps<{
  data: T
  label?: string
  fields: EntityCardField<T>[]
}>()
</script>

<template>
  <UCard>
    <span v-if="label">{{ label }}</span>

    <table class="table-fixed w-full">
      <tbody>
        <tr
          v-for="(field, i) in fields"
          :key="i"
        >
          <td class="pr-4 py-2">
            <b class="font-semibold">{{ field.header }}:</b>
          </td>

          <td class="truncate">
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
