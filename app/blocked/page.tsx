export default function BlockedPage() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <h1 className="mb-4 text-4xl font-black tracking-tighter">
        我已禁止你的訪問權限
      </h1>
      <span className="text-sm">
        如果你認為你不應該被禁，請聯繫我的信箱{' '}
        <a href="mailto:eggegg27@gmail.com" className="font-bold underline">
          hi@cali.so
        </a>
      </span>
    </main>
  )
}

export const revalidate = 3600 // 1 hour
