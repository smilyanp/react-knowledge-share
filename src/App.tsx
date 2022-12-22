import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ImageList } from './nasa-images/ImageList'
import { AddImage } from './nasa-images/AddImage'

export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddImage />
      <ImageList />
    </QueryClientProvider>
  )
}

export default App
