import type { TableColumn } from '#ui/components/Table.vue'
import type { PostEntity } from '~/types/post'

export const POSTS_ADMIN_TABLE_COLUMNS: TableColumn<PostEntity>[] = [
  {
    header: 'Заголовок',
    accessorKey: 'title'
  },
  {
    header: 'Код',
    accessorKey: 'slug'
  },
  {
    header: 'Опубликована',
    accessorKey: 'published'
  },
  {
    header: 'Дата создания',
    accessorKey: 'createdAt'
  },
  {
    header: 'Дата последнего изменения',
    accessorKey: 'updatedAt'
  }
]
