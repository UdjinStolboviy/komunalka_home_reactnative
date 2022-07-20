export interface IUpdateUserAccount {
  companies?: any[];
  contacts?: {
    phone?: {
      number?: string
    },
  },
  info?: {
    name?: string
    email?: string
    image?: string;
    location?: string;
    about?: string;
    labels?: string[]
  },
  chat?: {
    user_id: number
  }
}
