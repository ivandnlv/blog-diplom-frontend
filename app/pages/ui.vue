<script setup lang="ts">
import type { ButtonProps } from '#ui/components/Button.vue'
import type { TableColumn } from '#ui/components/Table.vue'

const buttonsArr: {
  name: string
  color: ButtonProps['color']
}[] = [
  {
    name: 'Primary',
    color: 'primary'
  },
  {
    name: 'Secondary',
    color: 'secondary'
  },
  {
    name: 'Success',
    color: 'success'
  },
  {
    name: 'Error',
    color: 'error'
  }
]

const fakeTableData = [
  {
    id: Math.ceil(Math.random() * 100),
    name: 'Name 1',
    content: 'Text Text Text',
    status: 'SUCCESS'
  },
  {
    id: Math.ceil(Math.random() * 100),
    name: 'Name 2',
    content: 'Text Text Text',
    status: 'SUCCESS'
  },
  {
    id: Math.ceil(Math.random() * 100),
    name: 'Name 3',
    content: 'Text Text Text',
    status: 'SUCCESS'
  },
  {
    id: Math.ceil(Math.random() * 100),
    name: 'Name 4',
    content: 'Text Text Text',
    status: 'SUCCESS'
  },
  {
    id: Math.ceil(Math.random() * 100),
    name: 'Name 5',
    content: 'Text Text Text',
    status: 'SUCCESS'
  },
  {
    id: Math.ceil(Math.random() * 100),
    name: 'Name 6',
    content: 'Text Text Text',
    status: 'SUCCESS'
  }
]

const fakeTableColumns: TableColumn<typeof fakeTableData[0]>[] = [
  {
    accessorKey: 'id',
    header: 'Id'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'content',
    header: 'Content'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  }
]
</script>

<template>
  <div class="flex flex-col gap-8 min-h-svh">
    <h1 class="title-main">
      Ui-kit
    </h1>

    <span class="title-secondary">Buttons</span>

    <div
      v-for="(button, i) in buttonsArr"
      :key="`button-${i}`"
      class="flex gap-4 items-center"
    >
      <UButton :color="button.color">
        {{ button.name }}
      </UButton>

      <UButton
        :color="button.color"
        :disabled="true"
      >
        {{ button.name }} (disabled)
      </UButton>
    </div>

    <span class="title-secondary">Inputs</span>

    <div class="flex gap-4 items-start">
      <UFormField label="Label">
        <UInput placeholder="Placeholder..." />
      </UFormField>

      <UFormField
        label="Label"
        error="Error"
      >
        <UInput placeholder="Placeholder..." />
      </UFormField>

      <UFormField
        label="Label (disabled)"
      >
        <UInput
          disabled
          placeholder="Placeholder..."
        />
      </UFormField>
    </div>

    <span class="title-secondary">Switch & Checkbox</span>

    <div class="flex flex-col gap-4">
      <USwitch label="Label" />

      <UCheckbox label="Label" />
    </div>

    <span class="title-secondary">Table</span>

    <UTable
      :data="fakeTableData"
      :columns="fakeTableColumns"
    />
  </div>
</template>
