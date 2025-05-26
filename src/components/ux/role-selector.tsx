"use client"

import { useState } from "react"
import { Check, Tractor } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Role = "exporter" | "investor" | null

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<Role>("investor")

  const roles = [
    {
      id: "exporter" as const,
      title: "Exporter",
      icon: Tractor,
    },
    {
      id: "investor" as const,
      title: "Invvestor/Buyer",
      icon: Tractor,
    },
  ]

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-green-500 mb-8">AfriGlobal</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">Choose your role in Agriculture Investment</h2>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id
            const Icon = role.icon

            return (
              <Card
                key={role.id}
                className={cn(
                  "relative cursor-pointer transition-all duration-200 hover:scale-105",
                  isSelected
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-200 hover:border-green-300",
                )}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-12 text-center">
                  {/* Check mark for selected state */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-6">
                    <Icon
                      className={cn("w-20 h-20 mx-auto", isSelected ? "text-white" : "text-green-500")}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className={cn("text-xl font-medium", isSelected ? "text-white" : "text-gray-700")}>
                    {role.title}
                  </h3>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Selected Role Display */}
        {selectedRole && (
          <div className="mt-8 p-4 bg-green-100 rounded-lg max-w-md mx-auto">
            <p className="text-green-800">
              Rôle sélectionné: <span className="font-semibold">{roles.find((r) => r.id === selectedRole)?.title}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
