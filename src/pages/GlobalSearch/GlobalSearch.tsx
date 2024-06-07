import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DRIVER_DATA, GLOBALSEARCHQUERY, GLOBALSERCHRESULTS } from '../../redux/reducers/trackReducer.tsx';
import { getDriverData, getGlobalSearch } from '../../redux/actions/trackActions.js';
import { useSnackbar } from 'notistack';
import { screenTitles } from 'utils/helpers.tsx';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { expandSearchFunction } from '../../redux/actions/authActions';
import { updateSearchResults } from '../../redux/actions/trackActions';

const GlobalSearch = () => {
    const [searchDriver, setSearchDriver] = useState("")
    const [selectedDriver, setSelectedDriver] = useState(null)
    const [group, setGroup] = useState<any>()
    const [selectedVehicle, setSelectedVehicle] = useState<any>()
    const navigate = useNavigate();
    const globalSearchResult = useSelector(GLOBALSERCHRESULTS)
    const globalSearchQuery = useSelector(GLOBALSEARCHQUERY)
    const driver = useSelector(DRIVER_DATA)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const paramSeperator = (value1, value2) => {
        if (value1 && value2) {
            return '&'
        }
        return ''
    }

    const handleChangeScreen = (url) => {
        navigate(url)
        dispatch(updateSearchResults(null))
    }

    const handleChange = (event, value) => {
        const queryParams = `${globalSearchQuery?.split('&')[0]}&page_size=${globalSearchResult?.page_size}&page=${value}`;
        console.log('--->>>>',queryParams);
        //@ts-ignore
      dispatch(getGlobalSearch(queryParams))
    };

    console.log('globalSearchQuery....',globalSearchQuery);
    

    const searchScreenJSX = (v: any) => {
        switch (true) {
            case v.module === 'GeofenceArea':
                return (
                    <div className='w-full p-6 mt-1 text-[15px] hover:bg-primary/20 cursor-pointer' onClick={() => handleChangeScreen(v?.url)}>
                        <div className='text-primary'>{v?.module} {'>'} {v?.fields?.name} {'>'} {v?.fields?.description}</div>
                    </div>
                );
            case v.module === 'Vehicles':
                return (
                    <div className='w-full p-6 mt-1 bg-primary/10 text-[15px] hover:bg-primary/20 cursor-pointer' onClick={() => handleChangeScreen(v?.url)}>
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

    useEffect(() => {
        const searchDriverCondtion = searchDriver?.length >= 2
        if (searchDriverCondtion || group?.id || selectedVehicle?.id) {
            const params = `?${searchDriverCondtion ? `q=${searchDriver}` : ''}${paramSeperator(searchDriverCondtion, group)}${group ? `group_id=${group.id}` : ''}${paramSeperator(group, selectedVehicle?.id)}${paramSeperator(searchDriverCondtion, selectedVehicle?.id)}${selectedVehicle?.id ? `vehicle_id=${selectedVehicle?.id}` : ''}`
            //@ts-ignore
            dispatch(getDriverData((message, variant) => enqueueSnackbar(message, { variant: variant }), null, params))
        } else if (searchDriver.length === 0) {
            //@ts-ignore
            dispatch(getDriverData((message, variant) => enqueueSnackbar(message, { variant: variant }), null))
        }
    }, [searchDriver, group, selectedVehicle])

    useEffect(() => {
        if (selectedDriver?.id) {
            const filteredData = driver?.filter(v => v?.id == selectedDriver?.id)
            if (filteredData[0]) {
                setSelectedDriver(filteredData[0])
            }
        }
    }, [driver])

    useEffect(() => {
        document.title = screenTitles?.globalSearch;
    }, [])
    return (
        <div style={{ zIndex: 10 }} className='w-[100%] px-2 pb-2 flex flex-col mb-4 items-end'>
            <div className='w-[98%] text-[15px] pl-4 mt-2'>Search Results.</div>
            <div className='h-[90vh] w-[98%] mt-2 overflow-y-auto'>
                {
                    globalSearchResult?.results?.map((v, i) => searchScreenJSX(v))
                }
            </div>
            <Stack spacing={2}>
                <Pagination count={Math.ceil(globalSearchResult?.count/globalSearchResult?.page_size)} color="primary" onChange={handleChange} />
            </Stack>
        </div>
    )
}

export default GlobalSearch
