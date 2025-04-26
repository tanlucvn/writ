import * as FadeIn from "@/components/motion/fade";

export default function PrivacyPage() {
  return (
    <FadeIn.Container className="mx-auto max-w-md px-4 py-20 text-center">
      <FadeIn.Item>
        <h1 className="mb-4 font-semibold text-2xl">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your data belongs to you. Miniwrit does not collect, track, or share
          your personal information. All your writings are stored locally on
          your device.
        </p>

        <div className="mt-8 text-muted-foreground text-xs">
          <p>No accounts. No ads. No tracking.</p>
          <p className="mt-1">Focus on writing, without distractions.</p>
        </div>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
