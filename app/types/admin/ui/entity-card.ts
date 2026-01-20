export interface EntityCardField<T extends Record<string, any> = object> {
  accessorKey: keyof T | string
  header: string
}

export interface EntityCardListUi {
  root?: string
  cardLabel?: string
  cardTd?: string
}

export interface EntityCardUi {
  label?: string
  td?: string
}
