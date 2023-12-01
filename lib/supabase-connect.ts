

let isConnected: boolean = false;




export const connectToDatabase = async () => {
  

  if(!process.env.SUPABASE_KEY) {
    return console.log('MISSING SUPABASE KEY');
  }

  if (isConnected) {
    return;
  }

  try {


  } catch (error) {
    console.log('Database connection failed', error)
  }
}