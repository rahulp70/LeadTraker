

const checkSessionValidity = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    const now = new Date().getTime();
    const twelveHours =  12 *  60 * 1000;

    if (!lastActivity || now - lastActivity > twelveHours) {
        // Clear session data
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        localStorage.removeItem('lastActivity');
        
        return false; // Session is invalid
    }

    // Update last activity timestamp for valid sessions
    localStorage.setItem('lastActivity', now);
    return true; // Session is valid
};

export default checkSessionValidity;
