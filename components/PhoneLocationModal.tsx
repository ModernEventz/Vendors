//@ts-nocheck
// components/PhoneLocationModal.js
import { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { createClient } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
type PhoneLocationModalProps = {

  onClose: () => void;

};
const PhoneLocationModal = ({  onClose }:PhoneLocationModalProps) => {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
 
  const [errors, setErrors] = useState<{ phone?: string; location?: string }>({});

  const { toast } = useToast()

  const { user } = useUser();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 const supabase = createClient(supabaseUrl, supabaseKey);

 const validate = () => {
  const errors: { phone?: string; location?: string } = {};
  const phoneRegex = /^\d+$/;

  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(phone)) {
    errors.phone = 'Phone number should contain only numbers';
  }

  if (!location) {
    errors.location = 'Location is required';
  }

  return errors;
};

  async function handleSubmit() {
  //  onSubmit({ phone, location });
 // 

 const validationErrors = validate();

 if (Object.keys(validationErrors).length === 0) {
  
   setLoading(true);
   
 const {  error } = await supabase
 .from('profiles')
 .insert([
   { profile_id: user?.id, avatar: user?.imageUrl, username: `${user?.firstName}  ${user?.lastName} ` ,mobile_number:phone, location },
 ])
 .select()
  

   if (error) {
   console.error(error);
    }

 else {
      
  toast({
    description: "successfully updated.",
  })

  setLoading(false);
  onClose();

}
 }
 
 else {
  setErrors(validationErrors);
}  
  };

 

  return (
    <div className="modal">
      <div className="modal-content">
      
        <h2  className='bg-primary-500 p-5 font-semibold text-white'> Enter your phone number and location</h2>
        
        <input
          type="number"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

{errors.phone && <p className="error">{errors.phone}</p>}

        <input
          type="text"
          placeholder="Location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

{errors.location && <p className="error">{errors.location}</p>}
      

    

        <Button className='rounded-md bg-primary-500 text-white' onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Submit'
            )}
          </Button>
      { /*  <button onClick={onClose}>Close</button>  */ }
      </div>
     
    </div>
  );
};

export default PhoneLocationModal;
