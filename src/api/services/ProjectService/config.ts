export const ProjectEndpoints = {
    list: () => '/project/',
    openById: (id: string) => `/project/${id}`,
    create: () => '/project/',
    update: (id: string) => `/project/${id}`,
    delete: (id: string) => `/project/${id}`,
}