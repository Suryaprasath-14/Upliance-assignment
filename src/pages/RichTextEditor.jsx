import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Box } from "@chakra-ui/react";

const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { name, address, email, phone } = JSON.parse(storedUserData);
      const userInfo = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `;
      setEditorContent(userInfo);
    }
  }, []);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <Box p={12}>
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ],
        }}
        formats={[
          'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background', 'align', 'link', 'image', 'video'
        ]}
        style={{ height: "400px" }}
      />
    </Box>
  );
};

export default RichTextEditor;