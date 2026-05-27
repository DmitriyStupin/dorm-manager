import { create } from 'zustand'
import type { Room } from '../types/room'
import { rooms as mockRooms } from '../mocks/rooms'

type RoomsStore = {
  rooms: Room[]
}

export const useRoomsStore = create<RoomsStore>(() => ({
  rooms: mockRooms,
}))
