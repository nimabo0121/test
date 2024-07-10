import { useRouter } from 'next/router'

// 重新導覽至/member/login
export default function MemberIndex() {
  const router = useRouter()
  // 確保在瀏覽器中
  if (typeof window !== 'undefined') {
    router.push('/member/login')
  }

  return <></>
}
