import axios from "axios";
import React, {useEffect, useState, useContext, componentDidUpdate} from "react";

function MatchesTable(props) {
    const [leagueMatchData, setLeagueMatchData] = useState([]);
    const [dateMatchData, setDateMatchData] = useState([]);
    const [aggregateData, setAggregateData] = useState([]);

    const setLoaded = props.setLoaded;
    const columns = props.columns;
    const topPlayerColumns = props.topPlayerColumns;
    const topPlayer = props.topPlayer;

    useEffect(() => {
        if(!topPlayer) {
            axios.all([
                axios.get(props.leagueRoute),
                axios.get(props.dateRoute)
            ])
            .then(axios.spread((res1, res2) => {
                setLeagueMatchData(res1.data);
                setDateMatchData(res2.data);
                        // wait 8 seconds
                setTimeout(() => {
                    setLoaded(1);
                } , 8000);
            }))
            .catch((err) => {
                console.log(err);
            });
        } 
        else {
            axios.get(props.topPlayerRoute)
            .then((res) => {
                console.log(res.data)
                setAggregateData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [props])

    useEffect(() => {
        console.log(aggregateData);
    }, [aggregateData])

    useEffect(() => {
        setAggregateData(
            leagueMatchData.filter(obj1 => {
            const obj2 = dateMatchData.find(obj2 => obj1.id === obj2.id);
            return obj2 !== undefined;
        }));
        // wait 8 seconds
        setTimeout(() => {
            setLoaded(1);
        } , 8000);
    }, [leagueMatchData, dateMatchData])
    
    return (
    <>
        <div className="relative overflow-auto shadow-lg sm:rounded-lg" style={{height: '60vh'}}>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-2">
                <thead 
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    style={{position: 'sticky', top: 0}}
                >
                    <tr>
                        {!topPlayer ? 
                        columns.map(col => <th scope="col" className="px-6 py-3" key={col.headerName}>{col.headerName}</th>)
                        :
                        topPlayerColumns.map(col => <th scope="col" className="px-6 py-3" key={col.headerName}>{col.headerName}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        aggregateData.map((row, index) => 
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                                {
                                    !topPlayer ? 
                                        columns.map((column, idx) => 
                                        <td className="text-gray-800 bg-white px-6 py-4" key={column.headerName}>
                                            {row[column.field]}
                                        </td>
                                        )
                                    :
                                        topPlayerColumns.map((column, idx) => 
                                        <td className="text-gray-800 bg-white px-6 py-4" key={column.headerName}>
                                            {row[column.field]}
                                        </td>
                                        )
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        {/* } */}
    </>
    )
}

export default MatchesTable;