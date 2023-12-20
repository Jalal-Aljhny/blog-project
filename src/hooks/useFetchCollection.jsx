import { useCallback, useContext, useState } from "react";
import { FireBaseContext } from "../context/FireBaseContext";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

const useFetchCollection = () => {
  const { db } = useContext(FireBaseContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [dataLength, setDataLength] = useState(0);
  const [fetching, setFetching] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "posts");
      const count = (await getCountFromServer(colRef)).data().count;
      setDataLength(count);
      const QUERY = query(colRef, orderBy("createdAt", "desc"), limit(12));
      const result = await getDocs(QUERY);

      const DATA = result.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate(),
        };
      });

      setData(DATA);
      setLastDoc(result.docs[+result.docs.length - 1]);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [db]);

  const getNextData = useCallback(
    async (lastDoc) => {
      if (data.length != dataLength) {
        setFetching(true);
        try {
          const colRef = collection(db, "posts");
          const QUERY = query(
            colRef,
            orderBy("createdAt", "desc"),
            limit(8),
            startAfter(lastDoc)
          );
          const result = await getDocs(QUERY);

          const DATA = result.docs.map((doc) => {
            const docData = doc.data();
            return {
              id: doc.id,
              ...docData,
              createdAt: docData.createdAt.toDate(),
            };
          });
          setData((d) => [...d, ...DATA]);
          setLastDoc(result.docs[+result.docs.length - 1]);
        } catch (error) {
          setError(error.message);
        }

        setFetching(false);
      }
    },
    [db, data, dataLength]
  );
  return { loading, error, data, getData, fetching, lastDoc, getNextData };
};

export default useFetchCollection;
