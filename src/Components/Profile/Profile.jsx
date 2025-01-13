import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import style from './Profile.module.css'
import { useSelector } from 'react-redux';
import ProfileTeacher from './ProfileTeacher';
import { useEffect } from 'react';
import LoadingPage from './../Loading/LoadingPage';

export default function Profile() {
  const { decodeToken } = useSelector((state) => state.ApisliceToken);

  if (!decodeToken) {
    return <LoadingPage />
  }

  return (
    <main className="py-3 pt-5" style={{ backgroundImage: `url(${require('../../Img/Profile/wallpaper-pattern.webp')})` }}>
      {decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== 'Student' ?
        <div className='row justify-content-center mx-sm-3 mx-3 mt-4'>
          <ProfileTeacher />
        </div>

        : <div className='row justify-content-lg-between justify-content-center mx-sm-3 mx-3 mt-4'>
          <ProfileLeft />
          <ProfileRight />
        </div>}
    </main>
  )
}
