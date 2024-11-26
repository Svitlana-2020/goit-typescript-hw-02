import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { MouseEvent } from 'react';
import ImageGallery from "./components/ImageGallery";
import { fetchPhotosByTitle } from "./photos-api";
import { ApiResponse, Photo } from "./App.types";
import LoadMoreBtn from './components/LoadMoreBtn'
import ImageModal from "./components/ImageModal";
import Loader from "./components/Loader";
import ErrorMessage from './components/ErroMessage'
// import iziToast from "izitoast";
// import 'izitoast/dist/css/iziToast.min.css';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [totalPhotos, setTotalPhotos] = useState<number>(0)
  const [title, setTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    if(!title) {
      return;
    }
const getPhotos = async (): Promise<void> => {
    try {

      setLoading(true);
      setError(false);
 
      const data: ApiResponse = await fetchPhotosByTitle(title, page);
      setTotalPhotos(Math.ceil(data.total / 10));
      console.log(totalPhotos);
      setPhotos(prevPhotos => [...prevPhotos, ...data.results]);
      setLoadMore(false)

    } catch {
      setError(true);
    //   iziToast.error({
    //     title: 'Error',
    //     message: 'Whoops, something went wrong! Please try reloading this page!',
    // });
    } finally {
      setLoading(false);
    }
  }
  getPhotos()},
  [page, title])

  const handleSearch = (newTitle: string): void => {
      setTitle(newTitle)
      setPage(1)
      setPhotos([])
  }
  
  const handleLoadMore = (evt: MouseEvent<HTMLButtonElement>) => {

    evt.preventDefault();
    setLoadMore(true);
    setPage(page+1)
 }

 
 const isOpen = (photo: Photo): void => { 
  setModalPhoto(photo);
  setIsOpen(true);
}

const isClosed = (): void => {
  setIsOpen(false);
  setModalPhoto(null); 
};

const loadMoreVisible = () => {
  return (photos.length > 0 && photos.length < totalPhotos * 10);
}

  return (
    <>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <div>
        <h1>Latest articles</h1>
        {loading && <Loader/>}
        {error && <ErrorMessage/>}
        {photos.length > 0 && <ImageGallery photos={photos} onImageClick={isOpen}  />}
        {loadMoreVisible() && <LoadMoreBtn onClick={handleLoadMore}/>}
        {modalPhoto && <ImageModal isOpen={modalIsOpen} isClosed={isClosed} src={modalPhoto.urls.full} alt_description={modalPhoto.alt_description}/>}
      </div>
    </>
  );
}

export default App;