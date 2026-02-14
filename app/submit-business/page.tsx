import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SubmitBusinessForm from '@/components/SubmitBusinessForm'

export const metadata: Metadata = {
  title: 'List Your Business',
  description: 'Add your shop, restaurant, or service to the Shaftesbury business directory',
}

export default function SubmitBusinessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SubmitBusinessForm />
      <Footer />
    </div>
  )
}
