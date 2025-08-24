import type { ReactElement } from 'react'
import type { filterTypes } from '../ContentFilterContext'
export interface NavContent {
   id: number
   title: filterTypes
   imgLink: ReactElement
}
