import cloudinary from '../config/cloudinary';

export const uploadToCloudinary = async (dataURI: string,folder:string) => { 
    try {
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: folder ,
            resource_type: 'image'
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('failed to upload to Cloudinary');
    }
};

export const uploadMultipleToCloudinary = async (dataURIs: string[], folder: string) => {
    try {
        const uploadPromises = dataURIs.map(async (dataURI, index) => {
            try {
                const mimeType = dataURI.split(';')[0].split(':')[1];
                let resourceType: 'image' | 'video' = 'image';
                if (mimeType.startsWith('video/')) {
                    resourceType = 'video';
                }
                
                const result = await cloudinary.uploader.upload(dataURI, {
                    folder: folder,
                    resource_type: resourceType,
                    public_id: `${folder}_${Date.now()}_${index}` // Ensure unique names
                });
                return result;
            } catch (error) {
                console.error(`Failed to upload file ${index + 1}:`, error);
                throw new Error(`Failed to upload file ${index + 1}`);
            }
        });

        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        console.error('Error uploading multiple files to Cloudinary:', error);
        throw new Error('Failed to upload multiple files to Cloudinary');
    }
};
/**
 * Delete image from Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};

/**
 * Extract public ID from Cloudinary URL
 */
export const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split('.')[0];
    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

/**
 * Update user profile picture (delete old one and upload new one)
 */
export const updateProfilePicture = async (oldImageUrl: string | null, newImageUrl: string): Promise<string> => {
  try {
    // Delete old image if it exists
    if (oldImageUrl) {
      const publicId = getPublicIdFromUrl(oldImageUrl);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }
    
    return newImageUrl;
  } catch (error) {
    console.error('Error updating profile picture:', error);
    throw new Error('Failed to update profile picture');
  }
}; 