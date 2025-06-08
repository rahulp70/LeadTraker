/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileData = ({ leadId }) => {
    const [fileData, setFileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch file data from the API when the component mounts
        const fetchFileData = async () => {
            try {
                const response = await axios.get(`/api/files/${leadId}`);
                setFileData(response.data);  // Set the fetched file data
                setLoading(false);  // Set loading to false once data is fetched
            } catch (err) {
                setError('Failed to fetch files');  // Set error message if request fails
                setLoading(false);  // Set loading to false
            }
        };

        fetchFileData();
    }, [leadId]);  // Re-run when leadId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>File Data for Lead ID: {leadId}</h2>
            <ul>
                {fileData.map(file => (
                    <li key={file.id}>
                        <h3>{file.fileName}</h3>
                        <p>Lead ID: {file.leadId}</p>
                        <div>
                            {/* Display the file content as base64 */
                           /* <p>File Content (Base64):</p>
                            <textarea
                                rows="10"
                                cols="50"
                                readOnly
                                value={file.fileContent}
                            ></textarea>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileData;*/