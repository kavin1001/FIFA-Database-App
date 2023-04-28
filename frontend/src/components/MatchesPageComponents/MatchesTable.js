import axios from "axios";
import React, {useEffect, useState, useContext, componentDidUpdate} from "react";

function MatchesTable(props) {
    const [leagueMatchData, setLeagueMatchData] = useState([]);
    const [dateMatchData, setDateMatchData] = useState([]);
    const [aggregateData, setAggregateData] = useState([]);
    // const [loading, setLoading] = useState(true);

    const setLoaded = props.setLoaded;
    const columns = props.columns;

    // console.log(props.leagueRoute)

    // useEffect(() => {
    //     axios
    //         .get(props.leagueRoute)
    //         .then((res) => {
    //             console.log(res.data);
    //             setLeagueMatchData(res.data);
    //             setLoaded(1);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [props])

    useEffect(() => {
        axios.all([
            axios.get(props.leagueRoute),
            axios.get(props.dateRoute)
        ])
        .then(axios.spread((res1, res2) => {
            setLeagueMatchData(res1.data);
            setDateMatchData(res2.data);
            setLoaded(1);
        }))
        .then(() => {
            setAggregateData(
            leagueMatchData.filter(obj1 => {
            const obj2 = dateMatchData.find(obj2 => obj1.id === obj2.id);
            return obj2 !== undefined;
            }));
         })
        .catch((err) => {
            console.log(err);
        });
    }, [props])


    return (
    <>
        {/* {
        loading ? 
        <div>
            <h1 className="font-bold text-5xl my-10 text-center">Loading...</h1>
        </div> 
        : */}
        <div className="relative overflow-auto shadow-md sm:rounded-lg" style={{height: '60vh'}}>
            <p>{props.startDate}</p>
            <p>{props.endDate}</p>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map(col => <th scope="col" className="px-6 py-3" key={col.headerName}>{col.headerName}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        aggregateData.map((row, index) => 
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                                {
                                    columns.map((column, idx) => 
                                    <td className="px-6 py-4" key={column.headerName}>
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