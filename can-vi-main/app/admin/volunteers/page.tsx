"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  UserX,
  Clock,
  Eye,
  Calendar,
  Globe,
} from "lucide-react"
import { useVolunteers } from "@/hooks/use-volunteers"
import type { Volunteer } from "@/lib/volunteers-storage"

export default function VolunteersPage() {
  const { volunteers, isLoading, updateStatus } = useVolunteers()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMission, setFilterMission] = useState("all")
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Filtrer les bénévoles
  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((volunteer) => {
      const fullName = `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase()
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.phone.includes(searchQuery)

      const statusMap: Record<string, string> = {
        all: "",
        "En attente": "En attente",
        Approuvé: "Approuvé",
        Refusé: "Refusé",
      }
      const matchesStatus = filterStatus === "all" || volunteer.status === statusMap[filterStatus]
      const matchesMission = filterMission === "all" || volunteer.mission === filterMission

      return matchesSearch && matchesStatus && matchesMission
    })
  }, [volunteers, searchQuery, filterStatus, filterMission])

  // Calculer les statistiques
  const stats = useMemo(() => {
    const total = volunteers.length
    const approved = volunteers.filter((v) => v.status === "Approuvé").length
    const pending = volunteers.filter((v) => v.status === "En attente").length
    const rejected = volunteers.filter((v) => v.status === "Refusé").length

    // Statistiques par mission
    const missionCounts: Record<string, number> = {}
    volunteers.forEach((v) => {
      missionCounts[v.mission] = (missionCounts[v.mission] || 0) + 1
    })

    return { total, approved, pending, rejected, missionCounts }
  }, [volunteers])

  const getStatusBadge = (status: Volunteer["status"]) => {
    switch (status) {
      case "Approuvé":
        return (
          <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30">
            🟢 Approuvé
          </Badge>
        )
      case "En attente":
        return (
          <Badge className="bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30">
            🟠 En attente
          </Badge>
        )
      case "Refusé":
        return (
          <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30">🔴 Refusé</Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleApprove = (id: string) => {
    updateStatus(id, "Approuvé")
  }

  const handleReject = (id: string) => {
    updateStatus(id, "Refusé")
  }

  const handleViewDetails = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setIsDetailDialogOpen(true)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des bénévoles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-bebas)" }}>
          📋 Liste des candidats
        </h1>
        <p className="text-muted-foreground mt-1">
          🟢 {filteredVolunteers.length} candidat{filteredVolunteers.length > 1 ? "s" : ""} trouvé
          {filteredVolunteers.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total bénévoles</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approuvés</p>
                <p className="text-2xl font-bold mt-1">{stats.approved}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% du total
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold mt-1">{stats.pending}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">À traiter</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Refusés</p>
                <p className="text-2xl font-bold mt-1">{stats.rejected}</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {stats.total > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0}% du total
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Approuvé">Approuvé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Refusé">Refusé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterMission} onValueChange={setFilterMission}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par mission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les missions</SelectItem>
                <SelectItem value="Accueil">Accueil</SelectItem>
                <SelectItem value="Sécurité">Sécurité</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Médical">Médical</SelectItem>
                <SelectItem value="Logistique">Logistique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Volunteers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Liste des candidats
          </CardTitle>
          <CardDescription>{filteredVolunteers.length} candidat{filteredVolunteers.length > 1 ? "s" : ""} trouvé{filteredVolunteers.length > 1 ? "s" : ""}</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredVolunteers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucun bénévole trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bénévole</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Mission</TableHead>
                    <TableHead>Disponibilité</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVolunteers.map((volunteer) => (
                    <TableRow key={volunteer.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {getInitials(volunteer.firstName, volunteer.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {volunteer.firstName} {volunteer.lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {volunteer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {volunteer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {volunteer.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{volunteer.mission}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{volunteer.availability}</TableCell>
                      <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(volunteer)}
                            className="hover:bg-primary/10"
                            title="Voir détails"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {volunteer.status === "En attente" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApprove(volunteer.id)}
                                className="text-green-600 hover:bg-green-500/10 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                title="Approuver"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleReject(volunteer.id)}
                                className="text-red-600 hover:bg-red-500/10 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                title="Refuser"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Détails */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedVolunteer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                      {getInitials(selectedVolunteer.firstName, selectedVolunteer.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {selectedVolunteer.firstName} {selectedVolunteer.lastName}
                  </span>
                </DialogTitle>
                <DialogDescription>Détails complets de la candidature</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Prénom</p>
                    <p className="text-sm">{selectedVolunteer.firstName}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Nom</p>
                    <p className="text-sm">{selectedVolunteer.lastName}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </p>
                    <p className="text-sm">{selectedVolunteer.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Téléphone
                    </p>
                    <p className="text-sm">{selectedVolunteer.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date de naissance
                    </p>
                    <p className="text-sm">
                      {new Date(selectedVolunteer.birthDate).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Nationalité
                    </p>
                    <p className="text-sm">{selectedVolunteer.nationality}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Ville
                    </p>
                    <p className="text-sm">{selectedVolunteer.city}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Mission</p>
                    <Badge variant="outline">{selectedVolunteer.mission}</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Disponibilité</p>
                    <p className="text-sm">{selectedVolunteer.availability}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Statut</p>
                    {getStatusBadge(selectedVolunteer.status)}
                  </div>
                </div>
                {selectedVolunteer.message && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Message</p>
                    <p className="text-sm bg-muted p-3 rounded-md">{selectedVolunteer.message}</p>
                  </div>
                )}
                <div className="pt-4 border-t flex gap-2">
                  {selectedVolunteer.status === "En attente" && (
                    <>
                      <Button
                        onClick={() => {
                          handleApprove(selectedVolunteer.id)
                          setIsDetailDialogOpen(false)
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approuver
                      </Button>
                      <Button
                        onClick={() => {
                          handleReject(selectedVolunteer.id)
                          setIsDetailDialogOpen(false)
                        }}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Refuser
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
