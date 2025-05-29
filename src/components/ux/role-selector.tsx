"use client"

import { useState } from "react"
import { Check, Tractor } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type Role = "exporter" | "investor"

interface RoleSelectorProps {
  onRoleChange?: (role: Role) => void
  defaultRole?: Role
}

export default function RoleSelector({ onRoleChange, defaultRole = "investor" }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(defaultRole)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleRoleSelect = async (role: Role) => {
    setSelectedRole(role)
    setLoading(true)

    try {
      const response = await fetch('/api/user/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        throw new Error('Failed to update role')
      }

      toast({
        title: "Rôle mis à jour",
        description: "Votre rôle a été mis à jour avec succès.",
      })

      // Rediriger vers la page d'accueil après la sélection du rôle
      router.push('/')
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du rôle.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }

    onRoleChange?.(role)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-green-500 mb-8">AfriGlobal</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
            Choose your role in Agriculture Investment
          </h2>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Exporter Card */}
          <Card
            className={cn(
              "relative cursor-pointer transition-all duration-200 hover:shadow-lg",
              selectedRole === "exporter"
                ? "bg-green-500 text-white border-green-500"
                : "bg-white border-gray-200 hover:border-green-300",
            )}
            onClick={() => handleRoleSelect("exporter")}
          >
            <CardContent className="p-8 text-center">
              {selectedRole === "exporter" && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <Tractor
                  className={cn("w-16 h-16 mx-auto", selectedRole === "exporter" ? "text-white" : "text-green-500")}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className={cn("text-xl font-semibold", selectedRole === "exporter" ? "text-white" : "text-gray-700")}>
                Exporter
              </h3>
            </CardContent>
          </Card>

          {/* Investor/Buyer Card */}
          <Card
            className={cn(
              "relative cursor-pointer transition-all duration-200 hover:shadow-lg",
              selectedRole === "investor"
                ? "bg-green-500 text-white border-green-500"
                : "bg-white border-gray-200 hover:border-green-300",
            )}
            onClick={() => handleRoleSelect("investor")}
          >
            <CardContent className="p-8 text-center">
              {selectedRole === "investor" && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <Tractor
                  className={cn("w-16 h-16 mx-auto", selectedRole === "investor" ? "text-white" : "text-green-500")}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className={cn("text-xl font-semibold", selectedRole === "investor" ? "text-white" : "text-gray-700")}>
                Investor/Buyer
              </h3>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  )
}
