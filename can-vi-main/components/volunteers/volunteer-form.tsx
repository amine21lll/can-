"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle } from "lucide-react"
import { useVolunteers } from "@/hooks/use-volunteers"

const cities = [
  { value: "Casablanca", label: "Casablanca" },
  { value: "Rabat", label: "Rabat" },
  { value: "Marrakech", label: "Marrakech" },
  { value: "Tanger", label: "Tanger" },
  { value: "Fes", label: "Fes" },
  { value: "Agadir", label: "Agadir" },
]

const missions = [
  { value: "Accueil", label: "Accueil" },
  { value: "Sécurité", label: "Sécurité" },
  { value: "Transport", label: "Transport" },
  { value: "Media", label: "Media" },
  { value: "Médical", label: "Médical" },
  { value: "Logistique", label: "Logistique" },
]

const availabilityOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Weekend", label: "Weekend" },
]

// Validation email
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validation téléphone marocain (+212)
function validatePhone(phone: string): boolean {
  // Format: +212XXXXXXXXX (10 chiffres après +212)
  const phoneRegex = /^\+212[0-9]{9}$/
  // Nettoyer les espaces et tirets
  const cleaned = phone.replace(/[\s-]/g, "")
  return phoneRegex.test(cleaned)
}

// Formater le téléphone pour l'affichage
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, "")
  if (cleaned.startsWith("+212")) {
    return cleaned
  }
  if (cleaned.startsWith("0")) {
    return `+212${cleaned.slice(1)}`
  }
  if (cleaned.length === 9) {
    return `+212${cleaned}`
  }
  return cleaned
}

export function VolunteerForm() {
  const { add } = useVolunteers()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // États du formulaire
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [nationality, setNationality] = useState("")
  const [city, setCity] = useState("")
  const [mission, setMission] = useState("")
  const [availability, setAvailability] = useState("")
  const [message, setMessage] = useState("")

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) newErrors.firstName = "Le prénom est obligatoire"
    if (!lastName.trim()) newErrors.lastName = "Le nom est obligatoire"

    if (!email.trim()) {
      newErrors.email = "L'email est obligatoire"
    } else if (!validateEmail(email)) {
      newErrors.email = "Veuillez entrer un email valide"
    }

    if (!phone.trim()) {
      newErrors.phone = "Le téléphone est obligatoire"
    } else {
      const formattedPhone = formatPhone(phone)
      if (!validatePhone(formattedPhone)) {
        newErrors.phone = "Veuillez entrer un numéro marocain valide (+212XXXXXXXXX)"
      }
    }

    if (!birthDate) newErrors.birthDate = "La date de naissance est obligatoire"
    if (!nationality.trim()) newErrors.nationality = "La nationalité est obligatoire"
    if (!city) newErrors.city = "La ville est obligatoire"
    if (!mission) newErrors.mission = "La mission est obligatoire"
    if (!availability) newErrors.availability = "La disponibilité est obligatoire"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Formater le téléphone
      const formattedPhone = formatPhone(phone)

      // Ajouter le bénévole
      add({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: formattedPhone,
        birthDate,
        nationality: nationality.trim(),
        city,
        mission,
        availability,
        message: message.trim() || undefined,
      })

      // Simuler un délai pour l'UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (error) {
      console.error("Erreur lors de l'ajout du bénévole:", error)
      setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="apply" className="py-16 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12 border-2 border-secondary/20">
            <CardContent>
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 animate-in fade-in zoom-in duration-300">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-bebas)" }}>
                ✅ Votre candidature a été envoyée avec succès
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Merci pour votre candidature. Notre équipe examinera votre dossier et vous contactera dans les
                prochains jours.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="py-16 bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-bebas)" }}>
            POSTULER MAINTENANT
          </h2>
          <p className="text-muted-foreground">Remplissez le formulaire ci-dessous pour rejoindre notre équipe</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Formulaire de candidature</CardTitle>
            <CardDescription>Tous les champs marqués d'un * sont obligatoires</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Prénom * <span className="text-destructive">{errors.firstName && `(${errors.firstName})`}</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Amina"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      if (errors.firstName) setErrors({ ...errors, firstName: "" })
                    }}
                    required
                    disabled={isSubmitting}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Nom * <span className="text-destructive">{errors.lastName && `(${errors.lastName})`}</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Benali"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      if (errors.lastName) setErrors({ ...errors, lastName: "" })
                    }}
                    required
                    disabled={isSubmitting}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email * <span className="text-destructive">{errors.email && `(${errors.email})`}</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="amina@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: "" })
                  }}
                  required
                  disabled={isSubmitting}
                  className={errors.email ? "border-destructive" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Téléphone * <span className="text-destructive">{errors.phone && `(${errors.phone})`}</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+212612345678"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (errors.phone) setErrors({ ...errors, phone: "" })
                  }}
                  required
                  disabled={isSubmitting}
                  className={errors.phone ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground">Format: +212XXXXXXXXX (10 chiffres après +212)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">
                    Date de naissance *{" "}
                    <span className="text-destructive">{errors.birthDate && `(${errors.birthDate})`}</span>
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => {
                      setBirthDate(e.target.value)
                      if (errors.birthDate) setErrors({ ...errors, birthDate: "" })
                    }}
                    required
                    disabled={isSubmitting}
                    className={errors.birthDate ? "border-destructive" : ""}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">
                    Nationalité *{" "}
                    <span className="text-destructive">{errors.nationality && `(${errors.nationality})`}</span>
                  </Label>
                  <Input
                    id="nationality"
                    placeholder="Marocaine"
                    value={nationality}
                    onChange={(e) => {
                      setNationality(e.target.value)
                      if (errors.nationality) setErrors({ ...errors, nationality: "" })
                    }}
                    required
                    disabled={isSubmitting}
                    className={errors.nationality ? "border-destructive" : ""}
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-2">
                <Label htmlFor="city">
                  Ville * <span className="text-destructive">{errors.city && `(${errors.city})`}</span>
                </Label>
                <Select value={city} onValueChange={setCity} required disabled={isSubmitting}>
                  <SelectTrigger className={errors.city ? "border-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((cityOption) => (
                      <SelectItem key={cityOption.value} value={cityOption.value}>
                        {cityOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mission">
                  Mission souhaitée *{" "}
                  <span className="text-destructive">{errors.mission && `(${errors.mission})`}</span>
                </Label>
                <Select value={mission} onValueChange={setMission} required disabled={isSubmitting}>
                  <SelectTrigger className={errors.mission ? "border-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez une mission" />
                  </SelectTrigger>
                  <SelectContent>
                    {missions.map((missionOption) => (
                      <SelectItem key={missionOption.value} value={missionOption.value}>
                        {missionOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">
                  Disponibilité *{" "}
                  <span className="text-destructive">{errors.availability && `(${errors.availability})`}</span>
                </Label>
                <Select value={availability} onValueChange={setAvailability} required disabled={isSubmitting}>
                  <SelectTrigger className={errors.availability ? "border-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez votre disponibilité" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message optionnel */}
              <div className="space-y-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  placeholder="Ajoutez un message ou des informations complémentaires..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {errors.submit && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{errors.submit}</div>
              )}

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer la candidature"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
