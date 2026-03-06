import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 className="size-7" />
          </div>
          <div>
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">AM Enterprises</h1>
            <p className="text-sm text-muted-foreground">Enterprise Admin Panel</p>
          </div>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="size-6 text-emerald-600" />
            </div>
            <CardTitle className="text-lg">Check your email</CardTitle>
            <CardDescription>We sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
              <Mail className="size-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Please check your inbox and click the confirmation link to activate your account.
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {"Didn't receive the email? Check your spam folder or try signing up again."}
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
