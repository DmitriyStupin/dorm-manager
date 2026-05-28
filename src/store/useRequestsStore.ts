import type { Request, RequestFormData } from '../types/request.ts'
import { create } from 'zustand'
import { requests as mockRequests } from '../mocks/requests.ts'

type RequestsStore = {
  requests: Request[]
  addRequest: (data: RequestFormData) => void
  updateRequest: (id: number, data: Partial<Request>) => void
  deleteRequest: (id: number) => void
}

export const useRequestsStore = create<RequestsStore>((set) => ({
  requests: mockRequests,
  addRequest: (data) =>
    set((state) => ({
      requests: [
        ...state.requests,
        {
          id: Date.now(),
          ...data,
          status: 'новое',
          createdAt: new Date().toISOString().split('T')[0],
        },
      ],
    })),
  updateRequest: (id, data) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id ? { ...request, ...data } : request
      )
    })),
  deleteRequest: (id) =>
    set((state) => ({
      requests: state.requests.filter((request) => request.id !== id)
    }))
}))