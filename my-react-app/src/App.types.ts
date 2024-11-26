export interface Photo {
    id: string;
    urls: {
      full: string;
      small: string;
    };
    alt_description: string;
  }
  
  export interface ApiResponse {
    total: number;
    total_pages: number;
    results: Photo[];
  }

  export default interface SearchBarProps {
    onSearch: (title: string) => void;
  }

  export default interface LoadMoreBtnProps {
    onClick: () => void; 
  }

  export default interface ImageGalleryProps {
    photos: Photo[];
    onImageClick: (data: { urls: { full: string }; alt_description: string }) => void;
  }

  export default interface ImageCardProps {
    id: string;
    full: string;
    small: string;
    alt_description: string;
    onImageClick: (data: { urls: { full: string }; alt_description: string }) => void;
  }