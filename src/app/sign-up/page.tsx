"use client";


import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from "lucide-react"
import { FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { signUp } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.terms) {
      setError("Please accept the terms and conditions");
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      
      toast({
        title: "Registration Successful",
        description: `Please check your email at ${formData.email} to confirm your registration.`,
      });

    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during registration";
      setError(errorMessage);
      toast({
        title: "Registration Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (  
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-green-500">AfriGlobal</h1>
          </div>

          {/* Form Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Create Account</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-gray-700">
                Full name
              </label>
              <Input 
                id="fullName" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name" 
                className="w-full" 
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address" 
                className="w-full" 
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password" 
                  className="w-full pr-10" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="w-full pr-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                name="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, terms: checked as boolean }))
                }
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <Link href="#" className="text-green-500 hover:underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-xl bg-green-500 hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>

            <Button 
              type="button"
              variant="outline" 
              className="w-full rounded-xl flex items-center justify-center gap-2"
              disabled={loading}
            >
              <FaGoogle/>
              Sign up with Google
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image and Text */}
      <div className="flex-1 relative hidden md:block">
        <Image
          src="/images/Carousel.png"
          alt="Agricultural tractor in a field at sunset"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-10 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Reach Global Buyers with Ease</h2>
          <p className="text-lg mb-8">Exporters, list your products and connect with buyers worldwide</p>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
