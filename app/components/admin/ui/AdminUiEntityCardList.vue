<script setup lang="ts" generic="T extends Record<string, any> = object">
import type { EntityCardField } from '~/types/admin/ui/entity-card'

const props = defineProps<{
  itemLabel?: string
  fields: EntityCardField<T>[]
  data: T[]
}>()

const slots = useSlots()

const fieldsBySlots = computed<EntityCardField<T>[]>(() => {
  const slotsKeysWithoutRow = Object.keys(slots).map(item => item.replace('-row', ''))

  return props.fields.reduce((acc, current) => {
    const accessorKey = String(current.accessorKey)

    if (slotsKeysWithoutRow.includes(accessorKey)) {
      acc.push(current)
    }

    return acc
  }, [] as EntityCardField<T>[])
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <AdminUiEntityCard
      v-for="(item, i) in data"
      :key="i"
      :data="item"
      :fields="fields"
      :label="itemLabel"
    >
      <template
        v-for="f in fieldsBySlots"
        #[`${String(f.accessorKey)}-row`]
      >
        <slot
          v-if="$slots[`${String(f.accessorKey)}-row`]"
          :name="`${String(f.accessorKey)}-row`"
          :item="item"
        />
      </template>

      <template
        v-if="$slots['item-bottom']"
        #bottom
      >
        <slot
          name="item-bottom"
          :item="item"
        />
      </template>
    </AdminUiEntityCard>
  </div>
</template>
