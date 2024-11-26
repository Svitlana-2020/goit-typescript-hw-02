import {SearchBarProps} from '../App.types';
import css from './SearchBar.module.css'
import iziToast from 'iziToast';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
	const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    if(title.trim() === "") {
      iziToast.error({
        title: 'Error',
        message: 'Please enter search term!',
    })
        return;}
    onSearch(title);
    // form.reset();
}

return (
<header className={css.header}>
  <form className={css.form} onSubmit={handleSubmit}>
    <input className={css.input}
    name = "title"
      type="text"
    //   autocomplete="off"
    //   autofocus
      placeholder="Search images and photos"
    />
    <button className={css.btn} type="submit">Search</button>
  </form> 
</header>)
}

export default SearchBar