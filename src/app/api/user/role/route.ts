import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { role } = await request.json();

    if (!role || !["exporter", "investor"].includes(role)) {
      return new NextResponse("Invalid role", { status: 400 });
    }

    console.log("role: ", role);

    // Vérifier si l'utilisateur existe déjà dans Prisma
    let prismaUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!prismaUser) {
      // Si l'utilisateur n'existe pas, le créer
      prismaUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          fullName: user.user_metadata?.full_name || "Utilisateur",
          role: role,
        },
      });
    } else {
      // Si l'utilisateur existe, mettre à jour son rôle
      prismaUser = await prisma.user.update({
        where: { id: user.id },
        data: { role },
      });
    }

    console.log("user mail", prismaUser.email);
    
    return NextResponse.json(prismaUser);
  } catch (error) {
    console.error("[ROLE_UPDATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 