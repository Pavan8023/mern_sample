// src/pages/admin/PageEditor.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PageEditor = () => {
    const { pageName } = useParams();
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [removedImageIds, setRemovedImageIds] = useState([]);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL || 'https://mern-sample-uw4k.onrender.com';
                const response = await axios.get(`${apiUrl}/api/content/${pageName}`);
                setContent(response.data.content);
                setImages(response.data.images || []);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching page data:', error);
                setIsLoading(false);
            }
        };

        fetchPageData();
    }, [pageName]);

    const handleSave = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'https://mern-sample-uw4k.onrender.com';

            const formData = new FormData();
            formData.append('content', content);
            formData.append('removedImages', JSON.stringify(removedImageIds));

            // Add new images to formData
            images.forEach(img => {
                if (img.file) {
                    formData.append('images', img.file);
                }
            });

            await axios.put(
                `${apiUrl}/api/content/${pageName}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            alert('Page updated successfully!');
        } catch (error) {
            console.error('Error updating page:', error);
            alert('Failed to update page');
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            id: Date.now() + Math.random(),
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages([...images, ...newImages]);
    };

    const removeImage = (id) => {
        const imageToRemove = images.find(img => img.id === id);

        if (imageToRemove && imageToRemove.filename) {
            setRemovedImageIds([...removedImageIds, imageToRemove.filename]);
        }

        setImages(images.filter(img => img.id !== id));
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold capitalize">Editing {pageName} Page</h2>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Page Content</h3>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-64 p-4 border rounded-lg"
                    placeholder="Edit page content (HTML allowed)"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Images</h3>
                <div className="mb-4">
                    <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
                        Upload New Images
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {images.map((img) => (
                        <div key={img.id} className="relative border rounded-lg overflow-hidden">
                            <img
                                src={img.preview || img.url}
                                alt="Page content"
                                className="w-full h-40 object-cover"
                            />
                            <button
                                onClick={() => removeImage(img.id)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageEditor;