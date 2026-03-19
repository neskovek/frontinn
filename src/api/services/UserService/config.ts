export const UserEndpoints = {
    list: () => '/user',
    openById: (id: string) => `/user/${id}`,
    update: (id: string) => `/user/${id}`,
    delete: (id: string) => `/user/${id}`,
}