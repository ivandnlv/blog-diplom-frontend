export interface EntityCardField<T extends Record<string, any> = object> {
  accessorKey: keyof T | string
  header: string
}
