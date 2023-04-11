import axios from "axios";
import React, {useEffect, useState, useContext} from "react";

function MatchesTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = props.columns;
    
    function wait() {
        setTimeout(() => {
            setLoading(false);
          }, 500);
    }

    useEffect(() => {
        axios
            .get(props.route)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                wait();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
    <>
        {
        loading ? 
        <div>
            <h1 className="font-bold text-5xl my-10 text-center">Loading...</h1>
        </div> 
        :
        <div className="relative overflow-auto shadow-md sm:rounded-lg" style={{height: '60vh'}}>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map(col => <th scope="col" className="px-6 py-3" key={col.headerName}>{col.headerName}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, index) => 
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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
        }
    </>
    )
}

export default MatchesTable;