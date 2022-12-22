interface ImageItem {
    href: string,
    id: string
}

const apiUrl = 'http://localhost:9001/images'

export const getImages = (): Promise<ImageItem[]> => 
    fetch(apiUrl).then(res => res.json())

export const addImage = (href: string) =>
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            href
        })
    })
export const deleteImage = (id: string) =>
    fetch(apiUrl + '/' + id, {
        method: 'DELETE'
    })
