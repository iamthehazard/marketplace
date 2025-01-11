import {useState, useEffect} from "react";

export default function CardElement() { //need to not share name with Card class
    const [value, setValue] = useState(null);
    
    useEffect(() => {
        const handleEvent = e => setValue(e.detail);

        document.addEventListener("setReactValue", handleEvent);
        return () => {
            document.removeEventListener("setReactValue", handleEvent);
        }
    }, []);

    return <div className="card">value: {value}</div>;
}