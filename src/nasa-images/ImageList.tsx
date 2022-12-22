import { useMutation, useQuery } from "react-query"
import { queryClient } from "../App"
import { deleteImage, getImages } from "./api"

export const ImageList = () => {
    
    const { data, isLoading, isError, error } = useQuery('images', () => getImages())
    const onDeleteImage = useMutation((imgId: string) => deleteImage(imgId), {
        onSuccess: () => {
            // this will also update any components that have a query with the 'images' key
            queryClient.refetchQueries({ queryKey: 'images' })
            // alternatively, if the API responds with the right data, we can just update the cache for the same effect
            // without needing the API call of a 'refetch'
        }
    })
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError && error) {
        return <div>Something went wrong: {error.toString()}</div>
    }

    return (
        <div>
            {data && data.map((image) => (
                <div key={image.id}>
                    <img src={image.href} />
                    <button onClick={() => onDeleteImage.mutate(image.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}