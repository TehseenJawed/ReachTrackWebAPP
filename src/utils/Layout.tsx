import React, { useEffect, useState } from 'react'
import { ChildProps } from 'typecasts';
import AppLoader from 'components/appLoader';
import { useNavigate } from 'react-router-dom';
import SideMenu from 'components/responsiveSideMenu';
import TextField from '@mui/material/TextField';
import { SearchBlackSVG } from 'assets/svg_icons';
import { useDispatch, useSelector } from 'react-redux';
import { EXPANDSEARCH } from '../redux/reducers/authReducer';
import { motion } from 'framer-motion'
import { UseDispatch } from 'react-redux';
import { expandSearchFunction } from '../redux/actions/authActions';
import { getGlobalSearch, updateGlobalSearchQuery, updateSearchResults } from '../redux/actions/trackActions';
import { GLOBALSERCHRESULTS } from '../redux/reducers/trackReducer';

const Layout = ({ children }: ChildProps) => {
  const [hideLoader, setHideLoader] = useState(true)
  const navigate = useNavigate();
  const userData = localStorage.getItem('access_token')
  const menuSearch = useSelector(EXPANDSEARCH)
  const globalSearchResult = useSelector(GLOBALSERCHRESULTS)
  const dispatch = useDispatch()
  console.log('globalSearchResult --> ', globalSearchResult);

  const handleSearchGlobally = (e) => {
    if (e.target.value?.length >= 2) {
      const queryParams = `?q=${e.target.value}&page_size=20`
      //@ts-ignore
      dispatch(getGlobalSearch(queryParams))
      dispatch(updateGlobalSearchQuery(queryParams))
    }
  }

  const handleChangeScreen = (url) => {
    navigate(url)
    dispatch(expandSearchFunction(!menuSearch))
    dispatch(updateSearchResults(null))
  }

  const searchScreenJSX = (v: any) => {
    switch (true) {
      case v.module === 'GeofenceArea':
        return (
          <div className='w-full p-4 text-[15px] hover:bg-primary/20 cursor-pointer' onClick={() => handleChangeScreen(v?.url)}>
            <div className='text-primary'>{v?.module} {'>'} {v?.fields?.name} {'>'} {v?.fields?.description}</div>
          </div>
        );
      case v.module === 'Vehicles':
        return (
          <div className='w-full p-4 text-[15px] hover:bg-primary/20 cursor-pointer' onClick={() => handleChangeScreen(v?.url)}>
            <div className='text-primary'>{v?.module} {'>'} {v?.fields?.make} {v?.fields?.model} {'>'} {v?.fields?.number_plate} {'>'} {v?.fields?.vehicle_registration_no}</div>
          </div>
        )
      default:
        return (
          <div className='w-full p-4 text-[15px] hover:bg-primary/20 cursor-pointer' onClick={() => handleChangeScreen(v?.url)}>
            <div className='text-primary'>{v?.module} {'>'} {v?.fields?.name} {'>'} {v?.fields?.description}</div>
          </div>
        )
    }

  }

  const handleKeyPress = (event) => {
    console.log('EVENT KEY .. ',event.key);
    if(event.key === 'Enter' && event?.target?.value.length >= 2){
      dispatch(expandSearchFunction(false))
      navigate('/global-search')
    }
  }

  useEffect(() => {
    if (!userData) {
      setTimeout(() => {
        setHideLoader(false)
        // navigate('/login', { replace: false })
        // localStorage.removeItem("access_token")
      }, 1000)
    } else {
      setHideLoader(false)
    }
  }, [])


  return (
    <div>
      {
        hideLoader && <AppLoader />
      }
      <div className='flex'>
        <SideMenu>
          {children}
        </SideMenu>
        {
          menuSearch && (
            <motion.div initial={{ y: -10 }} animate={{ y: 0 }} style={{zIndex: 10000}} className='w-full h-full absolute flex justify-center items-center'>
              <div onClick={() => dispatch(expandSearchFunction(!menuSearch))} className='w-full h-full absolute' />
              <div className='backdrop-blur-md bg-white/60 w-[50%] max-h-[550px] overflow-auto rounded-3xl'>
                <TextField
                  placeholder="Search from sites"
                  className='border-none fixed'
                  onKeyDown={handleKeyPress}
                  id="outlined-start-adornment"
                  onChange={handleSearchGlobally}
                  sx={{ width: '97%', margin: '15px', border: 'none' }}
                  InputProps={{
                    startAdornment: <SearchBlackSVG />
                  }}
                />
                <div className='w-full flex flex-col text-gray-darklight justify-center items-center'>
                  {
                    globalSearchResult?.results?.map((v, i) => searchScreenJSX(v))
                  }
                </div>
              </div>
            </motion.div>
          )
        }
      </div>
    </div>
  )
}

export default Layout
