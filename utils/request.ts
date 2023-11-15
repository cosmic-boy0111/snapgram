const url = process.env.PROXY_URL

export const _GET = async (route: string) => {
    try {

        const response = await fetch(url + route, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })

        const data = await response.json();
        return { data: data, status: response.status }

    } catch (error) {
        return {
            message: 'GET request failed',
            file: '@utils/request',
            line: 1
        }
    }
}

export const _POST = async (route: string, body: unknown) => {
    try {

        const response = await fetch(url + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        })

        const data = await response.json();
        return { data: data, status: response.status }


    } catch (error) {
        return {
            message: 'POST request failed',
            file: '@utils/request',
            line: 23
        }
    }
}

export const _PATCH = async (route: string, body: unknown) => {
    try {

        const response = await fetch(url + route, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        })

        const data = await response.json();
        return { data: data, status: response.status }


    } catch (error) {
        return {
            message: 'PATCH request failed',
            file: '@utils/request',
            line: 47
        }
    }
}

export const _DELETE = async (route: string) => {
    try {

        const response = await fetch(url + route, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })

        const data = await response.json();
        return { data: data, status: response.status }


    } catch (error) {
        return {
            message: 'DELETE request failed',
            file: '@utils/request',
            line: 71
        }
    }
}