export const useIsMobile = (mediaQuery: string = '(max-width: 1024px)') => {
  return computed(() => {
    const { isMobileOrTablet } = useDevice()

    const isMediaQuery = useMediaQuery(mediaQuery)

    return isMobileOrTablet && isMediaQuery.value
  })
}
