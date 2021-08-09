import { useCallback, useState } from 'react';

//sample requestConfig for POST
// {
//   url: 'https://react-getting-started-795ba-default-rtdb.firebaseio.com/tasks.json', //endpoint
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: { text: taskText },
// }

//sample requestConfig for GET
// {
//   url: 'https://react-getting-started-795ba-default-rtdb.firebaseio.com/tasks.json', //endpoint
// },

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data); //applyData - the function passed that will be executed when using the custom hook.
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return { isLoading: isLoading, error: error, sendRequest: sendRequest };
};

export default useHttp;
