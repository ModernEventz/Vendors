//@ts-nocheck
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons'; // or any delete icon you prefer
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface PhotoGalleryProps {
  initialPhotos: { name: string }[];
  userId: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ initialPhotos, userId }) => {
  const [photos, setPhotos] = useState(initialPhotos);

  const handleDelete = async (photoName: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    // Construct the file path for deletion.
    const filePath = `${userId}/${photoName}`;

    // Remove the file from Supabase storage.
    const { data, error } = await supabase.storage
      .from('uploads')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting photo:', error.message);
      alert('There was an error deleting the photo.');
      return;
    }

    // Update the state to remove the deleted photo.
    setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.name !== photoName));
  };

  return (
    <section className="mt-12 flex flex-wrap gap-4">
      {photos.length > 0 ? (
        photos.map((photo, index) => (
          <div key={photo.name} className="relative">
            <img 
              src={`https://${
                process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')
              }.supabase.co/storage/v1/object/public/uploads/${userId}/${photo.name}`}
              alt={`Image ${index}`}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            {/* Delete button overlay */}
            <Button 
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={() => handleDelete(photo.name)}
              title="Delete photo"
            >
              <TrashIcon width={16} height={16} />
            </Button>
          </div>
        ))
      ) : (
        <div className="mx-auto max-w-4xl text-center">
          <p>No Photos</p>
          <a href="/vendors" className="mt-2 font-bold text-accent-blue">
            Upload a photo
          </a>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
