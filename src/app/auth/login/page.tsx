"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (res?.error) {
      setError("이메일 또는 비밀번호를 다시 확인해 주세요.")
      return
    }

    router.push("/") // 로그인 성공 후 이동할 페이지
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] px-4">
      <Card className="w-full max-w-sm bg-[#111] border border-gray-800 text-gray-100 shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-xl font-semibold">
            🎬 Welcome back to Cinelog
          </CardTitle>
          <p className="text-center text-xs text-gray-400">
            감정을 기록하는 너만의 영화 다이어리
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 이메일 로그인 */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-gray-700 focus-visible:ring-gray-500"
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-gray-700 focus-visible:ring-gray-500"
            />

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "이메일로 로그인"}
            </Button>
          </form>

          {/* 구분선 */}
          <div className="flex items-center space-x-2 py-2">
            <Separator className="flex-1 bg-gray-700" />
            <span className="text-gray-400 text-xs uppercase">or</span>
            <Separator className="flex-1 bg-gray-700" />
          </div>

          {/* 소셜 로그인 */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Continue with Google
            </Button>

            {/* 여기 나중에 Naver / Kakao 버튼 추가 예정 */}
          </div>

          <p className="text-center text-xs text-gray-400 pt-2">
            아직 계정이 없나요?{" "}
            <a
              href="/auth/signup"
              className="text-violet-400 hover:underline"
            >
              회원가입 하기
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}