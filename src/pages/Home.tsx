import { useEffect } from 'react';
import { getToken } from '../store/reducers/TokenReducer/ActionCreators';
import GetRequest from './../components/GetRequest';
import Intro from './../components/Intro';
import PostRequest from './../components/PostRequest';
import { useAppDispatch } from './../hooks/hooks';

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, []);

  return (
    <>
      <Intro />
      <GetRequest />
      <PostRequest />
    </>
  );
}

export default Home;
