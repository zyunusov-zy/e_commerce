import MainLayout from "../../components/common/MainLayout";
import { Eye, Github, Mail } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  return (
    <MainLayout>
      <main className="w-full min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#1A1A1A] accent-[#3B82F6] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:accent-[#60A5FA]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* Email Field */}
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

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
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

              {/* Captcha Verification */}
              <div className="space-y-2">
                <Label>Captcha Verification</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted p-3 rounded-md relative">
                    <div className="select-none text-center font-mono text-lg tracking-widest">
                      A7bX9c
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/auth/sign-up" className="text-primary hover:underline">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </main>
    </MainLayout>
  );
};

export default Login;
