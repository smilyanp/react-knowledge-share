// import { useState } from "react"
import { useMutation } from "react-query"
import { addImage } from './api'

import { queryClient } from "../App"
import { useState } from "react"

export const AddImage = () => {
    const [newImageUrl, setNewImageUrl] = useState('https://cdn2.thecatapi.com/images/bcr.jpg')

    const onAddImage = useMutation((imgUrl: string) => addImage(imgUrl), {
        onSuccess: () => {
            // this will also update any components that have a query with the 'images' key
            queryClient.refetchQueries({ queryKey: 'images' })
            setNewImageUrl('')
            // alternatively, if the API responds with the right data, we can just update the cache for the same effect
            // without needing the API call of a 'refetch'
        }
    })

    return (
        <div>
            <input onChange={(e) => setNewImageUrl(e.target.value)} value={newImageUrl} />
            <button onClick={() => {
                onAddImage.mutate(newImageUrl)
                // setNewImageUrl('')
            }}>Add image</button>
        </div>
    )
}