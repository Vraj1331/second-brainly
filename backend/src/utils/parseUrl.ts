export const parseUrl = (url: string): string | undefined => {
   const splitUrl = url.trim().split('/')
   const extractYoutubeId = splitUrl[3]
   const baseUrl = 'https://www.youtube.com/embed/'
   const finalUrl = baseUrl + extractYoutubeId
   return finalUrl
}
