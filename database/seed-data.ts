interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  createdAt: number
  status: 'pending' | 'in-progress' | 'finished'
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Esta es una descripcion',
      createdAt: Date.now() - 1000000,
      status: 'pending'
    },
    {
      description: 'En progreso: Lorem ipsum jose darndkjas lahsdfkue fadskhlf adsfasd',
      createdAt: Date.now(),
      status: 'in-progress'
    },
    {
      description: 'Terminada: Esta es una descripcion',
      createdAt: Date.now() - 100000,
      status: 'finished'
    }
  ]
}