import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchManga from '../actions/fetchManga';

const MangaList = () => {
  const manga = useSelector(state => state.manga);
  const dispatch = useDispatch();
  const abortController = new AbortController();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchManga(page, abortController));
    return () => {
      abortController.abort();
    };
  }, [page]);
  const handleNextClick = () => {
    setPage(page => page + 1);
  };
  const handlePreviousClick = () => {
    setPage(page => (page === 1 ? page : page - 1));
  };
  return (
    <div>
      <h1>Manga List</h1>
      <button type="button" onClick={handlePreviousClick}>Previous</button>
      <button type="button" onClick={handleNextClick}>Next</button>
      {manga.loading && <FontAwesomeIcon icon={faSpinner} spin />}
      {JSON.stringify(manga.items)}
    </div>
  );
};

export default MangaList;