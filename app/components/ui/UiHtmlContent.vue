<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <div
    class="ui-html-content"
    v-html="content"
  />
</template>

<style lang="scss">
.ui-html-content {
  /* базовые */
  color: inherit;
  font-size: 1rem;
  line-height: 1.75;
  word-break: break-word;
  overflow-wrap: anywhere;

  /* чтобы контент не прилипал */
  > *:first-child { margin-top: 0; }
  > *:last-child { margin-bottom: 0; }

  /* заголовки */
  h1, h2, h3 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 1.25rem 0 0.75rem;
  }

  h1 {
    font-size: 1.75rem;
    margin-top: 0.25rem;
  }

  h2 {
    font-size: 1.375rem;
    margin-top: 1.5rem;
  }

  h3 {
    font-size: 1.125rem;
    margin-top: 1.25rem;
  }

  /* параграфы */
  p {
    margin: 0.75rem 0;
  }

  /* жирный */
  b, strong {
    font-weight: 700;
  }

  /* курсив (на всякий) */
  i, em {
    font-style: italic;
  }

  /* underline */
  u {
    text-decoration: underline;
    text-underline-offset: 0.18em;
    text-decoration-thickness: 0.08em;
  }

  /* зачёркнутый */
  s, del, strike {
    text-decoration: line-through;
    text-decoration-thickness: 0.08em;
    opacity: 0.85;
  }

  /* inline code */
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.925em;
    padding: 0.15em 0.4em;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.10);
    white-space: pre-wrap;
  }

  /* если вдруг tiptap начнёт отдавать <pre><code> */
  pre {
    margin: 1rem 0;
    padding: 0.9rem 1rem;
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.10);
    overflow: auto;
    line-height: 1.6;
  }

  pre code {
    padding: 0;
    border: 0;
    background: transparent;
    font-size: 0.95em;
    white-space: pre;
  }
}
</style>
