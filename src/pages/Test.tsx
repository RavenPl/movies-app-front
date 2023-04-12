import React, {useEffect, useState} from 'react';

export const Test = () => {

    const [testData, setTestData] = useState("");

    useEffect(() => {

        (async () => {
            const resp = await fetch(`http://localhost:3001/movies/auth/test`, {
                credentials: "include",
            });
            const data = await resp.json();
            setTestData(data)
            console.log(data);
        })()

    }, [])

    return (
        <div>
            "OK"
        </div>
    );
}

