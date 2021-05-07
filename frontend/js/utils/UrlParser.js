export default function urlParser(endpoint, data) {
    let str = "?";
        if (!data) return endpoint;

        
        Object.entries(data).map(([param, value]) => {
            const encodedValue = encodeURIComponent(value);
            if (endpoint.includes(`{${param}}`)){
              endpoint = endpoint.replace(`{${param}}`, encodedValue);
            }else{
                str += `${param}=${encodedValue}&`
            }
        });

        str = str.slice(0, -1);
        endpoint += str;
        return endpoint;
}