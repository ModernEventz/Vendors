import { Database } from "./supabase";


export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Budget = Database["public"]["Tables"]["budget"]["Row"];
export type CheckList = Database["public"]["Tables"]["checklist"]["Row"];
export type bookings = Database["public"]["Tables"]["checklist"]["Row"];