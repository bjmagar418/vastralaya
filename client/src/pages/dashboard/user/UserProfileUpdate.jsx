import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditProfileMutation } from '../../../redux/features/auth/authApi';
import avatarImg from '../../../assets/avatar.png';
import { setUser } from '../../../redux/features/auth/authSlice';

const UserProfileUpdate = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [editProfile, { isLoading, isError, isSuccess }] = useEditProfileMutation();
    
    // State for the file upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        profileImageUrl: '',
        bio: '',
        profession: '',
        userId: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user?.name || '',
                profileImageUrl: user?.profileImageUrl || '',
                bio: user?.bio || '',
                profession: user?.profession || '',
                userId: user?._id || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Create FormData instance
        const formDataPayload = new FormData();
        formDataPayload.append('userId', formData.userId);
        formDataPayload.append('name', formData.name);
        formDataPayload.append('bio', formData.bio);
        formDataPayload.append('profession', formData.profession);
        
        // 2. Append file if selected, otherwise append the existing URL
        if (selectedFile) {
            formDataPayload.append('profileImage', selectedFile);
        } else {
            formDataPayload.append('profileImageUrl', formData.profileImageUrl);
        }

        try {
            // Note: RTK Query will automatically set 'Content-Type': 'multipart/form-data'
            const response = await editProfile(formDataPayload).unwrap();
            const freshUserData = response?.user || response;
            const completeUserSession = { ...user, ...freshUserData };

            dispatch(setUser({ user: completeUserSession }));
            localStorage.setItem('user', JSON.stringify(completeUserSession));
            // Reset file selection after success
            setSelectedFile(null); 
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    return (
        <div className='container mx-auto p-6'>
            <div className='bg-white shadow-md rounded-lg p-6 mb-6'>
                <div className='flex items-center'>
                    <img src={formData?.profileImageUrl || avatarImg} alt='avatar' className='w-32 h-32 object-cover rounded-full' />
                    <div className='ml-6'>
                        <h3 className='text-2xl font-semibold'>Name: {formData.name || 'N/A'}</h3>
                        <p className='text-gray-700'>User Bio: {formData.bio || 'N/A'}</p>
                        <p className='text-gray-700'>Profession: {formData.profession || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className='bg-white shadow-md rounded-lg p-6'>
                <h2 className='text-xl font-bold mb-6'>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Name</label>
                            <input type='text' name='name' value={formData.name} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md' required />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Profession</label>
                            <input type='text' name='profession' value={formData.profession} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md' required />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Profile Image URL</label>
                        <input type='text' name='profileImageUrl' value={formData.profileImageUrl} onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded-md' />
                    </div>

                    {/* New File Upload Input */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Or Upload New Image</label>
                        <input 
                            type='file' 
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className='mt-1 p-2 w-full border border-gray-300 rounded-md' 
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Bio</label>
                        <textarea name='bio' rows='3' className='mt-1 p-2 w-full border border-gray-300 rounded-md' value={formData.bio} onChange={handleChange}></textarea>
                    </div>

                    <button className={`bg-blue-500 text-white py-2 px-6 rounded-md ${isLoading ? 'opacity-50' : ''}`} type='submit' disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>

                    <div className='mt-4'>
                        {isError && <p className='text-red-500'>Failed to update profile. Please try again.</p>}
                        {isSuccess && <p className='text-green-500'>Profile updated successfully!</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfileUpdate;