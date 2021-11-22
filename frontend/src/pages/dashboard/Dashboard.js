import React, {useEffect, useState} from 'react'
import axios from '../../api/Axios'
import Box from '../../components/box/Box'
import Chart from "react-google-charts";


function Dashboard() {

    const url = '/dashboard/'
    const [data, setData] = useState(true)

    useEffect(function(){
        async function fetchData() {
            let response = await axios.get(url);
            console.log(response.data)
            setData(response.data)
        }
        fetchData()
            
    },[])

    return(
       <div className="wrap-dashboard">
           <Box title="">
                <Chart
                    width={'100%'}
                    height={'auto'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                    ['Access', 'Total'],
                    ['Downloads', data.downloads],
                    ['Views', data.views],
                    ]}
                    options={{
                    legend: 'none',
                    title: 'Total Stories Access',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                ></Chart>
            </Box>
       </div>
    )
}

export default Dashboard