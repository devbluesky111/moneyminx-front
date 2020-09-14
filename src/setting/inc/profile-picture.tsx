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
  const [profilePicture] = useState<string>(pictureURL || OwnerOneImg);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length !== 0) {
      const file = e.target.files?.[e.target.files.length - 1];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const { error } = await patchProfilePicture(formData);
        if (error) {
          toast('Error on uploading picture', { type: 'error' });
        }
      }
    }
  };

  const handleFileBrowserOpen = (pictureRef: any) => {
    pictureRef.current?.click();
  };

  return (
    <div className='card mm-setting-card'>
      <div className='card-body d-sm-flex justify-content-between align-items-center'>
        <div className='mm-profile-overview__title'>
          Profile Picture
          <div className='mm-profile-overview__title-pp' onClick={() => handleFileBrowserOpen(ppRef)} role='button'>
            <img alt='Owner' src={profilePicture} className='rounded-circle mr-2' width='100' height='100' />
          </div>
        </div>
        <div className='mt-4 mt-sm-0'>
          <button type='button' className='btn btn-outline-primary mm-button btn-lg'>
            Change Picture
          </button>
        </div>
      </div>
      <ImageInput handleChange={handleChange} imageRef={ppRef} />
    </div>
  );
};

export default ProfilePicture;
