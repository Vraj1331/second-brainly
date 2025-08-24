import React, { createContext, useContext, useState } from 'react'

export type filterTypes = 'All' | 'Youtube' | 'Twitter'

interface filterContextType {
   filter: filterTypes
   setFilter: (filter: filterTypes) => void
}

const ContentCreateContext = createContext<filterContextType | undefined>(
   undefined
)

export const ContentFilterContext = ({
   children,
}: {
   children: React.ReactNode
}) => {
   const [filter, setFilter] = useState<filterTypes>('All')
   return (
      <ContentCreateContext.Provider value={{ filter, setFilter }}>
         {children}
      </ContentCreateContext.Provider>
   )
}
export const useContentFilter = () => {
   const context = useContext(ContentCreateContext)
   if (!context) {
      throw new Error(
         'useContentFilter must be used within ContentFilterProvider'
      )
   }
   return context
}
