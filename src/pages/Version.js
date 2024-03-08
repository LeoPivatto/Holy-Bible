import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const Version = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const url = "https://api.scripture.api.bible/v1/bibles";
                const response = await fetch(url, { headers: { 'api-key': process.env.REACT_APP_API_KEY } });
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchedData();
    }, []);

    let content;

    if (!data) {
        content = <p>loading...</p>;
    } else if (error) {
        content = <p>something is wrong..</p>;
    } else {
        const divComponents = [];
        const sizeDivision = 129;

        data.forEach((v, i) => {
            if (i % sizeDivision === 0) {
                divComponents.push([]);
            }
            divComponents[Math.floor(i / sizeDivision)] = [...divComponents[Math.floor(i / sizeDivision)], v];
        });

        content = (
            <div style={{ display: "flex" }}>
                {divComponents.map((column) => {
                    return (
                        <div style={{ float: "left", width: "50%", border: "1px solid #212121", borderRadius: "5px" }}>
                            {column.map((w) => {
                                return (
                                    <Link to={{
                                        pathname: `/version/${w.id}`,
                                        state: { version: w.name }
                                    }}
                                        style={{ display: "flex", alignItems: "center", padding: "6px 12px" }}
                                        key={w.id}>
                                        {w.name}
                                    </Link>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div>
            <Navbar style={{ backgroundColor: "#975252" }}>
                <div style={{ fontSize: "1.5vw" }}>
                    <a style={{ border: "none", backgroundColor: "#975252" }} href='/'>📖 Bible</a>
                </div>
            </Navbar>
            <div className='container'>
                <div className="col0"></div>
                <div className='col2'>{content}</div>
            </div>
        </div>
    );
};

export default Version;
