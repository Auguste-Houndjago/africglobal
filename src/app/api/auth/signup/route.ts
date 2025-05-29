import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` || 'http://localhost:3000/auth/callback';

    // 1. Créer l'utilisateur dans Supabase
    const { data: authData, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          full_name: fullName,
        },
      },
    });

    if (supabaseError) {
      console.error("[SUPABASE_SIGNUP_ERROR]", supabaseError);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 400 }
      );
    }

    // 2. Créer l'utilisateur dans Prisma si l'authentification a réussi
    if (authData.user) {
      try {
        const user = await prisma.user.create({
          data: {
            id: authData.user.id,
            email: authData.user.email!,
            fullName: fullName,
            role: "investor", // valeur par défaut
          },
        });

        return NextResponse.json({
          user,
          message: "Check your email to confirm your registration",
        });

      } catch (prismaError: any) {
        console.error("[PRISMA_CREATE_ERROR]", prismaError);

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
          where: { email: authData.user.email! }
        });

        if (existingUser) {
          return NextResponse.json({ 
            user: existingUser,
            message: "Check your email to confirm your registration" 
          });
        }

        // Si c'est une erreur de connexion
        if (prismaError.code === 'P1001') {
          return NextResponse.json({
            message: "Registration successful. Profile will be completed later.",
            user: { email: authData.user.email, id: authData.user.id }
          });
        }

        return NextResponse.json(
          { error: "Failed to create user profile" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 