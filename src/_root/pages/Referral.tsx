import { Button } from "@/components/ui"
import { Card } from "@/components/ui/card"
import { Handshake, SmilePlus } from "lucide-react"
import FadeIn from "react-fade-in"

const Referral = () => {
  return (
    <FadeIn className="pb-16 space-y-4">
      <h3 className="-mt-1.5 h3">Help us grow our community</h3>
      <div className="flex flex-col gap-8 mt-6">
        <Card className="flex items-start gap-6 w-full p-6">
          <SmilePlus
            size={34}
            strokeWidth={1.25}
            className="text-primary pt-1.5"
          />
          <div className="w-full">
            <h6 className="h6 mb-2 leading-7">
              Know someone who would be a great addition to our network?
            </h6>
            <p className="text-muted-foreground">
              If your referred individual is accepted, we'll let you select a
              $50 USD gift card of your choice as a token of our gratitude.
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-6 w-full p-6">
          <Handshake
            size={34}
            strokeWidth={1.25}
            className="text-primary pt-1.5"
          />
          <div className="w-full">
            <h6 className="h6 mb-2 leading-7">
              Do you know of any clients or projects we could support?
            </h6>
            <p className="text-muted-foreground">
              Recommending a client will earn you a 7% commission on their
              projects for the first year.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h5 className="h5 mb-1">Ready to make a referral?</h5>
        <p className="text-muted-foreground">
          Send your recommendations to{" "}
          <Button
            asChild
            variant="link"
            className="h-auto p-0 text-base font-normal"
          >
            <a
              href="mailto:hello@sparkandmint.com"
              className="text-primary font-medium p-0"
            >
              hello@sparkandmint.com
            </a>
          </Button>
        </p>
      </div>
    </FadeIn>
  )
}

export default Referral
