import { toast } from 'react-toastify';
import React, { useRef, useState } from 'react';

import { patchProfilePicture } from 'api/request.api';
import OwnerOneImg from 'assets/images/about/hussein.png';
import ImageInput from 'common/components/input/image.input';

interface ProfilePictureProps {
  pictureURL?: string;
}
const ProfilePicture: React.FC<ProfilePictureProps> = ({ pictureURL }) => {
  const ppRef = useRef(null);
  const [profileURL, setProfileURL] = useState<string>(pictureURL || OwnerOneImg);
  const [profilePicture, setProfilePicture] = useState<File>();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length !== 0) {
      const file = e.target.files?.[e.target.files.length - 1];
      if (file) {
        setProfilePicture(file);
        const url = URL.createObjectURL(file);
        setProfileURL(url);
      }
    }
  };

  const handleFileBrowserOpen = (pictureRef: any) => {
    pictureRef.current?.click();
  };

  const handleProfileChange = async () => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append('file', profilePicture);
      const { error } = await patchProfilePicture(formData);
      if (error) {
        toast('Error on uploading picture', { type: 'error' });
      }
    }
  };

  return (
    <div className='card mm-setting-card'>
      <div className='card-body d-sm-flex justify-content-between align-items-center'>
        <div className='mm-profile-overview__title'>
          Profile Picture
          <div className='mm-profile-overview__title-pp' onClick={() => handleFileBrowserOpen(ppRef)} role='button'>
            <img alt='Owner' src={profileURL} className='rounded-circle mr-2 profile-pic-large' width='100' height='100' />
          </div>
        </div>
        <div className='mt-4 mt-sm-0'>
          <button type='button' className='btn btn-outline-primary mm-button btn-lg' onClick={handleProfileChange}>
            Change Picture
          </button>
        </div>
      </div>
      <ImageInput handleChange={handleChange} imageRef={ppRef} />
    </div>
  );
};

export default ProfilePicture;
