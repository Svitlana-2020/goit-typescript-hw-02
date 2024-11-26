import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchPhotosByTitle } from "./photos-api";
import { ApiResponse, Photo } from "./App.types";
import LoadMoreBtn from './components/loadMoreBtn/LoadMoreBtn'
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from './components/ErrorMessage/ErroMessage'
import {ImageData} from './App.types'
import 'izitoast/dist/css/iziToast.min.css';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [totalPhotos, setTotalPhotos] = useState<number>(0)
  const [title, setTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<ImageData | null>(null)

  useEffect(() => {
    if(!title) {
      return;
    }
    console.log(loadMore, setTotalPhotos);
const getPhotos = async (): Promise<void> => {
    try {

      setLoading(true);
      setError(false);
 
      const data: ApiResponse = await fetchPhotosByTitle(title, page);
      console.log(Math.ceil(data.total / 10));
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
  [page, title, loadMore])

  const handleSearch = (newTitle: string): void => {
      setTitle(newTitle)
      setPage(1)
      setPhotos([])
  }
  
  const handleLoadMore = () => {

    // evt.preventDefault();
    setLoadMore(true);
    setPage(page+1)
 }

 
 const isOpen = (data: ImageData): void => {
  setModalPhoto(data);
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
        {modalPhoto && <ImageModal 
        isOpen={modalIsOpen} 
        isClosed={isClosed} 
        src={modalPhoto.urls.full} 
        alt_description={modalPhoto.alt_description}/>}
      </div>
    </>
  );
}

export default App;