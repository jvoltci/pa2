import create from 'zustand'

export const useDisplayStore = create((set) => ({
  username: '',
  route: 'CANDIDATE',
  isAuthenticated: false,
  libraryId: '',
  setLibraryId: (data) => set(() => ({ libraryId: data})),
  switchRoute: (data) => set(() => ({ route: data })),
  setUsername: (data) => set(() => ({ username: data })),
  updateAuth: (data) => set(() => ({ isAuthenticated: data }))
}))