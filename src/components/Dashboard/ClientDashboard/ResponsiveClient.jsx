import { useState, useEffect } from "react";
import Client from "./Client";
import MobileClient from "./MobileClient";

const ResponsiveClient = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <MobileClient /> : <Client />;
};

export default ResponsiveClient;