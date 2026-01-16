<script setup lang="ts">
import { ICONS_HERO } from '~/constants/icons/hero'
import type { EditorToolbarItem } from '#ui/components/EditorToolbar.vue'

const model = defineModel<string>({
  default: ''
})

const emit = defineEmits<{
  (e: 'update:images', value: string[]): void
}>()

const editorRef = useTemplateRef('editorRef')

const editor = computed(() => editorRef.value?.editor ?? null)

const currentImages = ref<string[]>([])

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
  ],
  [
    {
      kind: 'image',
      icon: ICONS_HERO.PHOTO_20_SOLID,
      tooltip: { text: 'Вставить изображение' }
    }
  ]
]
function registerImageInsertListener() {
  if (!editor.value) return

  const editorContentImages = editor.value.$doc.content?.toJSON()?.filter((item: any) => item.type === 'image')?.map((item: any) => item?.attrs?.src)

  if (!editorContentImages?.length) return

  let isHaveNew = editorContentImages.length !== currentImages.value.length

  editorContentImages.forEach((src: string) => {
    if (!currentImages.value.includes(src)) isHaveNew = true
  })

  if (!isHaveNew) return

  currentImages.value = editorContentImages

  emit('update:images', currentImages.value?.length ? currentImages.value : [])
}

const debouncedRegister = useDebounceFn(registerImageInsertListener, 500)

watch(editor, debouncedRegister, { deep: true })
</script>

<template>
  <UEditor
    ref="editorRef"
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
