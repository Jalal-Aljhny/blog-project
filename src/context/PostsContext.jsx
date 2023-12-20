import { createContext, useCallback } from "react";
import PropTypes from "prop-types";
import useFetchCollection from "../hooks/useFetchCollection";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { data, getData, loading, error, fetching, getNextData, lastDoc } =
    useFetchCollection();

  const fetchData = useCallback(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  const fetchNextData = useCallback(() => {
    if (data && !loading && lastDoc && !fetching) {
      getNextData(lastDoc);
    }
  }, [data, getNextData, loading, lastDoc, fetching]);

  return (
    <PostsContext.Provider
      value={{ fetchData, loading, data, error, fetchNextData, fetching }}
    >
      {children}
    </PostsContext.Provider>
  );
};
PostsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
