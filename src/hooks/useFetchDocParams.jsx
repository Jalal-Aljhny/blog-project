import { useCallback, useContext, useState } from "react";
import { FireBaseContext } from "../context/FireBaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";

const useFetchDocParams = (colName, slug) => {
  const { db } = useContext(FireBaseContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const colRef = collection(db, colName);
      const QUERY = query(colRef, where("title_detail", "==", slug));
      const result = await getDocs(QUERY);
      const DATA = result.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate(),
        };
      });
      setData(DATA[0]);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [colName, db, slug]);

  return { getData, error, loading, data };
};

export default useFetchDocParams;
