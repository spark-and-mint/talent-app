import { Button } from "@/components/ui"
import FadeIn from "react-fade-in"

const Referral = () => {
  return (
    <FadeIn className="pb-16 space-y-4">
      <h3 className="-mt-1.5 h3">Help us grow our community</h3>
      <div className="mt-8 space-y-10">
        <div>
          <h6 className="h6 mb-1">
            Have someone in mind who would be a perfect addition to our network?
          </h6>
          <p className="text-muted-foreground">
            If your referred individual is accepted, we'll let you select a $50
            USD gift card of your choice as a token of our gratitude.
          </p>
        </div>

        <div>
          <h6 className="h6 mb-1">
            Do you know of any clients or projects we could support?
          </h6>
          <p className="text-muted-foreground">
            Recommending a client will earn you a 7% commission on their
            projects for the first year.
          </p>
        </div>

        <div>
          <h6 className="h6 mb-1">Ready to make a referral?</h6>
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
      </div>
    </FadeIn>
  )
}

export default Referral
