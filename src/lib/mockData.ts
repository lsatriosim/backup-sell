import { Post, User } from "./types";

export const users: User[] = [
  { id: "u1", name: "John Doe", username: "user123", contactPhone: "+62 812-3456-7890", contactNote: "WhatsApp preferred" },
  { id: "u2", name: "Alice", username: "buyerX", contactPhone: "+62 811-1111-2222" },
  { id: "u3", name: "Bob", username: "buyerY", contactPhone: "+62 822-2222-3333" },
];

export const posts: Post[] = [
  {
    id: "p1",
    title: "Padel Court Booking",
    location: "Padel Club Central",
    dateISO: "2025-08-30",
    startTime: "18:00",
    endTime: "19:00",
    minBid: 20,
    status: "OPEN",
    sellerId: "u1",
    notes: "Booking transferable via app; bring proof of payment",
    bids: [
      { id: "b1", postId: "p1", buyerId: "u2", amount: 22, createdAt: new Date().toISOString(), contactPhone: "+62 811-1111-2222" },
      { id: "b2", postId: "p1", buyerId: "u3", amount: 25, createdAt: new Date().toISOString(), contactPhone: "+62 822-2222-3333" },
    ],
  },
  {
    id: "p2",
    title: "Padel Court Booking",
    location: "Arena Padel Club",
    dateISO: "2025-08-29",
    startTime: "20:00",
    endTime: "21:00",
    minBid: 15,
    status: "CLOSED",
    sellerId: "u1",
    bids: []
  },
];
