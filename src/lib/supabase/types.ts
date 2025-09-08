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

export interface User {
  id: string;
  email: string;
  role: "user" | "admin" | "super_admin";
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
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<User, "id" | "created_at" | "updated_at">>;
      };
    };
  };
}

export type MediaItem = {
  url: string;
  title: string;
  type: "image" | "video";
};

export type Announcement = {
  content: string;
  type: "info" | "warning" | "success" | "error";
};

export type EventStatus = "upcoming" | "ongoing" | "completed";
