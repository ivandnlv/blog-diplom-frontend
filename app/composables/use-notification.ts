export const useSuccessNotification = (message: string = 'Успех!') => {
  const toast = useToast()

  toast.add({
    title: message
  })
}
