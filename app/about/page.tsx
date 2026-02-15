import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, Users, History, TreePine } from 'lucide-react'
import { jsonLdDocument, jsonLdScriptProps, touristDestinationSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About Shaftesbury',
  description: 'Learn about Shaftesbury, one of England\'s oldest hilltop towns. Founded by King Alfred in 880 AD, famous for Gold Hill and the Hovis advert.',
  openGraph: {
    title: 'About Shaftesbury',
    description: 'Learn about Shaftesbury, one of England\'s oldest hilltop towns. Founded by King Alfred in 880 AD, famous for Gold Hill.',
    url: '/about',
  },
  alternates: { canonical: '/about' },
}

const aboutSchemas = jsonLdDocument(
  webPageSchema({
    name: 'About Shaftesbury',
    description: "Learn about Shaftesbury, one of England's oldest hilltop towns. Founded by King Alfred in 880 AD, famous for Gold Hill.",
    url: '/about',
    type: 'AboutPage',
  }),
  touristDestinationSchema(),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Shaftesbury', url: '/about' },
  ]),
)

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <script {...jsonLdScriptProps(aboutSchemas)} />
        {/* Hero */}
        <section className="bg-racing-green py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              About Shaftesbury
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A historic hilltop town in the heart of Dorset
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-6">
              A Town Rich in History
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Shaftesbury is one of the oldest and most enchanting hilltop towns in England, perched 700 feet above the Blackmore Vale in Dorset. Founded by King Alfred the Great in 880 AD, the town has a rich heritage stretching back over a thousand years and was once one of the most important towns in medieval England.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The town is perhaps best known for Gold Hill, the iconic cobbled street with its stunning views across the Dorset countryside, famously featured in the Hovis bread advertisement. This picturesque street has become one of the most photographed locations in England.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, Shaftesbury retains much of its historic charm with its thriving High Street, the remains of Shaftesbury Abbey — once one of the richest and most powerful abbeys in England — and a vibrant community spirit that celebrates the town's unique character.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-racing-green flex items-center justify-center">
                  <History className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Historic Heritage</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    From King Alfred's founding in 880 AD to the ruins of Shaftesbury Abbey, the town is steeped in history. Gold Hill, the ancient cobbled street, offers breathtaking views across the Blackmore Vale.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-racing-green flex items-center justify-center">
                  <TreePine className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Cranborne Chase</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Shaftesbury sits on the edge of the Cranborne Chase Area of Outstanding Natural Beauty, offering stunning countryside walks, ancient woodlands, and some of the darkest skies in southern England.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-racing-green flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Community Spirit</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    With regular markets, festivals, and events, Shaftesbury has an active and welcoming community. From the annual Gold Hill Fair to the Shaftesbury Fringe, there's always something happening in town.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-racing-green flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Local Amenities</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Shaftesbury offers independent shops, cafes, restaurants, a museum, arts centre, library, and excellent local schools. The thriving High Street supports a wonderful range of local businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Here */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-foreground mb-6">
                Getting Here
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Shaftesbury is located on the A350 in north Dorset, approximately 20 miles west of Salisbury and 30 miles east of Yeovil. The town is easily accessible via the A303 and A30.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The nearest railway stations are at Gillingham (5 miles) and Tisbury (9 miles), both with regular services to London Waterloo and Exeter. Local bus services connect Shaftesbury to surrounding towns and villages including Blandford Forum, Gillingham, and Salisbury.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
