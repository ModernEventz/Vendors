import { Schema } from "mongoose";

import { IUser } from "@/mongodb";

export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}

export interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface JobFilterParams {
  query: string;
  page: string;
}

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface GetVendorByIdParams {
  vendorId: string;
}

export interface GetBudgetByIdParams {
  profileId: string|null|undefined;
}

export interface GetCheckListByIdParams {
  profileId: string|null|undefined;
}
export interface UpdateBudgetByIdParams {
  budgetId: string;
  item:string;
  cost:number;
  status:string;
  path:string;
}

export interface UpdateCheckListByIdParams {
  checkListId: string;
  title:string;
  category:string;
  date:string;
  status:string;
  path:string;
}


export interface DeleteBudgetByIdParams {
  budgetId: string;
  path:string;
}

export interface DeleteCheckListByIdParams {
  checkListId: string;
  path:string;
}

export interface DeleteCheckListParams {
  
  path:string;
}
export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetVendorsByCategoryPaginationParams {
  Page: number;
  category:string;

 
}

export interface GetVendorsByCategoryNoPaginationParams {
  
  category:string;

 
}

export interface GetSearchVendorsPaginationParams {
  Page: number;
  searchTerm: string;
 
}

export interface GetFilterVendorsByLocationParams {
  Page: number;
  location: string;
  category:string;
 
}
export interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}

export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteUserParams {
  clerkId: string;
}


export interface SubmitReviewParams {
  vendorId: string;

  message:string;
  rating:number;
  path:string;
  

}

export interface SubmitBudgetParams {
 

  status:string;
  item:string;
  cost:number;
  path:string;
  

}

export interface SubmitCheckListParams {
 

  status:string;
  title:string;
  category:string;
  date:string;
  path:string;
  

}

export interface BookingParams {
  vendorId: string;
  price:number;
  username: string;
  email: string;
  date:string;
  time:string;
  message:string;
  numberOfGuests:string;
  phoneNumber:string;
  
}

export interface GetHiredVendorByIdParams {
  profile_Id: string|null|undefined;
}

export interface submitHiredVendorParams {
  profile_id: string;
  vendor_id: string;
  location : string;
  price : string;
  rating:number;
  rating_count:number;
  description:string;
  image:string;
  category:string;
}

export interface insertVendorsParams {
  title:string;
  location : string;
  price : string;
  description:string;
  category:string;
  publicUrls:string[]
}

export interface updateVendorsParams {
  vendorId: string;
  title:string;
  location : string;
  price : string;
  description:string;
  category:string;
  publicUrls:string[]
}


export interface deleteVendorsParams {
  vendorId: string;
 
}