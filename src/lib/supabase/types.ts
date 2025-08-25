export interface Event {
  id: string;
  title: string;
  description: string;
  media?: [string];
  event_date: string;
  event_time: string;
  location?: string;
  category: string;
  status: "upcoming" | "ongoing" | "completed";
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      events: {
        Row: Event;
        Insert: Omit<Event, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Event, "id" | "created_at" | "updated_at">>;
      };
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<AdminUser, "id" | "created_at" | "updated_at">>;
      };
    };
  };
}
