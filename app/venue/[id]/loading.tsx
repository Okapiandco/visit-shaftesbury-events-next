import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <Footer />
    </div>
  )
}
