const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-type": 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`Couldn't fetch to ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const getResorce = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Couldn't fetch to ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResorce};