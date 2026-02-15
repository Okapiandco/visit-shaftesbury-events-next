import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SubmitBusinessForm from '@/components/SubmitBusinessForm'
import { jsonLdDocument, jsonLdScriptProps, webPageSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'List Your Business',
  description: 'Add your shop, restaurant, or service to the Shaftesbury business directory.',
  openGraph: {
    title: 'List Your Business in Shaftesbury',
    description: 'Add your shop, restaurant, or service to the Shaftesbury business directory.',
    url: '/submit-business',
  },
  alternates: { canonical: '/submit-business' },
}

const submitBizSchemas = jsonLdDocument(
  webPageSchema({
    name: 'List Your Business',
    description: 'Add your shop, restaurant, or service to the Shaftesbury business directory.',
    url: '/submit-business',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'List Your Business', url: '/submit-business' },
  ]),
)

export default function SubmitBusinessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script {...jsonLdScriptProps(submitBizSchemas)} />
      <SubmitBusinessForm />
      <Footer />
    </div>
  )
}
