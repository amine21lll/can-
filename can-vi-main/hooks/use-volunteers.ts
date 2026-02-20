"use client"

import { useState, useEffect, useCallback } from "react"
import type { Volunteer } from "@/lib/volunteers-storage"
import {
  getVolunteers,
  addVolunteer,
  updateVolunteerStatus,
  initializeVolunteers,
} from "@/lib/volunteers-storage"

export function useVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Charger les bénévoles au montage
  useEffect(() => {
    // Initialiser si nécessaire
    initializeVolunteers()
    setVolunteers(getVolunteers())
    setIsLoading(false)
  }, [])

  // Écouter les changements de localStorage (pour synchroniser entre onglets)
  useEffect(() => {
    const handleStorageChange = () => {
      setVolunteers(getVolunteers())
    }

    window.addEventListener("storage", handleStorageChange)
    // Écouter aussi les changements dans le même onglet via un événement personnalisé
    window.addEventListener("volunteers-updated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("volunteers-updated", handleStorageChange)
    }
  }, [])

  // Ajouter un bénévole
  const add = useCallback((volunteer: Omit<Volunteer, "id" | "status" | "createdAt">) => {
    const newVolunteer = addVolunteer(volunteer)
    setVolunteers(getVolunteers())
    // Déclencher un événement pour synchroniser
    window.dispatchEvent(new Event("volunteers-updated"))
    return newVolunteer
  }, [])

  // Mettre à jour le statut
  const updateStatus = useCallback((id: string, status: Volunteer["status"]) => {
    const success = updateVolunteerStatus(id, status)
    if (success) {
      setVolunteers(getVolunteers())
      window.dispatchEvent(new Event("volunteers-updated"))
    }
    return success
  }, [])

  // Rafraîchir manuellement
  const refresh = useCallback(() => {
    setVolunteers(getVolunteers())
  }, [])

  return {
    volunteers,
    isLoading,
    add,
    updateStatus,
    refresh,
  }
}

