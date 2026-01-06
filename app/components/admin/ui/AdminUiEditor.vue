<script setup lang="ts">
import { ICONS_HERO } from '~/constants/icons/hero'
import type { EditorToolbarItem } from '#ui/components/EditorToolbar.vue'

const model = defineModel<string>({
  default: ''
})

const tools: EditorToolbarItem[][] = [
  [
    {
      label: 'Заголовок',
      content: {
        align: 'start'
      },
      items: [
        {
          kind: 'heading',
          level: 1,
          icon: ICONS_HERO.H1_SOLID,
          label: 'Заголовок 1'
        },
        {
          kind: 'heading',
          level: 2,
          icon: ICONS_HERO.H2_SOLID,
          label: 'Заголовок 2'
        },
        {
          kind: 'heading',
          level: 3,
          icon: ICONS_HERO.H3_SOLID,
          label: 'Заголовок 3'
        }
      ]
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: ICONS_HERO.BOLD_SOLID,
      tooltip: { text: 'Жирный' }
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: ICONS_HERO.ITALIC_SOLID,
      tooltip: { text: 'Курсив' }
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: ICONS_HERO.UNDERLINE_SOLID,
      tooltip: { text: 'Подчеркнутый' }
    },
    {
      kind: 'mark',
      mark: 'strike',
      icon: ICONS_HERO.STRIKETHROUGH_SOLID,
      tooltip: { text: 'Перечеркнутый' }
    },
    {
      kind: 'mark',
      mark: 'code',
      icon: ICONS_HERO.CODE_BRACKET_SOLID,
      tooltip: { text: 'Код' }
    }
  ]
]
</script>

<template>
  <UEditor
    v-slot="{ editor }"
    v-model="model"
    content-type="html"
    class="w-full min-h-21"
  >
    <UEditorToolbar
      :editor="editor"
      :items="tools"
      layout="fixed"
    />
  </UEditor>
</template>
