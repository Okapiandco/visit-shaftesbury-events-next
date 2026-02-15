import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Train, Bus, Car, ParkingCircle, Zap, Footprints } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Travel & Transport',
  description: 'How to get to Shaftesbury, Dorset — by train, bus, car, parking, EV charging and more.',
  openGraph: {
    title: 'Travel & Transport to Shaftesbury',
    description: 'How to get to Shaftesbury, Dorset — by train, bus, car, parking, EV charging and more.',
    url: '/travel',
  },
  alternates: { canonical: '/travel' },
}

export default function TravelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-racing-green py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              Travel & Transport
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Everything you need to know about getting to and around Shaftesbury,
              Dorset's historic hilltop town.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* By Train */}
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center">
                  <Train className="h-6 w-6 text-racing-green" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  By Train
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 pl-15">
                <p>
                  Shaftesbury does not have its own railway station, but is well served by two nearby stations
                  on the South Western Railway line between London Waterloo and Exeter St Davids.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Gillingham (Dorset)</strong> — approximately 5 miles south of Shaftesbury.
                    Regular services to London Waterloo (around 2 hours), Salisbury (30 minutes), and Exeter (1.5 hours).
                    Taxi services are available from the station forecourt.
                  </li>
                  <li>
                    <strong>Tisbury</strong> — approximately 10 miles east of Shaftesbury.
                    Also on the Waterloo to Exeter line with similar journey times.
                  </li>
                </ul>
                <p>
                  Plan your journey at <strong>nationalrail.co.uk</strong> or use the Trainline app for tickets.
                </p>
              </div>
            </div>

            {/* By Bus */}
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center">
                  <Bus className="h-6 w-6 text-racing-green" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  By Bus
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 pl-15">
                <p>
                  Shaftesbury is served by several bus routes connecting to surrounding towns and cities.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>South Western Falcon X2</strong> — connects Poole, Blandford Forum, Shaftesbury, and Bristol.
                    A useful long-distance route for reaching the town from the south coast or the Bristol area.
                  </li>
                  <li>
                    <strong>Local services</strong> — connect Shaftesbury with Gillingham, Blandford Forum,
                    Sturminster Newton and other local towns. Check with local operators for timetables.
                  </li>
                </ul>
                <p>
                  The main bus stops are located on the High Street in the town centre.
                </p>
              </div>
            </div>

            {/* By Car */}
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-racing-green" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  By Car
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 pl-15">
                <p>
                  Shaftesbury sits at the junction of the A30 and A350, making it easily accessible by road
                  from many directions.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>From London</strong> — approximately 2.5 hours via the M3 and A303, then A350 northbound.
                    Around 115 miles.
                  </li>
                  <li>
                    <strong>From Bristol</strong> — approximately 1.5 hours via the A37 and A350 southbound.
                    Around 55 miles.
                  </li>
                  <li>
                    <strong>From Bournemouth</strong> — approximately 1 hour via the A350 northbound.
                    Around 35 miles.
                  </li>
                  <li>
                    <strong>From Salisbury</strong> — approximately 30 minutes via the A30 westbound.
                    Around 20 miles.
                  </li>
                </ul>
              </div>
            </div>

            {/* Parking */}
            <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center">
                  <ParkingCircle className="h-6 w-6 text-racing-green" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  Parking
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 pl-15">
                <p>
                  Shaftesbury has several public car parks within easy walking distance of the town centre.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Bell Street Car Park</strong> — centrally located, pay and display.
                    Short walk to the High Street and Gold Hill.
                  </li>
                  <li>
                    <strong>Coppice Street Car Park</strong> — convenient for the town centre with
                    short and long-stay options.
                  </li>
                  <li>
                    <strong>Angel Lane Car Park</strong> — close to the High Street
                    with pay and display parking.
                  </li>
                </ul>
                <p>
                  Most car parks operate pay and display. Check signage for current tariffs and
                  time restrictions. Some on-street parking is also available with limited waiting.
                </p>
              </div>
            </div>

            {/* EV Charging */}
            <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-racing-green" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  EV Charging
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 pl-15">
                <p>
                  Electric vehicle charging points are available in and around Shaftesbury.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Public charging points are available at selected car parks in the town —
                    check apps such as Zap-Map for the latest locations and availability.
                  </li>
                  <li>
                    Several hotels and B&Bs in the area also offer guest charging facilities.
                  </li>
                </ul>
                <p>
                  The EV charging network in the area is growing. We recommend checking
                  <strong> Zap-Map</strong> or <strong>Open Charge Map</strong> for
                  up-to-date charger locations and connector types before you travel.
                </p>
              </div>
            </div>

            {/* Walking & Cycling */}
            <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-racing-green/10 flex items-center justify-center">
                  <Footprints className="h-6 w-6 text-racing-green" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  Walking & Cycling
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 pl-15">
                <p>
                  Shaftesbury is a compact and walkable town. The town centre, including the famous
                  Gold Hill, is easily explored on foot. Do note that as a hilltop town, some streets
                  are steep!
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The town is surrounded by beautiful countryside in the Cranborne Chase Area of
                    Outstanding Natural Beauty, with numerous footpaths and bridleways.
                  </li>
                  <li>
                    Cyclists can enjoy quiet country lanes and bridleways in the Blackmore Vale
                    and surrounding areas. The terrain is hilly but rewarding.
                  </li>
                  <li>
                    The Wessex Ridgeway long-distance path passes near the town, offering
                    excellent walking opportunities.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
