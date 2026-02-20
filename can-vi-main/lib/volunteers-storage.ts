// Types pour les bénévoles
export interface Volunteer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  nationality: string
  city: string
  mission: string
  availability: string
  message?: string
  status: "En attente" | "Approuvé" | "Refusé"
  createdAt: string
}

// Données de test par défaut
const DEFAULT_VOLUNTEERS: Omit<Volunteer, "id" | "createdAt">[] = [
  {
    firstName: "Amina",
    lastName: "Benali",
    email: "amina@email.com",
    phone: "+212612345678",
    birthDate: "1995-05-15",
    nationality: "Marocaine",
    city: "Rabat",
    mission: "Accueil",
    availability: "Full-time",
    status: "Approuvé",
  },
  {
    firstName: "Hassan",
    lastName: "Elmourid",
    email: "hassan@email.com",
    phone: "+212623456789",
    birthDate: "1992-08-20",
    nationality: "Marocaine",
    city: "Casablanca",
    mission: "Sécurité",
    availability: "Weekend",
    status: "En attente",
  },
  {
    firstName: "Nadia",
    lastName: "Alaoui",
    email: "nadia@email.com",
    phone: "+212634567890",
    birthDate: "1998-03-10",
    nationality: "Marocaine",
    city: "Marrakech",
    mission: "Transport",
    availability: "Full-time",
    status: "Approuvé",
  },
  {
    firstName: "Karim",
    lastName: "Fassi",
    email: "karim@email.com",
    phone: "+212645678901",
    birthDate: "1990-11-25",
    nationality: "Marocaine",
    city: "Fes",
    mission: "Media",
    availability: "Part-time",
    status: "Refusé",
  },
  {
    firstName: "Fatima",
    lastName: "Benhaddou",
    email: "fatima@email.com",
    phone: "+212656789012",
    birthDate: "1996-07-12",
    nationality: "Marocaine",
    city: "Tanger",
    mission: "Médical",
    availability: "Full-time",
    status: "Approuvé",
  },
  {
    firstName: "Youssef",
    lastName: "Mansouri",
    email: "youssef@email.com",
    phone: "+212667890123",
    birthDate: "1994-09-30",
    nationality: "Marocaine",
    city: "Agadir",
    mission: "Logistique",
    availability: "Weekend",
    status: "En attente",
  },
]

const STORAGE_KEY = "can2025_volunteers"

// Générer un ID unique
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Initialiser les données si localStorage est vide
export function initializeVolunteers(): Volunteer[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Si erreur de parsing, initialiser avec les données par défaut
    }
  }

  // Créer les bénévoles par défaut avec IDs et dates
  const defaultVolunteers: Volunteer[] = DEFAULT_VOLUNTEERS.map((vol) => ({
    ...vol,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }))

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVolunteers))
  return defaultVolunteers
}

// Récupérer tous les bénévoles
export function getVolunteers(): Volunteer[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return initializeVolunteers()
  }
  try {
    return JSON.parse(stored)
  } catch {
    return initializeVolunteers()
  }
}

// Ajouter un nouveau bénévole
export function addVolunteer(volunteer: Omit<Volunteer, "id" | "status" | "createdAt">): Volunteer {
  const newVolunteer: Volunteer = {
    ...volunteer,
    id: generateId(),
    status: "En attente",
    createdAt: new Date().toISOString(),
  }

  const volunteers = getVolunteers()
  volunteers.push(newVolunteer)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(volunteers))
  return newVolunteer
}

// Mettre à jour le statut d'un bénévole
export function updateVolunteerStatus(id: string, status: Volunteer["status"]): boolean {
  const volunteers = getVolunteers()
  const index = volunteers.findIndex((v) => v.id === id)
  if (index === -1) return false

  volunteers[index].status = status
  localStorage.setItem(STORAGE_KEY, JSON.stringify(volunteers))
  return true
}

// Obtenir un bénévole par ID
export function getVolunteerById(id: string): Volunteer | null {
  const volunteers = getVolunteers()
  return volunteers.find((v) => v.id === id) || null
}

