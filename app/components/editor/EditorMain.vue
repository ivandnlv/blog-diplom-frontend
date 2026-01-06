<template>
  <editor-content
    class="editor-main"
    :editor="editor"
  />
</template>

<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const model = defineModel<string>({
  default: ''
})

const editor = useEditor({
  extensions: [StarterKit],
  content: model.value ?? '',
  onUpdate: ({ editor }) => {
    model.value = editor.getHTML()
  }
})

watch(
  model,
  (value) => {
    if (!editor.value) return

    const isSame = editor.value.getHTML() === value

    if (isSame) {
      return
    }

    editor.value.commands.setContent(value)
  }
)
</script>
