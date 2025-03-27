import MainLayout from "../../components/common/MainLayout";
import { Eye, Github, Mail, User, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignUp = () => {
  return (
    <MainLayout>
      <main className="w-full min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#1A1A1A] accent-[#3B82F6] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:accent-[#60A5FA]">
        <div className="flex min-h-screen items-center justify-center">
          <Card className="w-xl max-w-2xl shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Create an account
              </CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    >
                      <Eye className="h-5 w-5" />
                      <span className="sr-only">Show password</span>
                    </Button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    >
                      <Eye className="h-5 w-5" />
                      <span className="sr-only">Show password</span>
                    </Button>
                  </div>
                </div>

                {/* Captcha */}
                <div className="space-y-2">
                  <Label>Captcha Verification</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted p-3 rounded-md relative">
                      <div className="select-none text-center font-mono text-lg tracking-widest">
                        X7dR9p
                      </div>
                    </div>
                    <Button type="button" variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-refresh-cw h-4 w-4"
                      >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M3 21v-5h5" />
                      </svg>
                      <span className="sr-only">Refresh Captcha</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input type="text" placeholder="Enter captcha text" />
                    <Button type="button">Verify</Button>
                  </div>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Signups */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                  Login
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </MainLayout>
  );
};

export default SignUp;
