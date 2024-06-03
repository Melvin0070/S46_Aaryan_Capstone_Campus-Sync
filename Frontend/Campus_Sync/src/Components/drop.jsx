import React, { useState, useEffect } from "react";
import axios from "axios";
import "./drop.css";

function Drop() {
 const [selectedFile, setSelectedFile] = useState(null);
 const [uploadStatus, setUploadStatus] = useState("");
 const [files, setFiles] = useState([]);
 const [username, setUsername] = useState("");
 const [topic, setTopic] = useState("");
 const [error, setError] = useState(null);
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
   fetchFiles();
 }, []);

 const fetchFiles = async () => {
   try {
     const response = await axios.get(
       import.meta.env.VITE_SERVER_URL + "/drops/files"
     );
     setFiles(Array.isArray(response.data) ? response.data : []);
   } catch (error) {
     setError(error);
   }
 };

 const handleFileChange = (e) => {
   setSelectedFile(e.target.files[0]);
 };

 const handleTopicChange = (e) => {
   setTopic(e.target.value);
 };

 const handleUpload = async (e) => {
   e.preventDefault();
   if (!selectedFile || !topic) {
     setUploadStatus("Please select a file and enter a topic.");
     return;
   }
   const formData = new FormData();
   formData.append("file", selectedFile);
   formData.append("topic", topic);
   formData.append("uploadedBy", username);

   try {
     const response = await axios.post(
       import.meta.env.VITE_SERVER_URL + "/drops/upload",
       formData,
       {
         headers: { "Content-Type": "multipart/form-data" },
       }
     );
     setUploadStatus(response.data.message);
     fetchFiles();
   } catch (error) {
     setUploadStatus("File upload failed.");
     setError(error);
   }
 };

 const handleFileDelete = async (fileId) => {
   try {
     await axios.delete(
       import.meta.env.VITE_SERVER_URL + `/drops/files/${fileId}`,
       {
         data: { uploadedBy: username },
       }
     );
     fetchFiles();
   } catch (error) {
     setError(error);
   }
 };

 const handlePrev = () => {
   setCurrentIndex((prevIndex) =>
     prevIndex === 0 ? files.length - 1 : prevIndex - 1
   );
 };

 const handleNext = () => {
   setCurrentIndex((prevIndex) =>
     prevIndex === files.length - 1 ? 0 : prevIndex + 1
   );
 };

 return (
   <div className="drop-container">
     <div className="content-wrapper">
       <div className="upload-section">
         <h2>Upload Your Content</h2>
         <p className="warning">
           Any inappropriate uploads will be deleted by the admin team.
         </p>
         <input
           type="text"
           placeholder="Username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           className="drop-username-input"
         />
         <form onSubmit={handleUpload} className="drop-form">
           <input
             type="file"
             onChange={handleFileChange}
             className="drop-file-input"
           />
           <input
             type="text"
             placeholder="Topic"
             value={topic}
             onChange={handleTopicChange}
             className="drop-topic-input"
           />
           <button type="submit" className="drop-submit-button">
             Upload
           </button>
         </form>
         <p className="drop-status">{uploadStatus}</p>
       </div>

       {error && <div className="drop-error">Error: {error.message}</div>}

       <div className="blog-post">
         <div className="carousel">
           {files.length > 0 ? (
             <>
               <button className="carousel-button prev" onClick={handlePrev}>
                 <span className="arrow">&#8249;</span>
               </button>
               <div className="carousel-content">
                 <div className="file-details">
                   <h3>{files[currentIndex].topic}</h3>
                   <p>
                     {new Date(files[currentIndex].uploadedAt).toLocaleDateString()} -{" "}
                     {new Date(files[currentIndex].uploadedAt).toLocaleTimeString()}
                   </p>
                 </div>
                 <div className="file-container">
                   {files[currentIndex].content.endsWith(".pdf") ? (
                     <iframe
                       src={files[currentIndex].content}
                       className="drop-file-pdf"
                     ></iframe>
                   ) : (
                     <img
                       src={files[currentIndex].content}
                       alt={files[currentIndex].topic}
                       className="drop-file-image"
                     />
                   )}
                 </div>
                 {files[currentIndex].uploadedBy === username && (
                   <button
                     className="drop-delete-button"
                     onClick={() => handleFileDelete(files[currentIndex]._id)}
                   >
                     Delete
                   </button>
                 )}
               </div>
               <button className="carousel-button next" onClick={handleNext}>
                 <span className="arrow">&#8250;</span>
               </button>
             </>
           ) : (
             <div className="drop-no-files">No files found.</div>
           )}
         </div>
       </div>
     </div>
   </div>
 );
}

export default Drop;