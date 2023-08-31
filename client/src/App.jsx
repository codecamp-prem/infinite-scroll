import { useCallback, useEffect, useRef, useState } from "react"
import "./styles.css"
import { parseLinkHeader } from "./parseLinkHeader"

const LIMIT = 30

export default function App(){
  const [isLoading, setIsLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const nextPhotoUrlRef = useRef()

  async function fetchPhotos(url, { overwrite = false } = {}){
    setIsLoading(true)
    try{
      await new Promise(res => setTimeout(res, 3000))
      const res = await fetch(url)
      //console.log(parseLinkHeader(res.headers.get("Link")))
      nextPhotoUrlRef.current = parseLinkHeader(res.headers.get("Link")).next 

      const photos = await res.json()
      
      if (overwrite) {
        setPhotos(photos)
      }else{
        setPhotos(prevPhotos => {
          return [...prevPhotos, ...photos]
        })
      }
    }catch(error){
      console.error(error)
    }finally{
      setIsLoading(false)
    }    
  }


  const imageRef = useCallback(image => {
    if (image == null || nextPhotoUrlRef.current == null) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting){
        // load next element 
        fetchPhotos(nextPhotoUrlRef.current)
        observer.unobserve(image)
      }
    })

    observer.observe(image)
  }, [])

  useEffect(() => {
    fetchPhotos(`http://127.0.0.1:3000/photos-short-list?_page=1&_limit=${LIMIT}`, {overwrite: true})
  }, [])

  return (
    <>
      <div className="grid">
        {photos.map((photo, index) => (
          <img 
          src={photo.url} 
          key={photo.id} 
          ref={index === photos.length - 1 ? imageRef : undefined} 
          />
        ))}
        {
          isLoading && (
            Array.from({length: LIMIT}, (_, index) => index).map(n => {
              return (<div className="skeleton" key={n}>Loading...</div>)
            })
          )
        }
      </div>
    </>
  )

}


