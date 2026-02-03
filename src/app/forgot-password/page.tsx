import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
        <div className="mt-6 text-center text-gray-600">
          <p>
            Please contact your mosque administrator (Takmir) to reset your password.
          </p>
          <p className="mt-2 text-sm">
            Automatic password reset via email is currently being configured.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
