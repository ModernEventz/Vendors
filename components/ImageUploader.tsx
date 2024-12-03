//@ts-nocheck
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const schema = z.object({
  images: z.array(z.instanceof(File)).optional(),
});


const ImageUploader = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setValue('images', acceptedFiles);
    setPreviews(acceptedFiles.map(file => URL.createObjectURL(file)));
  }, [setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    multiple: true,
    maxFiles:4
  });

  const onSubmit = async (data) => {
    if (data.images && data.images.length > 0) {
      const uploadPromises = data.images.map(async (file) => {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(`third/${file.name}`, file);

        if (uploadError) {
          throw uploadError;
        } else {
          const { publicURL, error: urlError } = supabase.storage
            .from('your-bucket-name')
            .getPublicUrl(`third/${file.name}`);

          if (urlError) {
            throw urlError;
          } else {
            return publicURL;
          }
        }
      });

      try {
        const urls = await Promise.all(uploadPromises);
        console.log('Files uploaded and accessible at:', urls);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div {...getRootProps()}
      className="flex-center bg-dark-3 bg-gray-50 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl">
        <input {...getInputProps()} />
        <div className=' rounded-md border-2 border-dashed border-x-gray-200  p-14'>
        <p>Drag and drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
      </div>
    
      <div className=' flex flex-row flex-wrap'>
        {previews.map((src, index) => (
          <img key={index} src={src} alt={`preview ${index}`} style={{ width: '100px', margin: '10px' }} />
        ))}
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploader;
